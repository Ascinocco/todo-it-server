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
        var user = req.body.user;
        var confirmPassword = req.body.confirmPassword;
        if (user.password) {
            if (user.password === confirmPassword) {
                User.findOneAndUpdate({ email: user.email }, { $set: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        updated_at: Date.now
                    }
                }, {
                    new: true
                }, function (err, user) {
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
            }
            else {
                return res.status(200)
                    .json({
                    success: false,
                    msg: "Passwords do not match"
                });
            }
        }
        else {
            User.findOneAndUpdate({ email: user.email }, { $set: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    updated_at: Date.now
                }
            }, {
                new: true
            }, function (err, user) {
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
        }
        res.status(200)
            .json(user);
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