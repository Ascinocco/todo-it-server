import { NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
let Token = require('../Models/Token');
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
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        Token.findByToken(token, function(err, token) {
                            // invalidate token here
                            if (err) {
                                // purposfully generic so that we don't tell potentially malicious
                                // users that the token is still considered valid in our db
                                return res.status(500).json({ msg: "something went wrong" })
                            }

                            token.revoke();
                            token.save(); // need to check if this works

                        });
                    } else if (err.name === "JsonWebTokenError") {
                        return res.status(500).json({ msg: "Invalid token provided" });
                    }

                    // geneic
                    return res.json({ msg: "Failed to authenticate", err: err });
                } else {

                    // if the token is valid in jwt let's check if token is valid in db
                    Token.findByToken(token, function(err, token) {
                        if (err) {
                            return res.status(500).json({ msg: "Error verifying token" });
                        }
                        
                        if (token.valid) {
                            next();
                        }

                        if (!token.valid) {
                           return res.json({ msg: "Token expired", token: token });
                        }

                        return res.status(500).json({ msg: "Generic error.... to be replaced. Find me in AuthMiddlware.ts"});

                    });
                }
            });
        } else {
            return res.status(403).json({msg: "No token provided"});
        }
    }
}