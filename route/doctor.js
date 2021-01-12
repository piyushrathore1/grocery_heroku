const express = require("express");
const router =  express.Router();
const doctor_schema = require("../schema/doctor_schema");
const userQueries = require("../controller/doctor_curd");
//image upload to cloud
const upload = require("../controller/file_upload_doctor");
const cloudinary = require("../controller/cloudinary");

router.post("/addDoctor",upload.single('upload_documents'),async(req,res)=>{
    var name = req.body.name;
    //console.log(name);
    var degree = req.body.degree;
    var mobile_no = req.body.mobile_no;
    var alternative_mobile_no = req.body.alternative_mobile_no;
    var clinic_name = req.body.clinic_name;
    var clinic_address = req.body.clinic_address;
    var city = req.body.city;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var landmark = req.body.landmark;
    var doctor_reg_no = req.body.doctor_reg_no;
    var email_id = req.body.email_id;
    //var upload_documents = req.body.upload_documents;
    if(req.file){
        var upload_documents=req.file.path
    }
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        var upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
        //var cloudinary_id=result.public_id;
       // var file_o_name=req.file.originalname;
        userQueries.insertUser(name,degree,mobile_no,alternative_mobile_no,clinic_name,clinic_address,city,state,pincode,landmark,doctor_reg_no,email_id,upload_documents,cloudinary_id);
        //res.send("Record inserted");
        const a=[{'data':1,'success':true,'message':'Data Successful Insert'}];
        res.send(a);
        //res.send("samundar");
        console.log("Data Insert Sussesful");
    }
    catch{
        console.log("Error in insert");
    }
});

router.get('/getAllDoctor',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    try{
        doctor_schema.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
           // console.log(admin);
           console.log("record display successfully");
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

router.put('/updateDoctor/:id',upload.single('upload_documents'),async(req,res)=>{
    var id={_id:req.params.id};
    //console.log(id)
    
    var name=req.body.name;
    var degree=req.body.degree;
    var mobile_no=req.body.mobile_no;
    var alternative_mobile_no = req.body.alternative_mobile_no;
    var clinic_name = req.body.clinic_name;
    var clinic_address = req.body.clinic_address;
    var city = req.body.city;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var landmark = req.body.landmark;
    var doctor_reg_no = req.body.doctor_reg_no;
    var email_id = req.body.email_id;
    
    //console.log(name);
    //samu update
    if(req.file){
        var upload_documents=req.file.path
    }
    try{
    if(upload_documents)
    {
        console.log("selcted  file to update");
        //upload_documents=req.body.upload_documents;
        const result = await cloudinary.uploader.upload(req.file.path);
        
        upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
        console.log(upload_documents);
        console.log(cloudinary_id);
       userQueries.updateDoctor({_id:req.params.id},name,degree,mobile_no,alternative_mobile_no,
            clinic_name,clinic_address,city,state,pincode,landmark,
            doctor_reg_no,email_id,upload_documents,cloudinary_id);

          const a=[{'data':1,'success':true,'message':'Data Successful Update'}];
          res.send(a);
          console.log("Update Sussesful");
    }else{
        var upload_documents;
        var cloudinary_id;
        doctor_schema.find({_id:id},(err,users)=>{
            if(err) console.warn("error",err);
            // console.log(users);
             users.forEach((day,index)=>{
                upload_documents= day.upload_documents;
                cloudinary_id= day.cloudinary_id;
                console.log(upload_documents);
                console.log(cloudinary_id);
                userQueries.updateDoctor({_id:req.params.id},name,degree,mobile_no,alternative_mobile_no,
                    clinic_name,clinic_address,city,state,pincode,landmark,
                    doctor_reg_no,email_id,upload_documents,cloudinary_id);
            })})
        
        const a=[{'data':1,'success':true,'message':'Data Successful Update'}];
        res.send(a);
        console.log("Update Sussesful");
        console.log("no file selecte to update")
    }}
    catch(err){
         console.log("Error in update",err);
        const a=[{'data':0,'success':false,'message':'Data Not Update'}];
        res.send(a);
    }
   /* var upload_documents;
    doctor_schema.find({_id:id},(err,users)=>{
        if(err) console.warn("error",err);
        // console.log(users);
        users.forEach((day,index)=>{
            //console.log(day.upload_documents);
            //console.log(req.body.upload_documents);
            if(day.file_o_name == req.body)
            {
                console.log(" match");
                upload_documents=day.upload_documents;
                console.log(upload_documents);

            }
            else{
                console.log("not match");
                upload_documents=req.body.upload_documents;
                console.log(upload_documents);
               // const result = await cloudinary.uploader.upload(req.file.path);
                upload_documents=result.secure_url;
                console.log(upload_documents);
            }
        })})*/
    //
   // try{
        //console.log(email_id);
        //userQueries.updateDoctor({_id:req.params.id},name,degree,mobile_no,alternative_mobile_no,
          //  clinic_name,clinic_address,city,state,pincode,landmark,
           // doctor_reg_no,email_id);
        //const a=[{'data':1,'success':true,'message':'Data Successful Update'}];
        //res.send(a);
        //console.log("Update Sussesful");
  /*  }
    catch(err){
        console.log("Error in update",err);
        const a=[{'data':0,'success':false,'message':'Data Not Update'}];
        res.send(a);
    }*/
  
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
