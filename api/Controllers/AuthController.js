"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var User = require('../Models/User');
var App_1 = require("../../config/App");
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res, next) {
        var credentials = { email: req.body.email, password: req.body.password };
        User.findByEmail(credentials.email, function (err, user) {
            if (err) {
                console.error(err);
                return res.json({
                    success: false,
                    msg: "An error occured while trying to log you in. Please try again."
                });
            }
            if (user) {
                user.comparePassword(credentials.password, function (err, isMatch) {
                    if (err) {
                        console.error(err);
                        return res.json({
                            success: false,
                            msg: "An error occured while verifying your account info"
                        });
                    }
                    if (isMatch) {
                        var token_1 = jwt.sign(user.toJSON(), App_1.AppConfig.secret, {
                            expiresIn: '30d'
                        });
                        user.addToken(token_1);
                        user.save(function (err, user) {
                            if (err) {
                                console.error(err);
                                return res.json({
                                    success: false,
                                    msg: "An error occured while logging you in. Please try again."
                                });
                            }
                            res.set('x-access-token', token_1);
                            res.set('user', user.toJSON());
                            return res.json({
                                success: true,
                                msg: "Welcome " + user.firstName,
                                user: user.toJSON()
                            });
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            msg: "The password you provided does not match the password we have on file for you."
                        });
                    }
                });
            }
            else {
                return res.json({
                    success: false,
                    msg: "We could not find your account"
                });
            }
        });
    };
    AuthController.prototype.logout = function (req, res, next) {
        var token = req["currentToken"];
        var user = req["currentUser"];
        if (token && user) {
            user.revokeToken();
            user.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.json({
                        success: false,
                        msg: "An error occured while loggin you out. Please try again"
                    });
                }
                return res.json({
                    success: true,
                    msg: "You have been logged out. Goodbye!"
                });
            });
        }
        else {
            return res.json({
                success: false,
                msg: "We could not verify your account"
            });
        }
    };
    AuthController.prototype.register = function (req, res, next) {
        var registerForm = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        };
        var DUPLICATE_RECORD_ERROR = 11000;
        if (registerForm.password !== registerForm.confirmPassword) {
            return res.json({
                success: false,
                msg: "The passwords you entered do not match"
            });
        }
        var user = new User({
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            email: registerForm.email,
            password: registerForm.password,
        });
        user.save(function (err, user) {
            if (err) {
                console.error(err);
                if (err.code === DUPLICATE_RECORD_ERROR) {
                    return res.json({
                        success: false,
                        msg: "The email you entered is already in use"
                    });
                }
                else {
                    return res.json({
                        success: false,
                        msg: "An error occured creating your account",
                    });
                }
            }
            var token = jwt.sign(user.toJSON(), App_1.AppConfig.secret, {
                expiresIn: '30d'
            });
            user.addToken(token);
            user.save(function (err, user) {
                if (err) {
                    return res.json({
                        success: false,
                        msg: "Error authenticating your new account. Please try again"
                    });
                }
                res.set('x-access-token', token);
                res.set('user', user.toJSON());
                return res.json({
                    success: true,
                    msg: "You\'re account has been created. Start todoing!",
                    user: user.toJSON()
                });
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map