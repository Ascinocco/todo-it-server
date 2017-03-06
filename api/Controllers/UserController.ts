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
        let tempUser = req.body.user;
        let confirmPassword = req.body.confirmPassword;
        let newPassword = req.body.newPassword;

        if (tempUser.password) {
            User.findOne({ email: tempUser.email }, function(err, user){
                if (err) {
                    return res.status(200)
                        .json({
                            success: false,
                            msg: "Could not find your account"
                        });
                }

                // compare the password
                user.comparePassword(tempUser.password, function(err, isMatch){
                    if (err) {
                        return res.status(200)
                            .json({
                                success: false,
                                msg: "Error Comparing Passwords"
                            });
                    }

                    if (isMatch) {
                        if (confirmPassword === newPassword){

                            User.findOne({ email: tempUser.email }, function(err, user) {
                                user = tempUser;
                                user["password"] = newPassword;
                                user["updated_at"] = Date.now();
                                user.save()
                            })

                            // console.log(user);
                            // user = tempUser;
                            // user["password"] = newPassword;
                            // user.save();

                            // newPassword = User.hashPassword(newPassword);
                            // if (newPassword === false) {
                            //     return res.status(200)
                            //         .json({
                            //             success: false,
                            //             msg: "Could not hash password"
                            //         });
                            // }

                            // console.log(newPassword);

                            // newPassword = user.hashPassword(newPassword);

                            // User.findOneAndUpdate({ email: tempUser.email },
                            // {
                            //     $set: {
                            //         email: tempUser.email,
                            //         firstName: tempUser.firstName,
                            //         lastName: tempUser.lastName,
                            //         password: newPassword,
                            //         updated_at: Date.now()
                            //     }
                            // }, {
                            //     new: true
                            // }, function(err, user) {
                            //     if (err) {
                            //         console.log(err);
                            //         return res.status(200)
                            //             .json({
                            //                 success: false,
                            //                 msg: "Error update user"
                            //             });
                            //     }

                            //     return res.status(200)
                            //         .json({
                            //             success: true,
                            //             msg: "Your account has been updated!",
                            //             user: user.toJSON()
                            //         });
                            // });
                            
                        } else {
                            return res.status(200)
                                .json({
                                    success: false,
                                    msg: "Your Confirmation password and new password do not match"
                                });  
                        }
                    } else {
                        return res.status(200)
                            .json({
                                success: false,
                                msg: "Incorrect Password"
                            });
                    }
                });

            });
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