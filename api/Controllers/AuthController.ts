import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
let User = require('../Models/User');
import { AppConfig } from '../../config/App';
import { NextFunction, Request, Response} from "express";




/**
 * Handles all authentication related requested
 * 
 * @export
 * @class AuthController
 */
export class AuthController
{
    constructor(){}

    public login(req: Request, res: Response, next: NextFunction): any
    {
        let credentials = { email: req.body.email, password: req.body.password };

        User.findByEmail(credentials.email, function (err, user) {
            if (err) {
                console.error(err);
                return res.json({
                    success: false,
                    msg: "An error occured while trying to log you in. Please try again."
                });
            }

            if (user) {

                user.comparePassword(credentials.password, function (err, isMatch) {
                    if (err) {
                        console.error(err);
                        return res.json({
                            success: false,
                            msg: "An error occured while verifying your account info"
                        })
                    }

                    if (isMatch) {

                        let token = jwt.sign(user.toJSON(), AppConfig.secret, {
                            expiresIn: '30d'
                        })

                        user.addToken(token);
                        user.save(function(err, user) {
                            if (err) {
                                console.error(err);
                                return res.json({
                                    success: false,
                                    msg: "An error occured while logging you in. Please try again."
                                });
                            }

                            res.set('x-access-token', token);
                            res.set('user', user.toJSON());
                            return res.json({
                                success: true,
                                msg: "Welcome " + user.firstName,
                                user: user.toJSON()
                            });
                        });

                    } else {
                        return res.json({
                            success: false,
                            msg: "The password you provided does not match the password we have on file for you."
                        })
                    }

                });

            } else {
                return res.json({
                    success: false,
                    msg: "We could not find your account"
                });
            }
        });
    }

    public logout(req: Request, res: Response, next: NextFunction): any
    {
        let token = req["currentToken"];
        let user = req["currentUser"];

        if (token && user) {
            user.revokeToken();
            user.save(function(err) {
                if (err) {
                    console.error(err);
                    return res.json({
                        success: false,
                        msg: "An error occured while loggin you out. Please try again"
                    })
                }

                return res.json({
                    success: true,
                    msg: "You have been logged out. Goodbye!"
                })                
            })
        } else {
            return res.json({
                success: false,
                msg: "We could not verify your account"
            })
        }
    }

    public register(req: Request, res: Response, next: NextFunction): any
    {
        let registerForm = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        };
        const DUPLICATE_RECORD_ERROR: number = 11000;
        
        if (registerForm.password !== registerForm.confirmPassword) {
            return res.json({
                success: false,
                msg: "The passwords you entered do not match"
            })
        }

        let user = new User({
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            email: registerForm.email,
            password: registerForm.password,
        });

        user.save(function(err, user) {
            if (err) {
                console.error(err);
                if (err.code === DUPLICATE_RECORD_ERROR) {
                    return res.json({
                        success: false,
                        msg: "The email you entered is already in use"
                    })
                } else {
                    return res.json({
                        success: false,
                        msg: "An error occured creating your account",
                    })
                }
            }

            let token = jwt.sign(user.toJSON(), AppConfig.secret, {
                expiresIn: '30d'
            });

            user.addToken(token);
            // double save is not ideal but I need the user to be saved before I sign a token with him/her
            user.save(function(err, user) {
                if (err) {
                    return res.json({
                        success: false,
                        msg: "Error authenticating your new account. Please try again"
                    })
                }

                res.set('x-access-token', token);
                res.set('user', user.toJSON());
                return res.json({
                    success: true,
                    msg: "You\'re account has been created. Start todoing!",
                    user: user.toJSON()
                })
            });
        });
    }
}