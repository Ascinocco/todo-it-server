"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config = require('../config/config');
var AuthMiddleware = (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.checkToken = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err.name === "TokenExpiredError") {
                }
                else if (err) {
                    return res.json({ msg: "Failed to authenticate", err: err });
                }
                else {
                    next();
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