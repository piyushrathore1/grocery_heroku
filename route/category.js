const express = require("express");
const router = express.Router();
//const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/category_crud");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to category route");
})

router.post("/addcategory",upload.single('Image1'),async(req,res)=>{
  
    /* if(req.file){
        var Image1=req.file.path
    }else{
        console.log("file path is not set"+Image1);
    }
    const result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result);
        var upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
    console.log(upload_documents);
    console.log(cloudinary_id) */
   // userQueries.insertCategory(req,res);



  /*  var Name=req.body.Name;
    var MobileNo=req.body.MobileNo;
    var Email_id=req.body.Email_id;
    var Password=req.body.Password;
    var status=req.body.status; */
    //Single FIle Uploaded upload.single('upload_documents')
    if(req.file){
        var upload_documents=req.file.path
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
        const result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result);
        var upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
        userQueries.insertCategory(req,res,upload_documents,cloudinary_id);
       // res.send("Record inserted");
        const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }

})

router.post("/getcategory",(req,res)=>{
    userQueries.displayCategory(req,res);
})

router.post("/getcategorybyid/:id",(req,res)=>{
    userQueries.displaycategorybyid(req,res);
})



module.exports = router;