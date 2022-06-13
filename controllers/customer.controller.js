
const bcrypt = require('bcryptjs');
const customer = require("../models/customer");
const jwt = require('jsonwebtoken');

async function postCustomers(req, res){
    try {
      const { name,email,phone,dob,address} = req.body;
  
      if (!(email && phone && name && dob && address)) {
        res.send("All input is required");
      }
  
      const oldUser = await customer.findOne({ email });
      const oldPhone= await customer.findOne({ phone });
  
      if (oldUser || oldPhone) {
        return res.send("Customer Already Exist. Please Login");
      }
  
    
      const user = await customer.create({
        name,
        email,
        phone,
        dob,
        address
      });
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }

function getCustomers(req, res){
   try{
    customer.find({},(err,result)=>{
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
function getByEmailCustomer(req, res, next){
    const email = req.body.email;
    try{
        customer.findOne({ email},(err, user)=>{
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
function getByPhoneCustomer(req, res, next){
    const phone = req.body.phone;
    console.log(phone)
    try{
        customer.findOne({ phone},(err, user)=>{
            if(user){
                res.send({
                    status:"success",
                    statusCode:200,
                    message:"Data found",
                    data:user
                })  
            }else{
                 res.send({
                    status:"error",
                    statusCode:404,
                    message:"Data not found"
                })  
            }
               
        })
    }catch(e){
        console.log(e)
    }
   
}
function getSingleCustomer(req, res, next){
    const id = req.params.id;
    try{
        customer.findById(id,(err, user)=>{
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

function updateCustomer(req, res, next){
    const id =req.body.id;
    const { name,email,phone,dob,address} = req.body;
  
    const updateData ={
        'email':email,
        'name':name,
        'phone':phone,
        'address':address,
        'dob':dob,
    }
    if (!(email && phone && name && dob && address)) {
        res.send("All input is required");
      }
    customer.findByIdAndUpdate(id, updateData,(err,data)=>{
        if(!data) return res.send({"status":"error","message":"Customer Not found"})
        if(data) return res.send(data)
       
    })
}
function deleteCustomer(req, res, next){
    const id = req.params.id;
    const findCustomer = customer.findById(id,(err, data) =>{
        if(err) return next(err)

        if(!data) return res.status(200).send({'status':'success',"message":"Customer not found","statusCode":200})
    });
    customer.findByIdAndRemove(id,(err)=>{
        console.log()
        if(err) return res.send(err)
        return res.send({
            status:"success",
            status_code:200,
            message:"Customer deleted"
        })
   })
}

module.exports = {
    postCustomers,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
    getByEmailCustomer,
    getByPhoneCustomer
};