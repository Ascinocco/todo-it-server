"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../Controllers/UserController");
var jwt = require("jsonwebtoken");
var config = require('../config/config');
var userController = new UserController_1.UserController();
var express = require('express');
var router = express.Router();
router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ msg: "Failed to authenticate" });
            }
            else {
                next();
            }
        });
    }
    else {
        return res.status(403).json({ msg: "No token provided" });
    }
});
router.get('/get/:_id', userController.getUser);
router.put('/update', userController.update);
router.delete('/delete/:_id', userController.deleteAccount);
module.exports = router;
//# sourceMappingURL=UserRoutes.js.map