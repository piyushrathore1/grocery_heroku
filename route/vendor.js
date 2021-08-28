const express = require("express");
const router =  express.Router();
const admin_schema = require("../schema/vendor_schema");
const userQueries = require("../controller/vendor_curd");
const upload = require("../controller/file_upload_vendor");
const cloudinary = require("../controller/cloudinary");
const { request } = require("express");
const fs = require('fs');
var Buffer = require('buffer');
/*router.post("/insert",(req,res)=>{
    //var a = new admin_schema(req.body);   
   // a.save();
    admin_schema.create(req.body).then((result)=>{
        res.send(result);
    })

})*/

router.post('/getAllVendor',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    var Data=[];
    try{
        var query = { Vendorstatus: 0 };
        admin_schema.find(query,(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
            //res.send(admin);
            admin.forEach((day,index)=>{
                //a.push(day);
                Data.push(day);
            })
            //a.push("Data":1,"success:true","message:display Successfully");
            Data={'Data':Data,'Success':true,'Message':'Vendor Data Successful Found'};
            res.send(Data);
        })
       /* userQueries.displayAdmin();
        const a=[{'Data':1,'Success':true,'Message':'Data Successful Delete'}];
        res.send(a);
        console.log("Delete Sussesful");*/
    }
    catch(err){
        console.log("this is erro",e);
    }

});

router.post("/getvendorbyid/:id",(req,res)=>{
    userQueries.displayvendorbyid(req,res);
})

//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
 router.post("/addVendor",upload.single('upload_documents'),async(req,res)=>{
    var Name=req.body.Name;
    var MobileNo=req.body.MobileNo;
    var Email_id=req.body.Email_id;
    var Password=req.body.Password;
    var status=req.body.status;
    //Single FIle Uploaded upload.single('upload_documents')
    if(req.file){
        var imageBuffer = request.file.buffer;
        console.log("Image Buffer :"+imageBuffer)
        //old
        //var imageName = 'public/images/map.png';
        //main
        var imageName = '/vendor_'+Date.now()+'.png';
        var path1 = fs.createWriteStream(imageName).write(imageBuffer);
        //old
        /* var upload_documents=req.file.path;
        console.log("path :"+upload_documents); */

        //new
        var upload_documents=path1;
        //f
    }else{
        console.log("file path is not set");
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
        // image upload on cloud
        const result = await cloudinary.uploader.upload(path1);
        //console.log(result);
        var upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
      //var upload_documents = '';
     // var cloudinary_id = '';
        userQueries.insertVendor(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
       // res.send("Record inserted");
        const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
});

router.post("/deleteVendor/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        console.log(req.params._id);
        userQueries.deleteVendor({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Delete'};
        res.send(a);
        console.log("Vendor Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'Data':0,'Success':false,'Message':'Vendor Data Not Delete'}];
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

router.post('/updateVendor/:id',upload.single('upload_documents'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var Name=req.body.Name;
    var MobileNo=req.body.MobileNo;
    var Email_id=req.body.Email_id;
    var Password=req.body.Password;
    var status=req.body.status;
    //samu change
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
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updateVendor({_id:req.params.id},Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Update'};
              res.send(a);
              console.log("Update Sussesful with file");
        }else{
            console.log("no file selecte to update")
            var upload_documents;
            var cloudinary_id;
            admin_schema.find({_id:id},(err,users)=>{
                if(err) console.warn("error",err);
                // console.log(users);
                 users.forEach((day,index)=>{
                    upload_documents= day.upload_documents;
                    cloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateVendor({_id:req.params.id},Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Update'};
            res.send(a);
            console.log("Update Sussesful without file");
            
        }}
        catch(err){
             console.log("Error in update",err);
            const a=[{'Data':0,'Success':false,'Message':'Data Not Update'}];
            res.send(a);
        }
    //
   // try{
        //console.log(email_id);
       // userQueries.updateAdmin({_id:req.params.id},email_id,password,status);
      /* userQueries.updateAdmin({_id:req.params.id},email_id,password,status);
        const a=[{'Data':1,'Success':true,'Message':'Data Successful Update'}];
        res.send(a);
        console.log("Update Sussesful");
    }
    catch(err){
        console.log("Error in update",err);
        const a=[{'Data':0,'Success':false,'Message':'Data Not Update'}];
        res.send(a);
    }*/
  
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