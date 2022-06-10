var express = require('express');
var homeRouter = express.Router();
const auth = require("../middleware/auth");
/* GET home page. */
homeRouter.get('/', auth,(req, res, next) =>{
  res.send('Welcome My Home page')
});

module.exports = homeRouter;
