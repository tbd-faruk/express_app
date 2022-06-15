const term = require("../models/term");

async function postTerm(req, res){
    try {
      const { name,description} = req.body;
  
      if (!(name && description)) {
        res.send("All input is required");
      }
  
      const oldTerm = await term.findOne({ name });
  
      if (oldTerm) {
        return res.send("Term Already Exist. Please Create Another");
      }
   
    
      const termData = await term.create({
        name,
        description
      });
  
      res.status(201).json(termData);
    } catch (err) {
      console.log(err);
    }
  }

function getTerms(req, res){
   try{
    term.find({},(err,result)=>{
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

function getSingleTerm(req, res, next){
    const id = req.params.id;
    try{
        term.findById(id,(err, term)=>{
            if(term){
                res.send({
                    status:"success",
                    statusCode:200,
                    message:"Data found",
                    data:term
                })  
            }else{
                 res.send({
                    status:"success",
                    statusCode:404,
                    message:"Data not found"
                })  
            }
               
        })
    }catch(e){
        console.log(e)
    }
   
}

function updateTerm(req, res, next){
    const id =req.body._id;
    const updateData =req.body;
    term.findByIdAndUpdate(id, updateData,{new:true},(err,data)=>{
        if(!data) return res.send({"status":"error","message":"Term Not found"})
        if(data) return res.send({"status":"success","statusCode":200, "message":"Update successfully","data":data})
        
       
    })
}
function deleteTerm(req, res, next){
    const id = req.params.id;
    term.findById(id,(err, data) =>{
        if(err) return next(err)

        if(!data) return res.status(404).send({'status':'success',"message":"Term not found","statusCode":200})
    });
    term.findByIdAndRemove(id,(err)=>{
        if(err) return res.send(err)
        return res.send({
            status:"success",
            status_code:200,
            message:"Term deleted"
        })
   })
}

module.exports = {
    postTerm,
    getTerms,
    getSingleTerm,
    updateTerm,
    deleteTerm,
};