const express = require("express");
const router = express.Router();
//const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/brand_crud");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to subcategory route");
})

router.post("/addbrand",upload.single('BrandImage'),async(req,res)=>{
   var BrandName=req.body.BrandName;
   var LanguageId=req.body.LanguageId;
   var BrandDescription=req.body.BrandDescription;
   var BrandStatus = req.body.BrandStatus;
   

   console.log(req.body)
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
       var BrandImage=result.secure_url;
       var BrandCloudinary_id=result.public_id;
        userQueries.insertbrand(BrandName,BrandImage,LanguageId,BrandDescription,BrandStatus,BrandCloudinary_id);
      // res.send("Record inserted");
       const a={'Data':1,'Success':true,'Message':'brand Data Successful Insert'};
       res.send(a);
       console.log("Data Insert Sussesful");
   }
   catch(e){
       console.log("Error in insert",e);
   }


    

})

router.post("/getbrand",(req,res)=>{
    userQueries.displaybrand(req,res);
})

router.post("/getbrandbyid/:id",(req,res)=>{
    userQueries.displaybrandbyid(req,res);
})

router.post("/deletebrand/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deletebrand({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'brand Data Successful Delete'};
        res.send(a);
        console.log("brand Delete Sussesfully");
    }
    catch(err){
        console.log("Error in delete",err);
        const a=[{'Data':0,'Success':false,'Message':'brand Data Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updatebrand/:id',upload.single('BrandImage'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var BrandName=req.body.BrandName;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
   var BrandDescription=req.body.BrandDescription;
   var BrandStatus = req.body.BrandStatus;
  // var BrandCloudinary_id = req.body.BrandCloudinary_id;
    //samu change
    if(req.file){
        var SubcategoryImage=req.file.path
    }
    try{
        if(SubcategoryImage)
        {
            console.log("selcted  file to update");
            //upload_documents=req.body.upload_documents;
            const result = await cloudinary.uploader.upload(req.file.path);
            
            BrandImage=result.secure_url;
            var BrandCloudinary_id=result.public_id;
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updatebrand({_id:req.params.id},BrandName,BrandImage,LanguageId,BrandDescription,BrandStatus,BrandCloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'brand Data Successful Update'};
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
                    SubcategoryImage= day.upload_documents;
                    Subcategorycloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updatebrand({_id:req.params.id},BrandName,BrandImage,LanguageId,BrandDescription,BrandStatus,BrandCloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'brand  Data Successful Update'};
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