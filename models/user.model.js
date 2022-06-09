const connection = require('../database/database.js')
function getUserList() {
    connection.query('SELECT * FROM users', (err,rows) => {
        if(err) throw err;
        return {data:rows};
      });
}

module.exports = getUserList;