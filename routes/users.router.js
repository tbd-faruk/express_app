const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users.controller.js')


userRouter.get('/', userController.getUsers);
userRouter.post('/store', userController.postUser);
userRouter.post('/update', userController.updateUser);
userRouter.get('/details/:id', userController.getSingleUser);
userRouter.get('/delete/:findId', userController.deleteUser);

module.exports = userRouter;
