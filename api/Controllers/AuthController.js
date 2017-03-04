"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var User = require('../Models/User');
var Token = require('../Models/Token');
var config = require('../config/config');
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res, next) {
        var tempUser = {
            email: req.body.email,
            password: req.body.password
        };
        User.findOne({ email: tempUser.email }, function (err, user) {
            if (err) {
                return res.status(500).json({ msg: "The server farted on your request" });
            }
            if (!user) {
                return res.status(400).json({ msg: "Could not find your account" });
            }
            else if (user) {
                user.comparePassword(tempUser.password, function (err, isMatch) {
                    if (!isMatch) {
                        return res.status(200).json({ msg: "incorrect password" });
                    }
                    else if (isMatch) {
                        var token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: '8h'
                        });
                        var dbToken = new Token();
                        dbToken.value = token;
                        dbToken.save(function (err, token) {
                            if (err) {
                                return res.status(500).json({ success: false, msg: "Could not save token" });
                            }
                            res.set('x-access-token', token.value);
                            return res.status(200).json({
                                msg: "Welcome " + user.firstName,
                                user: user.toJSON()
                            });
                        });
                    }
                });
            }
        });
    };
    AuthController.prototype.logout = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        Token.findByToken(token, function (err, token) {
            if (err) {
                return res.status(500).json({ msg: "Error verifying token" });
            }
            token.revoke();
            token.save();
            return res.status(200).json({ success: true, msg: "You have been logged out" });
        });
    };
    AuthController.prototype.register = function (req, res, next) {
        var DUPLICATE_RECORD_ERROR = 11000;
        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            admin: false
        });
        user.save(function (err, user) {
            if (err) {
                if (err.code === DUPLICATE_RECORD_ERROR) {
                    return res.status(500).json({ msg: "The email you entered is already in use." });
                }
                else if (err.name === "ValidationError") {
                    return res.status(500).json({ msg: "Missing email or Password" });
                }
                return res.status(500).json({ msg: "The server caught on fire...", err: err });
            }
            user = user.toJSON();
            return res.status(200).json({ msg: "success!", user: user });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map