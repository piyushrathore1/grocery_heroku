const express = require("express");
const router =  express.Router();
const admin_schema = require("../schema/photo_schema");
const userQueries = require("../controller/photo_crud");
const upload = require("../controller/photoupload");
const cloudinary = require("../controller/cloudinary");







//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
 router.post("/addphoto",upload.single('upload_Photo'),async(req,res)=>{
    if(req.file){
        var upload_Photo = req.file.path
    }else{
        console.log("file path is not set");
    }

    try{
        //console.log(req.file.path);
        // image upload on cloud
        const result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result);
        var upload_Photo=result.secure_url;
        var cloudinary_id=result.public_id;
       //var upload_documents='';
        //var cloudinary_id='';
        userQueries.insertphoto(upload_Photo);
       // res.send("Record inserted");
        const a={'Data':1,'Success':true,'Message':'photo Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
});


module.exports = router;