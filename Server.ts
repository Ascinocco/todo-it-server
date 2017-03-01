import * as path from "path";
import * as logger from "morgan";
import * as express from "express";
// import * as mongoose from "mongoose";// might be problematic
import * as favicon from "serve-favicon";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";


import { MongoConfig } from "./api/config/MongoConfig";
import { CookieParserConfig } from "./api/config/CookieParserConfig";
// import * as AuthRoutes from "./api/Routes/AuthRoutes";//maybe works...
let AuthRoutes = require("./api/Routes/AuthRoutes");


export class Server
{
    public app: express.Application;
    private env: string;

    /**
     * Bootstraps server
     * 
     * @static
     * @returns {Server} 
     * 
     * @memberOf Server
     */
    public static boostrap(): Server
    {
        return new Server();
    }

    constructor()
    {
        // set environment
        // options: prod, dev
        this.env = "dev";

        // create express app
        this.app = express();

        // config app
        this.config();

        // register routes
        this.registerRoutes();

        // register middleware
        this.registerMiddlware();
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

        //db config | no mongo or mongoose for now
        //const MONGO_CONNECTION: string = MongoConfig[this.env];
        //let connection: mongoose.Connection = mongoose.createConnection(MONGO_CONNECTION);
    }

    /**
     * Setup app routes 
     * 
     * @memberOf Server
     */
    public registerRoutes(): void
    {
        this.app.use('/', AuthRoutes);
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

}
