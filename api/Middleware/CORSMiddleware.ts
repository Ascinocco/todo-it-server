import { NextFunction, Request, Response} from "express";

export class CORSMiddleware
{
    constructor(){}

    /**
     * Configures CORS so that my angular app can access server
     * 
     * 
     * @static
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     * @memberOf CORSMiddleware
     */
    public static allowCORS(req: Request, res: Response, next: NextFunction): void
    {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
        res.header('Access-Control-Expose-Headers', 'Connection,Content-Length,Content-Type,Date,ETag,X-Powered-By,x-access-token');
        res.header('Access-Control-Allow-Headers', 'Connection,Content-Length,Content-Type,Date,ETag,X-Powered-By,x-access-token');
        next();
    }
}