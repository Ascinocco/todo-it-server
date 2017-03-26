"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var logger = require("morgan");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var CookieParser_1 = require("./config/CookieParser");
var ClearTokenJob_1 = require("./jobs/ClearTokens/ClearTokenJob");
var CORSMiddleware_1 = require("./api/Middleware/CORSMiddleware");
var ErrorHandlerMiddleware_1 = require("./api/Middleware/ErrorHandlerMiddleware");
var AuthRoutes = require("./api/Routes/AuthRoutes");
var UserRoutes = require("./api/Routes/UserRoutes");
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
        this.app.use(cookieParser(CookieParser_1.CookieParserConfig[this.env]));
        this.app.use(cors());
        this.app.use(CORSMiddleware_1.CORSMiddleware.allowCORS);
    };
    Server.prototype.setDb = function (db) {
        this.db = db;
    };
    Server.prototype.registerRoutes = function () {
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/user', UserRoutes);
    };
    Server.prototype.registerMiddlware = function () {
        this.app.use(ErrorHandlerMiddleware_1.ErrorHandlerMiddleware.handle);
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