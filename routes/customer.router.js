var express = require('express');
var customerRouter = express.Router();
const customerController = require('../controllers/customer.controller.js')


customerRouter.get('/', customerController.getCustomers);
customerRouter.post('/store', customerController.postCustomers);
customerRouter.post('/update', customerController.updateCustomer);
customerRouter.post('/getByEmail', customerController.getByEmailCustomer);
customerRouter.post('/getByPhone', customerController.getByPhoneCustomer);
customerRouter.get('/details/:id', customerController.getSingleCustomer);
customerRouter.get('/delete/:id', customerController.deleteCustomer);

module.exports = customerRouter;
