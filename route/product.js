const express = require("express");
const router = express.Router();
//const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/product_crud");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to Product route");
})

router.post("/addproduct",upload.single('ProductImage'),async(req,res)=>{
  
   // userQueries.insertCategory(req,res);


   var ProductName=req.body.ProductName;
  // var Image1=req.body.Image1;
   var LanguageId=req.body.LanguageId;
   var SubcategoryId=req.body.SubcategoryId;
   var ProductTag = req.body.ProductTag;
   var ProductTaxslab = req.body.ProductTaxslab;
   var HsnId = req.body.HsnId;
   var ProductStatus = req.body.ProductStatus;
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
       var ProductImage=result.secure_url;
       var ProductCloudinary_id=result.public_id;
        userQueries.insertProduct(ProductName,ProductImage,LanguageId,SubcategoryId,ProductTag,ProductTaxslab,HsnId,ProductStatus,ProductCloudinary_id);
      // res.send("Record inserted");
       const a={'Data':1,'Success':true,'Message':'Product Data Successful Insert'};
       res.send(a);
       console.log("Data Insert Sussesful");
   }
   catch(e){
       console.log("Error in insert",e);
   }


    

})

router.post("/getproduct",(req,res)=>{
    userQueries.displayProduct(req,res);
})

router.post("/getproductbyid/:id",(req,res)=>{
    userQueries.displayProductbyid(req,res);
})

router.post("/deleteproduct/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteProduct({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Product Data Successful Delete'};
        res.send(a);
        console.log("Product Delete Sussesfully");
    }
    catch(err){
        console.log("Error in delete",err);
        const a=[{'Data':0,'Success':false,'Message':'Product Data Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updateproduct/:id',upload.single('ProductImage'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var ProductName=req.body.ProductName;
    // var Image1=req.body.Image1;
     var LanguageId=req.body.LanguageId;
     var SubcategoryId=req.body.SubcategoryId;
     var ProductTag = req.body.ProductTag;
     var ProductTaxslab = req.body.ProductTaxslab;
     var HsnId = req.body.HsnId;
     var ProductStatus = req.body.ProductStatus;
    //samu change
    if(req.file){
        var ProductImage=req.file.path
    }
    try{
        if(ProductImage)
        {
            console.log("selcted  file to update");
            //upload_documents=req.body.upload_documents;
            const result = await cloudinary.uploader.upload(req.file.path);
            
            ProductImage=result.secure_url;
            var ProductCloudinary_id=result.public_id;
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updateProduct({_id:req.params.id},ProductName,ProductImage,LanguageId,SubcategoryId,ProductTag,ProductTaxslab,HsnId,ProductStatus,ProductCloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'Product Data Successful Update'};
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
                    ProductImage= day.upload_documents;
                    Productcloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateProduct({_id:req.params.id},ProductName,ProductImage,LanguageId,SubcategoryId,ProductTag,ProductTaxslab,HsnId,ProductStatus,ProductCloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Product  Data Successful Update'};
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