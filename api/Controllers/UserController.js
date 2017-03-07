"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var User = require('../Models/User');
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getUser = function (req, res, next) {
        var userId = req.params._id;
        User.findById({ _id: userId }, function (err, user) {
            if (err) {
                return res.status(500).json({ msg: "Could not find you." });
            }
            user = user.toJSON();
            return res.status(200).json({ msg: "here you are!", user: user });
        });
    };
    UserController.prototype.update = function (req, res, next) {
        var tempUser = req.body.user;
        var confirmPassword = req.body.confirmPassword;
        var newPassword = req.body.newPassword;
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
                            user.save(function (err) {
                                if (err) {
                                    return res.status(200)
                                        .json({
                                        success: false,
                                        msg: "I couldn't save your updates... Sorry about that."
                                    });
                                }
                                done(err, user);
                            });
                        });
                    }, function (user, done) {
                        done(user);
                    }
                ], function (err) {
                    return res.status(200)
                        .json({
                        success: true,
                        msg: "Your account has been updated!"
                    });
                });
            }
            else {
                return res.status(200)
                    .json({
                    success: false,
                    msg: "You new password does not match the confirmation"
                });
            }
        }
        else {
            console.log('first else -----');
            User.findOneAndUpdate({ email: tempUser.email }, { $set: {
                    email: tempUser.email,
                    firstName: tempUser.firstName,
                    lastName: tempUser.lastName,
                    updated_at: Date.now()
                }
            }, {
                new: true
            }, function (err, user) {
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