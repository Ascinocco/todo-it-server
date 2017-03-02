
import { NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
let User = require('../Models/User');

export class AuthController
{
    constructor(){}

    public login(req: Request, res: Response, next: NextFunction): Response
    {
        return res.status(200).json({msg: "Login posted"});
    }

    public logout(req: Request, res: Response, next: NextFunction)
    {
        res.status(200).json({msg: "Logout posted"});
    }

    public register(req: Request, res: Response, next: NextFunction)
    {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            admin: false
        });

        user.save(function(err, user) {
            if (err) {
                return res.status(500).json({msg: "The server caught on fire..."});
            }
        
            user = user.toJSON();

            return res.status(200).json({ msg: "success!", user: user });
        });
        //return res.status(200).json({ msg: "failure"});
    }

    public deleteAccount(req: Request, res: Response, next: NextFunction): Response
    {
        return res.status(200).json({msg: "Account deletion delete requested"});
    }
}