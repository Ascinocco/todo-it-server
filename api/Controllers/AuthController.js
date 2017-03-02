"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var User = require('../Models/User');
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
                        return res.json(200).json({ msg: "incorrect password" });
                    }
                    else if (isMatch) {
                        var token = jwt.sign(user, config.secret, {
                            expiresIn: '1h'
                        });
                        res.status(200).json({
                            msg: "Welcome " + user.firstName,
                            user: user.toJSON(),
                            token: token
                        });
                    }
                });
            }
        });
    };
    AuthController.prototype.logout = function (req, res, next) {
        return res.status(200).json({ msg: "Logout posted" });
    };
    AuthController.prototype.register = function (req, res, next) {
        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            admin: false
        });
        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({ msg: "The server caught on fire..." });
            }
            user = user.toJSON();
            return res.status(200).json({ msg: "success!", user: user });
        });
    };
    AuthController.prototype.deleteAccount = function (req, res, next) {
        var userId = req.params._id;
        User.findOneAndRemove({ _id: userId }, function (err) {
            if (err) {
                return res.status(500).json({ msg: "could not delete your account..." });
            }
            return res.status(200).json({ msg: "Your account has been deleted!" });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map