import * as jwt from "jsonwebtoken";
let User = require('../Models/User');
import { AppConfig } from '../../config/App';
import { NextFunction, Request, Response} from "express";

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
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if (token) {

            jwt.verify(token, AppConfig.secret, function(err, decoded) {
                if (err) {
                    console.error(err);
                    User.findByToken(token, function (err, user) {
                        user.revokeToken();
                        user.save(function (err) {
                            return res.json({
                                success: false,
                                msg: err.name
                            })
                        })
                    })
                }

                User.findByToken(token, function(err, user) {
                    if (err) {
                        console.error(err);
                        return res.json({
                            success: false,
                            msg: "Could not find token"
                        })
                    }

                    if (user.isTokenValid(token)) {
                        // set the current user to the request for easy use in functions
                        req["currentUser"] = user;
                        req["currentToken"] = token;
                        next();
                    } else {
                        user.revokeToken();
                        user.save(function (err) {
                            return res.json({
                                success: false,
                                msg: "Token is invalid"
                            })
                        })
                    }
                })
            })

        } else {
            return res.json({ success: false, msg: "No token provided"});
        }
    }
}