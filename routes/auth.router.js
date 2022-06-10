var express = require('express');
var authRouter = express.Router();
const authController = require('../controllers/auth.controller.js')

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

module.exports = authRouter;
