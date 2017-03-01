"use strict";
var logger = require("morgan");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var CookieParserConfig_1 = require("./api/config/CookieParserConfig");
var AuthRoutes = require("./api/Routes/AuthRoutes");
var Server = (function () {
    function Server() {
        this.env = "dev";
        this.app = express();
        this.config();
        this.registerRoutes();
        this.registerMiddlware();
    }
    Server.boostrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.use(logger(this.env));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser(CookieParserConfig_1.CookieParserConfig[this.env]));
    };
    Server.prototype.registerRoutes = function () {
        this.app.use('/', AuthRoutes);
    };
    Server.prototype.registerMiddlware = function () {
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({ msg: "Error", status: err.status || 500 });
            console.log(err);
            next(err);
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map