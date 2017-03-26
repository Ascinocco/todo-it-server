import { AuthController } from '../Controllers/AuthController';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
const authController = new AuthController();

var express = require('express');
var router = express.Router();

/** Auth routes **/
router.post('/login', authController.login);
router.post('/logout', AuthMiddleware.checkToken, authController.logout);
router.post('/register', authController.register);

module.exports = router;
