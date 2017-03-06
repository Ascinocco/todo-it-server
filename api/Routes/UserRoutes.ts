import { UserController } from '../Controllers/UserController';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import * as jwt from "jsonwebtoken";

let config = require('../config/config');
const userController = new UserController();

var express = require('express');
var router = express.Router();

router.use(AuthMiddleware.checkToken);

router.get('/get/:_id', userController.getUser);
router.post('/update', userController.update);
router.delete('/delete/:_id', userController.deleteAccount);

module.exports = router;