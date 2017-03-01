
import { NextFunction, Request, Response} from "express";
export class AuthController
{
    constructor(){}

    public login(req: Request, res: Response, next: NextFunction): void
    {
        res.status(200).json({msg: "Login posted"});
    }

    public logout(req: Request, res: Response, next: NextFunction)
    {
        res.status(200).json({msg: "Logout posted"});
    }

    public register(req: Request, res: Response, next: NextFunction): void
    {
        res.status(200).json({msg: "Registration posted"});
    }

    public deleteAccount(req: Request, res: Response, next: NextFunction): void
    {
        res.status(200).json({msg: "Account deletion delete requested"});
    }
}