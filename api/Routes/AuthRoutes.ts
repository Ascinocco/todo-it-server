/**
 * Routing doesn't really port nicely over to ts 
 * so I'm going to leave it the standard express way
 */

import { AuthController } from '../Controllers/AuthController';
const authController = new AuthController();

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', authController.root);

module.exports = router;
