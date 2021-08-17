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


   var Name=req.body.Name;
  // var Image1=req.body.Image1;
   //var LanguageId=req.body.LanguageId;
   var Description=req.body.Description;
   var Metatitle=req.body.Metatitle;
   var MetaDescription =req.body.MetaDescription;
   var status = req.body.status;
   //var cloudinary_id = req.body.cloudinary_id;

   console.log(req.body.upl)
   //Single FIle Uploaded upload.single('upload_documents')
   if(req.file){
       var upload_documents=req.file.path
   }else{
       console.log("file path is not set");
   }
   try{
       //console.log(req.file.path);
       // image upload on cloud
       const result = await cloudinary.uploader.upload(req.file.path);
       //console.log(result);
       var Image1=result.secure_url;
       var cloudinary_id=result.public_id;
       userQueries.insertCategory(Name,Image1,Description,Metatitle,MetaDescription,status,cloudinary_id);
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