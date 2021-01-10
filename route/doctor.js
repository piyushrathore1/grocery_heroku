const express = require("express");
const router =  express.Router();
const doctor_schema = require("../schema/doctor_schema");
const userQueries = require("../controller/doctor_curd");

router.post("/addDoctor",(req,res)=>{
    var name=req.body.name;
    var degree=req.body.degree;
    var mobile_no=req.body.mobile_no;
    try{
        userQueries.insertUser(name,degree,mobile_no);
        //res.send("Record inserted");
        const a=[{'data':1,'success':true,'message':'Data Successful Insert'}];
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch{
        console.log("Error in insert",e);
    }
});

router.get('/getAllDoctor',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    try{
        doctor_schema.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
            //res.send(admin);
            admin.forEach((day,index)=>{
                a.push(day);
            })
            a.push("success:true","message:display Successfully");
            res.send(a);
        })

    }
    catch(err){
        console.log("this is erro",e);
    }

});

router.delete("/deleteDoctor/:id",(req,res)=>{
    var id={_id:req.params.id};
    try{
        console.log(id);
        userQueries.deleteDoctor({_id:req.params.id});
        const a=[{'data':1,'success':true,'message':'Data Successful Delete'}];
        res.send(a);
        console.log("Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'data':0,'success':false,'message':'Data Not Delete'}];
        res.send(a);
    }
  
})

/*router.delete('/deleteDoctor/:id',(req,res)=>{
    doctor_schema.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{console.warn(err)})   
});*/

router.put('/updateDoctor/:id',(req,res)=>{
    var id={_id:req.params.id};
    //console.log(id)
    
    var name=req.body.name;
    var degree=req.body.degree;
    var mobile_no=req.body.mobile_no;
    try{
        //console.log(email_id);
        userQueries.updateDoctor({_id:req.params.id},name,degree,mobile_no);
        const a=[{'data':1,'success':true,'message':'Data Successful Update'}];
        res.send(a);
        console.log("Update Sussesful");
    }
    catch(err){
        console.log("Error in update",err);
        const a=[{'data':0,'success':false,'message':'Data Not Update'}];
        res.send(a);
    }
  
})

/*router.put('/updateDoctor/:id',(req,res)=>{
    doctor_schema.updateOne({_id:req.params.id},
        {$set:{
            name:req.body.name,
            degree:req.body.degree,
            mobile_no:req.body.mobile_no
            }
        }).then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>{console.warn(err)})
})*/

module.exports = router;
