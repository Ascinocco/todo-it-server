import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
let User = require('../Models/User');

export class UserController
{
    constructor(){}

    public getUser(req: Request, res: Response, next: NextFunction): any
    {
        let userId = req.params._id;

        User.findById({ _id: userId}, function(err, user) {
            if (err) {
                return res.status(500).json({msg: "Could not find you."});
            }
            user = user.toJSON();
            return res.status(200).json({msg: "here you are!", user: user});
        });
    }

    public update(req: Request, res: Response, next: NextFunction): any
    {
        let user = {
            name: "Anthony Mario Scinocco",
            email: "anthony@mail.com"
        }
        res.status(200)
            .json(user);
    }
}