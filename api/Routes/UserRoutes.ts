import { UserController } from '../Controllers/UserController';
import * as jwt from "jsonwebtoken";
let config = require('../config/config');

const userController = new UserController();

var express = require('express');
var router = express.Router();

// apply middleware
router.use(function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
                
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ msg: "Failed to authenticate" });
            } else {
                next();
            }
        });
    } else {
        return res.status(403).json({ msg: "No token provided" });
    }
})


router.get('/get/:_id', userController.getUser);
router.put('/update', userController.update);
router.delete('/delete/:_id', userController.deleteAccount);

module.exports = router;