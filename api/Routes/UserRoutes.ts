import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import { UserController } from '../Controllers/UserController';

const userController = new UserController();

var express = require('express');
var router = express.Router();

router.use(AuthMiddleware.checkToken);

router.get('/', userController.getUser);
router.post('/update/account', userController.updateAccount);
router.post('/update/settings', userController.updateSettings);
router.delete('/delete/', userController.deleteAccount);

module.exports = router;