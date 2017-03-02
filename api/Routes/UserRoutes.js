"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../Controllers/UserController");
var userController = new UserController_1.UserController();
var express = require('express');
var router = express.Router();
router.get('/get/:_id', userController.getUser);
router.put('/update', userController.update);
router.delete('/delete/:_id', userController.deleteAccount);
module.exports = router;
//# sourceMappingURL=UserRoutes.js.map