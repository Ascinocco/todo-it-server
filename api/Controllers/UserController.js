"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('../Models/User');
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getUser = function (req, res, next) {
        var token = req["currentToken"];
        User.findByToken(token, function (err, user) {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    msg: "We could not get your user data"
                });
            }
            res.set('x-access-token', token);
            res.set('user', user.toJSON());
            return res.json({
                success: true,
                msg: "User data found",
                user: user.toJSON()
            });
        });
    };
    UserController.prototype.updateAccount = function (req, res, next) {
        var token = req["currentToken"];
        var user = req["currentUser"];
        var shouldUpdatePassword = false;
        var updateForm = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
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
            var passwords_1 = {
                new: req.body.newPassword,
                confirm: req.body.confirmPassword,
                current: req.body.currentPassword
            };
            if (passwords_1.new !== passwords_1.confirm) {
                return res.json({
                    success: false,
                    msg: "Passwords do not match"
                });
            }
            else {
                user.comparePassword(passwords_1.current, function (err, isMatch) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            msg: "An error occured while comparing your passwords"
                        });
                    }
                    if (isMatch) {
                        user.password = passwords_1.new;
                        shouldUpdatePassword = true;
                    }
                    else {
                        return res.json({
                            success: false,
                            msg: "The password you entered as your current password does not match the password we have on file for your account"
                        });
                    }
                });
            }
        }
        if (user.firstName || user.lastName || user.email || shouldUpdatePassword) {
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        msg: "An error occured while updating your account. Please try again."
                    });
                }
                res.set('x-access-token', token);
                res.set('user', user.toJSON());
                return res.json({
                    success: true,
                    msg: "Your account has been updated!",
                    user: user.toJSON()
                });
            });
        }
    };
    UserController.prototype.updateSettings = function (req, res, next) {
    };
    UserController.prototype.deleteAccount = function (req, res, next) {
        var userId = req.params._id;
        User.findOneAndRemove({ _id: userId }, function (err) {
            if (err) {
                return res.status(500).json({ msg: "could not delete your account..." });
            }
            return res.status(200).json({ msg: "Your account has been deleted!" });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map