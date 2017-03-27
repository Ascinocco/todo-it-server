import * as cors from "cors";
import * as path from "path";
import * as logger from "morgan";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import * as favicon from "serve-favicon";
import * as bodyParser from "body-parser";
import * as schedule from "node-schedule";
import * as cookieParser from "cookie-parser";

import { CookieParserConfig } from "./config/CookieParser";
import { ClearTokenJob } from "./jobs/ClearTokens/ClearTokenJob";
import { CORSMiddleware } from './api/Middleware/CORSMiddleware';
import { ErrorHandlerMiddleware } from './api/Middleware/ErrorHandlerMiddleware';

let AuthRoutes = require("./api/Routes/AuthRoutes");
let UserRoutes = require("./api/Routes/UserRoutes");

import { Todo } from './api/Models/Todo/Todo';

export class Server
{
    public db: any;
    private env: string;
    public app: express.Application;

    /**
     * Bootstraps server
     * 
     * @static
     * @returns {Server} 
     * 
     * @memberOf Server
     */
    public static boostrap(db: any, env: string): Server
    {
        return new Server(db, env);
    }

    constructor(db: any, env: string)
    {
        // set environment
        // options: prod, dev
        this.env = env;

        // create express app
        this.app = express();

        // config app
        this.config();

        // set db for application
        this.setDb(db);

        // register routes
        this.registerRoutes();

        // register middleware
        this.registerMiddlware();

        // register jobs
        this.registerJobs();

        // just let devs know boostrap is complete
        this.bootstrapComplete();

        let todo = new Todo({});
        todo.setDueYear(0)
        todo.setDueMonth(22);
        todo.setDueDay(220);
        todo.setDueHour(220);
        todo.setDueMinute(220);
        todo.setDueDate();
        console.log(todo.getDueDate());
    }

    /**
     * Configure application 
     * 
     * @memberOf Server
     */
    public config(): void
    {
        //logging config
        this.app.use(logger(this.env))

        // json form parser
        this.app.use(bodyParser.json());

        // json query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // cookie parser secret
        this.app.use(cookieParser(CookieParserConfig[this.env]));

        // allow CORS
        this.app.use(cors());
        this.app.use(CORSMiddleware.allowCORS);
    }

    /**
     * Sets database connection 
     * 
     * 
     * @memberOf Server
     */
    public setDb(db: any): void
    {
        this.db = db;
    }

    /**
     * Setup app routes 
     * 
     * @memberOf Server
     */
    public registerRoutes(): void
    {
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/user', UserRoutes);
    }

    /**
     * Register middleware 
     * 
     * @memberOf Server
     */
    public registerMiddlware(): void
    {
        // handle errors
        this.app.use(ErrorHandlerMiddleware.handle);
    }

    /**
     * register jobs
     * jobs will also be written in here until I get it to work right
     */
    public registerJobs(): void
    {   
        ClearTokenJob.register(this.db);
    }

    public bootstrapComplete(): void
    {
        console.log('*************************************');
        console.log('* -----App Bootstrap Complete------ *');
        console.log('* -----------Let\'s Todo!----------- *');
        console.log('* ----From the insane mind of:----- *');
        console.log('* --------Anthony Scinocco--------- *');
        console.log('*************************************');
    }

}