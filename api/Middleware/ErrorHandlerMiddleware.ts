import { NextFunction, Request, Response} from "express";

export class ErrorHandlerMiddleware 
{
    constructor(){}

    public static handle(err: any, req: Request, res: Response, next: NextFunction)
    {
        res.status(err.status || 500);
        res.json({msg: 'Error', status: err.status || 500});
        console.log(err);
        next(err);
    }
}