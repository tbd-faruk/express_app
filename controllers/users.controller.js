const model = require('../models/user.js')
const global = require('../models/global.model.js')
const connection = require('../database/database.js')
const helpers = require('../helpers/global.helper.js')
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
function getUsers(req, res){
   try{
    User.find({},(err,result)=>{
        if(err) res.send({
            status:"error",
            statusCode:404,
            error:err
        })
            res.send({
                status:"success",
                statusCode:200,
                data:result
            })  
    })
   }catch(err){
       console.log(err)
   }
}
function getSingleUser(req, res){
    const id = req.params.id;
    console.log(id)
    try{
        User.findById(id,(err, user)=>{
            if(err) res.send({
                status:"error",
                statusCode:404,
                error:err
            })
            if(user){
                res.send({
                    status:"success",
                    statusCode:200,
                    message:"Data found",
                    data:user
                })  
            }else{
                 res.send({
                    status:"success",
                    statusCode:200,
                    message:"Data not found"
                })  
            }
               
        })
    }catch(e){
        console.log(e)
    }
   
}
function updateUser(req, res, next){
    const id =req.body.id;
    const updateData ={
        'email':req.body.email,
        'name':req.body.name,
        'username':req.body.username,
    }
    User.findByIdAndUpdate(id, updateData,(err,data)=>{
        console.log(data)
        if(err) return res.send(err)
        if(data) return res.send(data)
       
    })
}
function deleteUser(req, res, next){
    const id = req.params.id;
   User.findByIdAndRemove(id,(err)=>{
        if(err) return res.send(err)
        return res.send({
            status:"success",
            status_code:200,
            message:"User deleted"
        })
   })
}

module.exports = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
};