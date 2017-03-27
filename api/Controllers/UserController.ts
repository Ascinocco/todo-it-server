import * as async from "async";
let User = require('../Models/User');
import * as mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";


export class UserController
{
    constructor(){}

    public getUser(req: Request, res: Response, next: NextFunction): any
    {
        let token = req["currentToken"];
        User.findByToken(token, function (err, user) {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    msg: "We could not get your user data"
                })
            }

            res.set('x-access-token', token);
            res.set('user', user.toJSON());

            return res.json({
                success: true,
                msg: "User data found",
                user: user.toJSON()
            })
        })
    }

    public updateAccount(req: Request, res: Response, next: NextFunction): any
    {
        let token = req["currentToken"];
        let user = req["currentUser"];
        let shouldUpdatePassword: boolean = false;
        let updateForm = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        
        if (user.firstName !== updateForm.firstName && user.firstName && updateForm.firstName) {
            user.firstName = updateForm.firstName;
        }
        if (user.lastName !== updateForm.lastName && user.lastName && updateForm.lastName) {
            user.lastName = updateForm.lastName;
        }
        if (user.email !== updateForm.email && user.email && updateForm.email) {
            user.email = updateForm.email;
        }

        if (req.body.newPassword && req.body.confirmPassword && req.body.currentPassword) {
            let passwords = {
                new: req.body.newPassword,
                confirm: req.body.confirmPassword,
                current: req.body.currentPassword
           }

           if (passwords.new !== passwords.confirm){
                return res.json({
                    success: false,
                    msg: "Passwords do not match"
                })
            } else {
                user.comparePassword(passwords.current, function(err, isMatch) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            msg: "An error occured while comparing your passwords"
                        })
                    }

                    if (isMatch) {
                        user.password = passwords.new;
                        shouldUpdatePassword = true;
                    } else {
                        return res.json({
                            success: false,
                            msg: "The password you entered as your current password does not match the password we have on file for your account"
                        });
                    }
                })
            }
        }

        if (user.firstName || user.lastName || user.email || shouldUpdatePassword) {
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        msg: "An error occured while updating your account. Please try again."
                    })
                }

                res.set('x-access-token', token);
                res.set('user', user.toJSON());

                return res.json({
                    success: true,
                    msg: "Your account has been updated!",
                    user: user.toJSON()
                })
            });
        }
    }

    public updateSettings(req: Request, res: Response, next: NextFunction): any
    {
        let token = req["currentToken"];
        let user = req["currentUser"];
        let settingsForm = {
            emailNotifications: req.body.emailNotifications,
            nativeNotifications: req.body.nativeNotifications,
        };

        user.settings.notifications.email = settingsForm.emailNotifications;
        user.settings.notifications.native = settingsForm.nativeNotifications;

        user.save(function(err, user) {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    msg: "An error occured saving your account settings"
                });
            }

            res.set('x-access-token', token);
            res.set('user', user.toJSON());

            return res.json({
                success: true,
                msg: "Settings updated!",
                user: user.toJSON()
            })
        })
    }

    public deleteAccount(req: Request, res: Response, next: NextFunction): any
    {
        let token = req["currentToken"];
        let user = req["currentUser"];
        User.findOneAndRemove({ 'token.value': token }, function(err) {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    msg: "An error occured while deleting your account. Please try again."
                })
            }

            res.set('x-access-token', '');
            res.set('user', '');

            return res.json({
                success: true,
                msg: "You\'re account has been deleted. Sad to see you go :("
            })
        });
    }
}