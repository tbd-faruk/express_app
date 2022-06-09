const connection = require('../database/database.js')
function getUsers(table,query,callback) {
    connection.query(`SELECT * FROM ${table}`, (err,data) => {
        if(err){
            callback(err,null)
        }else{
            callback(null,data)
        }
      });    
}

module.exports = {
    getUsers
};