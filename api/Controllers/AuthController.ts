
import { NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
let User = require('../Models/User');
let Token = require('../Models/Token');
let config = require('../config/config');


/**
 * Handles all authentication related requested
 * 
 * TODO: what return type should these methods have??? 
 * 
 * @export
 * @class AuthController
 */
export class AuthController
{
    constructor(){}

    public login(req: Request, res: Response, next: NextFunction): any
    {
        let tempUser = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({ email: tempUser.email }, function(err, user) {
            if (err) {
                return res.status(200).json({ success: false, msg: "The server farted on your request" });
            }

            if (!user) {
                return res.status(200).json({ msg: "Could not find your account" });
            } else if (user) {
                user.comparePassword(tempUser.password, function(err, isMatch) {
                    if (!isMatch) {
                        return res.status(200).json({ success: false, msg: "incorrect password" });
                    } else if (isMatch) {

                        let token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: '8h'
                        });

                        // store new token in the db
                        let dbToken = new Token();
                        dbToken.value = token;

                        dbToken.save(function(err, token){
                            if (err) {
                                return res.status(200).json({ success: false, msg: "Could not save token" });
                            }

                            // set token header
                            res.set('x-access-token', token.value);

                            return res.status(200).json({
                                success: true,
                                msg: "Welcome " + user.firstName,
                                user: user.toJSON()
                            });
                        });
                    }
                });
            }
        });
    }

    public logout(req: Request, res: Response, next: NextFunction): any
    {
        // probably a better way to do this, however, for now I'm just going
        // to grab the token here as well and revoke it
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            Token.findByToken(token, function(err, token) {
                if (err) {
                    return res.status(500).json({ success: false, msg: "Error verifying token" });
                }

                try {
                    token.revoke();
                    token.save();
                } catch (err) {
                    return res.status(200).json({ success: false, msg: "Purposefully generic error, check AuthController" });
                }
                
                // on the client if true, redirect to home
                return res.status(200).json({ success: true, msg: "You have been logged out" });
            });
        } else {
            return res.status(500).json({ success: false, msg: "Could not retrieve token"});
        }
    }

    public register(req: Request, res: Response, next: NextFunction): any
    {
        const DUPLICATE_RECORD_ERROR: number = 11000;

        if (req.body.user.password !== req.body.confirmPassword) {
            return res.status(200).json({ 
                success: false,
                msg: "Passwords do not match",
                password: req.body.user.password,
                confirmPassword: req.body.password
             })
        }

        let user = new User({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            password: req.body.user.password,
            admin: false
        });

        user.save(function(err, user) {
            if (err) {
                if (err.code === DUPLICATE_RECORD_ERROR) {
                    return res.status(200).json({ success: false, msg: "The email you entered is already in use." });
                } else if (err.name === "ValidationError") {
                    return res.status(200).json({ success: false, msg: "Missing email or Password" });
                }
                
                return res.status(200).json({ success: false, msg: "The server caught on fire...", err:err});
            }
        
            let token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: '8h'
                        });

            // store new token in the db
            let dbToken = new Token();
            dbToken.value = token;

            dbToken.save(function(err, token){
                if (err) {
                    return res.status(500).json({ success: false, msg: "Could not save token" });
                }

                // set token header
                res.set('x-access-token', token.value);

                return res.status(200).json({
                        success: true,
                        msg: "Your account has been created. Start Todoing!",
                        user: user.toJSON()
                     });
            });
        });
    }
}