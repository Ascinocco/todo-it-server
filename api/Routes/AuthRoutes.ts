/**
 * Routing doesn't really port nicely over to ts 
 * so I'm going to leave it the standard express way
 */

import * as express from "express";
import { AuthController } from '../Controllers/AuthController';

const router = express.Router();
const authController = new AuthController();

router.get('/', authController.root);

module.exports = router;