const express = require("express");
const router = express.Router();
//const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/banner_crud");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to Banner route");
})

router.post("/addbanner",upload.single('BannerImage'),async(req,res)=>{
  
   // userQueries.insertCategory(req,res);


   var BannerName=req.body.BannerName;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
   var BannerType=req.body.BannerType;
   var BannerPosition = req.body.BannerPosition;
   var Bannerstatus = req.body.Bannerstatus;
   //var cloudinary_id = req.body.cloudinary_id;

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
       var BannerImage=result.secure_url;
       var Bannercloudinary_id=result.public_id;
        userQueries.insertbanner(BannerName,BannerImage,LanguageId,BannerType,BannerPosition,Bannerstatus,Bannercloudinary_id);
      // res.send("Record inserted");
       const a={'Data':1,'Success':true,'Message':'Banner Data Successful Insert'};
       res.send(a);
       console.log("Data Insert Sussesful");
   }
   catch(e){
       console.log("Error in insert",e);
   }


    

})

router.post("/getBanner",(req,res)=>{
    userQueries.displayBanner(req,res);
})

router.post("/getBannerbyid/:id",(req,res)=>{
    userQueries.displayBannerbyid(req,res);
})

router.post("/deleteBanner/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteBanner({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Banner Data Successful Delete'};
        res.send(a);
        console.log("Banner Delete Sussesfully");
    }
    catch(err){
        console.log("Error in delete",err);
        const a=[{'Data':0,'Success':false,'Message':'Banner Data Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updateBanner/:id',upload.single('BannerImage'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var BannerName=req.body.BannerName;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
   var BannerDescription=req.body.BannerDescription;
   var CategoryId = req.body.CategoryId;
   var Bannerstatus = req.body.Bannerstatus;
    //samu change
    if(req.file){
        var BannerImage=req.file.path
    }
    try{
        if(BannerImage)
        {
            console.log("selcted  file to update");
            //upload_documents=req.body.upload_documents;
            const result = await cloudinary.uploader.upload(req.file.path);
            
            BannerImage=result.secure_url;
            var Bannercloudinary_id=result.public_id;
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updateBanner({_id:req.params.id},BannerName,BannerImage,LanguageId,BannerDescription,CategoryId,Bannerstatus,Bannercloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'Banner Data Successful Update'};
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
                    BannerImage= day.upload_documents;
                    Bannercloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateBanner({_id:req.params.id},BannerName,BannerImage,LanguageId,BannerDescription,CategoryId,Bannerstatus,Bannercloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Banner  Data Successful Update'};
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