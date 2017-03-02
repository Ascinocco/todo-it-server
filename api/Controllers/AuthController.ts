
import { NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
let User = require('../Models/User');
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
                return res.status(500).json({ msg: "The server farted on your request" });
            }

            if (!user) {
                return res.status(400).json({ msg: "Could not find your account" });
            } else if (user) {
                user.comparePassword(tempUser.password, function(err, isMatch) {
                    if (!isMatch) {
                        return res.json(200).json({ msg: "incorrect password" });
                    } else if (isMatch) {
                        let token = jwt.sign(user, config.secret, {
                            expiresIn: '1h'
                        });

                        res.status(200).json({
                            msg: "Welcome " + user.firstName,
                            user: user.toJSON(),
                            token: token
                        })
                    }
                });
            }
        });
    }

    public logout(req: Request, res: Response, next: NextFunction): any
    {
        return res.status(200).json({msg: "Logout posted"});
    }

    public register(req: Request, res: Response, next: NextFunction): any
    {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            admin: false
        });

        user.save(function(err, user) {
            if (err) {
                return res.status(500).json({msg: "The server caught on fire..."});
            }
        
            user = user.toJSON();

            return res.status(200).json({ msg: "success!", user: user });
        });
        //return res.status(200).json({ msg: "failure"});
    }

    public deleteAccount(req: Request, res: Response, next: NextFunction): any
    {
        // delete user
        let userId = req.params._id;
        User.findOneAndRemove({ _id: userId}, function(err) {
            if (err) {
                return res.status(500).json({ msg: "could not delete your account..." });
            }

            return res.status(200).json({ msg: "Your account has been deleted!" });
        });
    }
}