"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthController_1 = require("../Controllers/AuthController");
var authController = new AuthController_1.AuthController();
var express = require('express');
var router = express.Router();
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
module.exports = router;
//# sourceMappingURL=AuthRoutes.js.map