import * as path from "path";
import * as logger from "morgan";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import * as AuthRoutes from './api/Routes/AuthRoutes';//maybe works...

export class Server
{
    public app: express.Application;

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
        // create express app
        this.app = express();

        // config app
        this.config();
    }

    /**
     * Configure application 
     * 
     * @memberOf Server
     */
    public config(): void
    {

    }

    /**
     * Setup app routes 
     * 
     * @memberOf Server
     */
    public routes(): void
    {

    }

    /**
     * Register middleware 
     * 
     * @memberOf Server
     */
    public middlware(): void
    {

    }

}
