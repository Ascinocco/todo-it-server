/**
 * Routing doesn't really port nicely over to ts 
 * so I'm going to leave it the standard express way
 */

import { AuthController } from '../Controllers/AuthController';
const authController = new AuthController();

var express = require('express');
var router = express.Router();

/** Auth routes **/
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.delete('/deleteAccount/:id', authController.deleteAccount);

module.exports = router;
