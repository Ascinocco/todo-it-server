"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var Token = require('../Models/Token');
var App_1 = require("../../config/App");
var AuthMiddleware = (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.checkToken = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, App_1.AppConfig.secret, function (err, decoded) {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        Token.findByToken(token, function (err, token) {
                            if (err) {
                                return res.status(500).json({ msg: "something went wrong" });
                            }
                            token.revoke();
                            token.save();
                        });
                    }
                    else if (err.name === "JsonWebTokenError") {
                        return res.status(500).json({ msg: "Invalid token provided" });
                    }
                    return res.json({ msg: "Failed to authenticate", err: err });
                }
                else {
                    Token.findByToken(token, function (err, token) {
                        if (err) {
                            return res.status(500).json({ msg: "Error verifying token" });
                        }
                        if (token.valid) {
                            next();
                        }
                        if (!token.valid) {
                            return res.json({ msg: "Token expired" });
                        }
                    });
                }
            });
        }
        else {
            return res.status(403).json({ msg: "No token provided" });
        }
    };
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map