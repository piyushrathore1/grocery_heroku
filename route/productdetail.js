const express = require("express");
const router = express.Router();
//const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/productdetail_crud");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");
const productdetail_schema = require("../schema/productdetail_schema");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to Productdetail Route");
})

 router.post("/addproductdetail",upload.single('ProductdetailImage'),async(req,res)=>{
  
   // userQueries.insertCategory(req,res);


   var ProductdetailVariationName=req.body.ProductdetailVariationName;
   var ProductId=req.body.ProductId;
   var ProductdetailSFMrp=req.body.ProductdetailSFMrp;
   var ProductdetailSFSrp = req.body.ProductdetailSFSrp;
   var ProductdetailScheduleMrp = req.body.ProductdetailScheduleMrp;
   var ProductdetailScheduleSrp = req.body.ProductdetailScheduleSrp;
   var ProductdetailAdditionalDiscountSF = req.body.ProductdetailAdditionalDiscountSF;
    var ProductdetailAdditionalDiscountSchedule = req.body.ProductdetailAdditionalDiscountSchedule;
   var ProductdetailStatus = req.body.ProductdetailStatus;
   //var cloudinary_id = req.body.cloudinary_id;

   console.log(req.body)
   //Single FIle Uploaded upload.single('upload_documents')
    if(req.file){
       var ProductdetailImage=req.file.path
   }else{
       console.log("file path is not set");
   } 
   try{
       //console.log(req.file.path);
       // image upload on cloud
       const result = await cloudinary.uploader.upload(req.file.path);
       //console.log(result);
       var ProductdetailImage=result.secure_url;
       var ProductdetailCloudinary_id=result.public_id;
        userQueries.insertProductdetail(res,ProductdetailVariationName,ProductdetailImage,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus,ProductdetailCloudinary_id);
      // res.send("Record inserted");
       
       console.log("Data Insert Sussesful");
   }
   catch(e){
   
       console.log("Error in insert",e);
   }


    

}) 

/* 
router.post("/addproductdetail",(req,res)=>{
    var ProductdetailVariationName=req.body.ProductdetailVariationName;
   var ProductId=req.body.ProductId;
   var ProductdetailSFMrp=req.body.ProductdetailSFMrp;
   var ProductdetailSFSrp = req.body.ProductdetailSFSrp;
   var ProductdetailScheduleMrp = req.body.ProductdetailScheduleMrp;
   var ProductdetailScheduleSrp = req.body.ProductdetailScheduleSrp;
   var ProductdetailAdditionalDiscountSF = req.body.ProductdetailAdditionalDiscountSF;
    var ProductdetailAdditionalDiscountSchedule = req.body.ProductdetailAdditionalDiscountSchedule;
   var ProductdetailStatus = req.body.ProductdetailStatus;
    try{
        userQueries.insertProductdetail(ProductdetailVariationName,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus);
        const a={'Data':1,'Success':true,'Message':'productdetail Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
}); */

router.post("/getproductdetail",(req,res)=>{
    userQueries.displayProductdetail(req,res);
})

router.post("/getproductdetailbyid/:id",(req,res)=>{
    userQueries.displayProductdetailbyid(req,res);
})

router.post("/deleteproductdetail/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteProductdetail({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'ProductdetailData Successful Delete'};
        res.send(a);
        console.log("ProductdetailDelete Sussesfully");
    }
    catch(err){
        console.log("Error in delete",err);
        const a=[{'Data':0,'Success':false,'Message':'ProductdetailData Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updateproductdetail/:id',upload.single('ProductdetailImage'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var ProductdetailVariationName=req.body.ProductdetailVariationName;
    var ProductId=req.body.ProductId;
    var ProductdetailSFMrp=req.body.ProductdetailSFMrp;
    var ProductdetailSFSrp = req.body.ProductdetailSFSrp;
    var ProductdetailScheduleMrp = req.body.ProductdetailScheduleMrp;
    var ProductdetailScheduleSrp = req.body.ProductdetailScheduleSrp;
    var ProductdetailAdditionalDiscountSF = req.body.ProductdetailAdditionalDiscountSF;
     var ProductdetailAdditionalDiscountSchedule = req.body.ProductdetailAdditionalDiscountSchedule;
    var ProductdetailStatus = req.body.ProductdetailStatus;
    //samu change
    if(req.file){
        var ProductdetailImage=req.file.path
    }
    try{
        if(ProductdetailImage)
        {
            console.log("selcted  file to update");
            //upload_documents=req.body.upload_documents;
            const result = await cloudinary.uploader.upload(req.file.path);
            
            ProductdetailImage=result.secure_url;
            var ProductdetailCloudinary_id=result.public_id;
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updateProductdetail({_id:req.params.id},ProductdetailVariationName,ProductdetailImage,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus,ProductdetailCloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'ProductdetailData Successful Update'};
              res.send(a);
              console.log("Update Sussesful with file");
        }else{
            console.log("no file selecte to update")
            var upload_documents;
            var cloudinary_id;
            productdetail_schema.find({_id:id},(err,users)=>{
                if(err) console.warn("error",err);
                // console.log(users);
                 users.forEach((day,index)=>{
                    ProductdetailImage= day.upload_documents;
                    ProductdetailCloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateProductdetail({_id:req.params.id},ProductdetailVariationName,ProductdetailImage,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus,ProductdetailCloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Productdetail Data Successful Update'};
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