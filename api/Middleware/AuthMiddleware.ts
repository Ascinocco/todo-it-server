import { NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
let config = require('../config/config');

export class AuthMiddleware
{
    constructor(){}

    /**
     * 
     * Checks that the provided token is valid
     * 
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {*} 
     * 
     * @memberOf AuthMiddleware
     */
    public static checkToken(req: Request, res: Response, next: NextFunction): any
    {
        // grab token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err.name === "TokenExpiredError") {
                    // code to invalidate token in database
                    //kick user back to homepage and let them know they've been logged in
                    // for 1 million years


                } else if (err) {
                    return res.json({ msg: "Failed to authenticate", err: err });
                } else {
                    next();
                }
            });
        } else {
            return res.status(403).json({msg: "No token provided"});
        }
    }
}