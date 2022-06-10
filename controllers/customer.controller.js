
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
function getSingleCustomer(req, res){
    const id = req.params.id;
    console.log(id)
    try{
        customer.findById(id,(err, user)=>{
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
function updateCustomer(req, res, next){
    const id =req.body.id;
    const updateData ={
        'email':req.body.email,
        'name':req.body.name,
        'phone':req.body.phone,
        'address':req.body.address,
        'dob':req.body.dob,
    }
    customer.findByIdAndUpdate(id, updateData,(err,data)=>{
        console.log(data)
        if(err) return res.send(err)
        if(data) return res.send(data)
       
    })
}
function deleteCustomer(req, res, next){
    const id = req.params.id;
    customer.findByIdAndRemove(id,(err)=>{
        if(err) return res.send(err)
        return res.send({
            status:"success",
            status_code:200,
            message:"User deleted"
        })
   })
}

module.exports = {
    postCustomers,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
};