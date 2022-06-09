const model = require('../models/user.model.js')
const global = require('../models/global.model.js')
const connection = require('../database/database.js')
const helpers = require('../helpers/global.helper.js')
function getUsers(req, res){
    connection.query("SELECT * FROM users", function (err, data, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(fields)

        if(helpers.isEmptyObject(data)){
            res.send({
                status:"success",
                statusCode:204,
                data:"Not found"
            });
        }else{
            res.send({
                status:"success",
                statusCode:204,
                data:data
            })
        }
       
      });
}
function getSingleUser(req, res){
    const id = req.body.id;
    connection.query(`SELECT * FROM users WHERE id = ${id}`, function (err, data, fields) {
        if (err) throw err;
        if(helpers.isEmptyObject(data)){
            res.send({
                status:"success",
                statusCode:204,
                data:"Not found"
            });
        }else{
            res.send({
                status:"success",
                statusCode:204,
                data:data
            })
        }
      
      });
}
function postUser(req, pres, next){
    const insertData ={
        'email':req.body.email,
        'name':req.body.name,
        'username':req.body.username,
        'password':req.body.password
    }

    connection.query("INSERT INTO users SET ?",insertData, (err, res) => {
        if (err) {
            pres.send(err)
        }
        pres.send({
            'status':"successfully inserted",
            'statusCode':201,
        })
        console.log("created tutorial: ", { id: res});
      });

}
function updateUser(req, res, next){
    // const updateData ={
    //     'email':req.body.email,
    //     'name':req.body.name,
    //     'username':req.body.username,
    //     'password':req.body.password
    // }
    // connection.query("INSERT INTO users SET ?",updateData, (err, res) => {
    //     if (err) {
    //         pres.send(err)
    //     }
    //     pres.send({
    //         'status':"successfully inserted",
    //         'statusCode':201,
    //     })
    //     console.log("created tutorial: ", { id: res});
    //   });
}
function deleteUser(req, res, next){
    res.send(`respond with a resource on Delete user controller`);
}
module.exports = {
    getUsers,
    getSingleUser,
    postUser,
    updateUser,
    deleteUser
};