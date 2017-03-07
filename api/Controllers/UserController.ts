import * as async from "async";
let User = require('../Models/User');
import * as mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";


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
        let tempUser = req.body.user;
        let confirmPassword = req.body.confirmPassword;
        let newPassword = req.body.newPassword;

        if (tempUser.password) {
           if (newPassword === confirmPassword) {
                async.waterfall([
                    function (done) {
                        User.findOne({ email: tempUser.email }, function (err, user) {
                            if (err) {
                                return res.status(200)
                                    .json({
                                        success: false,
                                        msg: "I couldn't find you... Are you real?"
                                    });
                            }

                            user.firstName = tempUser.firstName;
                            user.lastName = tempUser.lastName;
                            user.email = tempUser.email;
                            user.password = newPassword;

                            user.save(function(err) {
                                if (err) {
                                    return res.status(200)
                                        .json({
                                            success: false,
                                            msg: "I couldn't save your updates... Sorry about that."
                                        });
                                }

                                done (err, user);
                            });
                        });
                    }, function (user, done) {
                        done(user)
                    }
                ], function(err) {
                    return res.status(200)
                        .json({
                            success: true,
                            msg: "Your account has been updated!"
                        });
                });
           } else {
               return res.status(200)
                    .json({
                        success: false,
                        msg: "You new password does not match the confirmation"
                    });
           }
        } else {
            console.log('first else -----')
            User.findOneAndUpdate({ email: tempUser.email }, 
            { $set: 
                { 
                    email: tempUser.email,
                    firstName: tempUser.firstName,
                    lastName: tempUser.lastName,
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