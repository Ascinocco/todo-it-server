
import { NextFunction, Request, Response} from "express";
export class AuthController
{
    constructor()
    {

    }

    public root(req: Request, res: Response, next: NextFunction)
    {
        console.log('here??')
        res.status(200).json({msg: "hello word!"})
    }
}