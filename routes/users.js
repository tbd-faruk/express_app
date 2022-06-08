var express = require('express');
var connection = require('../database/database.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM users', (err,rows) => {
    // if(err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
  });
  res.send('respond with a resource');
});

module.exports = router;
