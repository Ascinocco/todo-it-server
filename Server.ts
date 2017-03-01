import * as path from "path";
import * as logger from "morgan";
import * as express from "express";
import * as mongoose from "mongoose";// might be problematic
import * as favicon from "serve-favicon";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import { CookieParserConfig } from "./api/config/CookieParserConfig";
let AuthRoutes = require("./api/Routes/AuthRoutes");
let UserRoutes = require("./api/Routes/UserRoutes");


export class Server
{
    public app: express.Application;
    private env: string;
    public db: any; // for the time being db will be type any so I don't shoot myself

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

        // just let devs know boostrap is complete
        this.bootstrapComplete();
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
        this.app.use('/auth', AuthRoutes);
        this.app.use('/user', UserRoutes);
    }

    /**
     * Register middleware 
     * 
     * @memberOf Server
     */
    public registerMiddlware(): void
    {
        // until I decided how I want to divide up middleware its all going to
        // be built in here

        // handle errors
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction){
            res.status(err.status || 500)
            res.json({msg: "Error", status: err.status || 500})
            console.log(err);
            next(err);
        });
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