import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
let User = require('../Models/User');

export class UserController
{
    constructor(){}

    public getUser(req: Request, res: Response, next: NextFunction): void
    {
        let user = {
            name: "Anthony Scinocco",
            email: "anthony@mail.com"
        }
        res.status(200)
            .json(user);
    }

    public update(req: Request, res: Response, next: NextFunction): void
    {
        let user = {
            name: "Anthony Mario Scinocco",
            email: "anthony@mail.com"
        }
        res.status(200)
            .json(user);
    }
}