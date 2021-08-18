const express = require("express");
const router = express.Router();
//const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/offer_crud");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to offer route");
})

router.post("/addoffer",upload.single('OfferImage'),async(req,res)=>{
  
   // userQueries.insertCategory(req,res);


   var OfferName=req.body.OfferName;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
   
   var OfferStatus = req.body.OfferStatus;
   //var cloudinary_id = req.body.cloudinary_id;

   console.log(req.body)
   //Single FIle Uploaded upload.single('upload_documents')
   if(req.file){
       var OfferImage=req.file.path
   }else{
       console.log("file path is not set");
   }
   try{
       //console.log(req.file.path);
       // image upload on cloud
      // const result = await cloudinary.uploader.upload(req.file.path);
       //console.log(result);
      // var OfferImage=result.secure_url;
      // var OfferCloudinary_id=result.public_id;
      var OfferImage='';
      var OfferCloudinary_id = '';
        userQueries.insertoffer(OfferName,OfferImage,LanguageId,OfferStatus,OfferCloudinary_id);
      // res.send("Record inserted");
       const a={'Data':1,'Success':true,'Message':'offer Data Successful Insert'};
       res.send(a);
       console.log("Data Insert Sussesful");
   }
   catch(e){
       console.log("Error in insert",e);
   }
})

 router.post("/getoffer",(req,res)=>{
    userQueries.displayoffer(req,res);
})

router.post("/getofferbyid/:id",(req,res)=>{
    userQueries.displayofferbyid(req,res);
})

router.post("/deleteoffer/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteoffer({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Offer Data Successful Delete'};
        res.send(a);
        console.log("offer Delete Sussesfully");
    }
    catch(err){
        console.log("Error in delete",err);
        const a=[{'Data':0,'Success':false,'Message':'offer Data Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updateoffer/:id',upload.single('OfferImage'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var OfferName=req.body.OfferName;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
   var OfferDescription=req.body.OfferDescription;
   var CategoryId = req.body.CategoryId;
   var OfferStatus = req.body.Offerstatus;
    //samu change
    if(req.file){
        var OfferImage=req.file.path
    }
    try{
        if(OfferImage)
        {
            console.log("selcted  file to update");
            //upload_documents=req.body.upload_documents;
            const result = await cloudinary.uploader.upload(req.file.path);
            
            OfferImage=result.secure_url;
            var Offercloudinary_id=result.public_id;
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updateoffer({_id:req.params.id},OfferName,OfferImage,LanguageId,OfferStatus,OfferCloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'Offer Data Successful Update'};
              res.send(a);
              console.log("Update Sussesful with file");
        }else{
            console.log("no file selecte to update")
            var upload_documents='';
            var cloudinary_id='';
            admin_schema.find({_id:id},(err,users)=>{
                if(err) console.warn("error",err);
                // console.log(users);
                 users.forEach((day,index)=>{
                    OfferImage= day.upload_documents;
                    Offercloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateoffer({_id:req.params.id},OfferName,OfferImage,LanguageId,OfferStatus,OfferCloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Offer  Data Successful Update'};
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