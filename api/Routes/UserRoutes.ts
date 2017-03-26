import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import { UserController } from '../Controllers/UserController';

const userController = new UserController();

var express = require('express');
var router = express.Router();

router.use(AuthMiddleware.checkToken);

router.post('/update/account', userController.updateAccount);
router.post('/update/settings', userController.updateSettings);
router.get('/:_id', userController.getUser);
router.delete('/delete/:_id', userController.deleteAccount);

module.exports = router;