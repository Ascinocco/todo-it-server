"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var User = require('../Models/User');
var App_1 = require("../../config/App");
var AuthMiddleware = (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.checkToken = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, App_1.AppConfig.secret, function (err, decoded) {
                if (err) {
                    console.error(err);
                    if (err.name === "TokenExpiredError") {
                        User.findByToken(token, function (err, user) {
                            user.revokeToken();
                            user.save(function (err) {
                                return res.json({
                                    success: false,
                                    msg: "Your token is expired. Please login again"
                                });
                            });
                        });
                    }
                    else if (err.name === "JsonWebTokenError") {
                        return res.json({
                            success: false,
                            msg: "Malformed Token"
                        });
                    }
                    else {
                        return res.json({
                            success: false,
                            msg: "An error occured valididation your account."
                        });
                    }
                }
                else {
                    User.findByToken(token, function (err, user) {
                        if (err) {
                            console.error(err);
                            return res.json({
                                success: false,
                                msg: "Could not find token"
                            });
                        }
                        if (user.isTokenValid(token)) {
                            req["currentUser"] = user;
                            req["currentToken"] = token;
                            next();
                        }
                        else {
                            user.revokeToken();
                            user.save(function (err) {
                                return res.json({
                                    success: false,
                                    msg: "Token is invalid"
                                });
                            });
                        }
                    });
                }
            });
        }
        else {
            return res.json({ success: false, msg: "No token provided" });
        }
    };
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map