import { UserController } from '../Controllers/UserController';
const userController = new UserController();

var express = require('express');
var router = express.Router();

router.get('/get', userController.getUser);
router.put('/update', userController.update);

module.exports = router;