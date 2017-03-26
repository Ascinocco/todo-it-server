"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
var UserController_1 = require("../Controllers/UserController");
var userController = new UserController_1.UserController();
var express = require('express');
var router = express.Router();
router.use(AuthMiddleware_1.AuthMiddleware.checkToken);
router.post('/update/account', userController.updateAccount);
router.post('/update/settings', userController.updateSettings);
router.get('/:_id', userController.getUser);
router.delete('/delete/:_id', userController.deleteAccount);
module.exports = router;
//# sourceMappingURL=UserRoutes.js.map