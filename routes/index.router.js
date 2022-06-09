var express = require('express');
var homeRouter = express.Router();

/* GET home page. */
homeRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = homeRouter;
