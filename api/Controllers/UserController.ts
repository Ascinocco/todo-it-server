import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
let User = require('../Models/User');

export class UserController
{
    constructor(){}

    public getUser(req: Request, res: Response, next: NextFunction): any
    {
        let userId = req.params._id;

        User.findById({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).json({msg: "Could not find you."});
            }

            user = user.toJSON();
            return res.status(200).json({msg: "here you are!", user: user});
        });
    }

    public update(req: Request, res: Response, next: NextFunction): any
    {
        let user = req.body.user;
        let confirmPassword = req.body.confirmPassword;

        console.log('Making it to user controller');

        if (user.password) {
            if (user.password === confirmPassword) {
                User.findOneAndUpdate({ email: user.email }, 
                    { $set: 
                        { 
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            updated_at: Date.now
                    }
                },
                {
                    new: true
                },
                function(err, user) {
                    if (err) {
                        return res.status(200)
                        .json({
                            success: false,
                            msg: "Error update user"
                        });
                    }

                    return res.status(200)
                        .json({
                            success: true,
                            msg: "Your account has been updated!",
                            user: user
                        });
                });
                } else {
                    return res.status(200)
                        .json({
                            success: false,
                            msg: "Passwords do not match"
                        });
                }
        } else {
            console.log('first else -----')
            User.findOneAndUpdate({ email: user.email }, 
            { $set: 
                { 
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    updated_at: Date.now()
                }
            },
            {
                new: true
            },
             function(err, user) {
                if (err) {
                    console.log(err);
                    return res.status(200)
                    .json({
                        success: false,
                        msg: "Error update user"
                    });
                }

                return res.status(200)
                    .json({
                        success: true,
                        msg: "Your account has been updated!",
                        user: user.toJSON()
                    });
             });
        }
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