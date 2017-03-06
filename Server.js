"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var logger = require("morgan");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var CookieParserConfig_1 = require("./api/config/CookieParserConfig");
var ClearTokenJob_1 = require("./jobs/ClearTokens/ClearTokenJob");
var AuthRoutes = require("./api/Routes/AuthRoutes");
var UserRoutes = require("./api/Routes/UserRoutes");
var config = require("./api/config/config");
var Server = (function () {
    function Server(db, env) {
        this.env = env;
        this.app = express();
        this.config();
        this.setDb(db);
        this.registerRoutes();
        this.registerMiddlware();
        this.registerJobs();
        this.bootstrapComplete();
    }
    Server.boostrap = function (db, env) {
        return new Server(db, env);
    };
    Server.prototype.config = function () {
        this.app.use(logger(this.env));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser(CookieParserConfig_1.CookieParserConfig[this.env]));
        this.app.use(cors());
    };
    Server.prototype.setDb = function (db) {
        this.db = db;
    };
    Server.prototype.registerRoutes = function () {
        this.app.use('/auth', AuthRoutes);
        this.app.use('/user', UserRoutes);
    };
    Server.prototype.registerMiddlware = function () {
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({ msg: "Error", status: err.status || 500 });
            console.log(err);
            next(err);
        });
    };
    Server.prototype.registerJobs = function () {
        ClearTokenJob_1.ClearTokenJob.register(this.db);
    };
    Server.prototype.bootstrapComplete = function () {
        console.log('*************************************');
        console.log('* -----App Bootstrap Complete------ *');
        console.log('* -----------Let\'s Todo!----------- *');
        console.log('* ----From the insane mind of:----- *');
        console.log('* --------Anthony Scinocco--------- *');
        console.log('*************************************');
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map