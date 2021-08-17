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
  
   // userQueries.insertCategory(req,res);


   var Name=req.body.Name;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
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
       userQueries.insertCategory(Name,Image1,LanguageId,Description,Metatitle,MetaDescription,status,cloudinary_id);
      // res.send("Record inserted");
       const a={'Data':1,'Success':true,'Message':'Category Data Successful Insert'};
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

router.post("/deletecategory/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteCategory({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Category Data Successful Delete'};
        res.send(a);
        console.log("Category Delete Sussesfully");
    }
    catch(err){
        console.log("Error in delete",err);
        const a=[{'Data':0,'Success':false,'Message':'Category Data Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updateCategory/:id',upload.single('Image1'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var Name=req.body.Name;
    // var Image1=req.body.Image1;
     var LanguageId=req.body.LanguageId;
     var Description=req.body.Description;
     var Metatitle=req.body.Metatitle;
     var MetaDescription =req.body.MetaDescription;
     var status = req.body.status;
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
           userQueries.updateCategory({_id:req.params.id},Name,upload_documents,LanguageId,Description,Metatitle,MetaDescription,status,cloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'Category Data Successful Update'};
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
                    userQueries.updateCategory({_id:req.params.id},Name,upload_documents,LanguageId,Description,Metatitle,MetaDescription,status,cloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Category  Data Successful Update'};
            res.send(a);
            console.log("Update Sussesful without file");
            
        }}
        catch(err){
             console.log("Error in update",err);
            const a=[{'Data':0,'Success':false,'Message':'Data Not Update'}];
            res.send(a);
        }
  
})



module.exports = router;