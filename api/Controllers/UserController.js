"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            User.findOne({ email: tempUser.email }, function (err, user) {
                if (err) {
                    return res.status(200)
                        .json({
                        success: false,
                        msg: "Could not find your account"
                    });
                }
                user.comparePassword(tempUser.password, function (err, isMatch) {
                    if (err) {
                        return res.status(200)
                            .json({
                            success: false,
                            msg: "Error Comparing Passwords"
                        });
                    }
                    if (isMatch) {
                        if (confirmPassword === newPassword) {
                            User.findOne({ email: tempUser.email }, function (err, user) {
                                user = tempUser;
                                user["password"] = newPassword;
                                user["updated_at"] = Date.now();
                                user.save();
                            });
                        }
                        else {
                            return res.status(200)
                                .json({
                                success: false,
                                msg: "Your Confirmation password and new password do not match"
                            });
                        }
                    }
                    else {
                        return res.status(200)
                            .json({
                            success: false,
                            msg: "Incorrect Password"
                        });
                    }
                });
            });
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