const express = require("express");
const router =  express.Router();
const admin_schema = require("../schema/admin_schema");
const userQueries = require("../controller/admin_curd");
const upload = require("../controller/file_upload");
const cloudinary = require("../controller/cloudinary");
/*router.post("/insert",(req,res)=>{
    //var a = new admin_schema(req.body);   
   // a.save();
    admin_schema.create(req.body).then((result)=>{
        res.send(result);
    })

})*/

router.get('/getAllAdmin',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    try{
        admin_schema.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
            //res.send(admin);
            admin.forEach((day,index)=>{
                a.push(day);
            })
            a.push("success:true","message:display Successfully");
            res.send(a);
        })
       /* userQueries.displayAdmin();
        const a=[{'data':1,'success':true,'message':'Data Successful Delete'}];
        res.send(a);
        console.log("Delete Sussesful");*/
    }
    catch(err){
        console.log("this is erro",e);
    }

});

//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
 router.post("/addAdmin",upload.single('upload_documents'),async(req,res)=>{
    var email_id=req.body.email_id;
    var password=req.body.password;
    var status=req.body.status;
    //Single FIle Uploaded 
    if(req.file){
        var upload_documents=req.file.path
    }
    //Multipal File Uploaded
   /* if(req.files){
        let path=''
        req.files.forEach((files,index,arr)=>{
            path = path + files.path + ','
        })
        path = path.substring(0,path.lastIndexOf(","))
        var upload_documents=path
    }*/
    try{
        //console.log(req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result);
        var upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
        userQueries.insertUser(email_id,password,status,upload_documents,cloudinary_id);
       // res.send("Record inserted");
        const a=[{'data':1,'success':true,'message':'Data Successful Insert'}];
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
});

router.delete("/deleteAdmin/:id",(req,res)=>{
    var id={_id:req.params.id};
    try{
        console.log(id);
        userQueries.deleteAdmin({_id:req.params.id});
        const a=[{'data':1,'success':true,'message':'Data Successful Delete'}];
        res.send(a);
        console.log("Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'data':0,'success':false,'message':'Data Not Delete'}];
        res.send(a);
    }
  
});

/*router.delete('/delete1/:id',(req,res)=>{
    //const s1={_id:req.params.id};
    //console.log(s1);
    admin_schema.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{console.warn(err)}) 
});*/

router.put('/updateAdmin/:id',(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var email_id=req.body.email_id;
    var password=req.body.password;
    var status=req.body.status;
    try{
        //console.log(email_id);
       // userQueries.updateAdmin({_id:req.params.id},email_id,password,status);
       userQueries.updateAdmin({_id:req.params.id},email_id,password,status);
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

/*router.put('/updateAdmin/:id',(req,res)=>{
    admin_schema.updateOne({_id:req.params.id},
        {$set:{
            email_id:req.body.email_id,
            password:req.body.password,
            status:req.body.status
            }
        }).then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>{console.warn(err)})
});*/


module.exports = router;