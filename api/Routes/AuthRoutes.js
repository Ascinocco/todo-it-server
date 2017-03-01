"use strict";
var AuthController_1 = require("../Controllers/AuthController");
var authController = new AuthController_1.AuthController();
var express = require('express');
var router = express.Router();
router.get('/', authController.root);
module.exports = router;
//# sourceMappingURL=AuthRoutes.js.map