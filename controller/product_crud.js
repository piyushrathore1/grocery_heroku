const conn = require("../config/db_config");
const product_schema = require("../schema/product_schema");



const userQueries ={
    insertProduct:(ProductName,ProductImage,LanguageId,SubcategoryId,ProductTag,ProductTaxslab,HsnId,ProductStatus,ProductCloudinary_id) => {
        let userObj= {
            //_id:_id,
            ProductName:ProductName,
            ProductImage:ProductImage,
            LanguageId:LanguageId,
            SubcategoryId:SubcategoryId,
            ProductTag:ProductTag,
            ProductTaxslab:ProductTaxslab,
            HsnId:HsnId,
            ProductStatus:ProductStatus,
            ProductCloudinary_id:ProductCloudinary_id,
        }
   
       if(product_schema.create(userObj)){
           console.log("Product Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

     displayProduct:async(req,res)=>{
        try{
            const alldata = await product_schema.find({ProductStatus:0}).populate('LanguageId').populate('SubcategoryId').populate('HsnId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'Product Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displayProductbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await product_schema.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'product Id not found'
                })

                 /*  return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Banner Id not found'
                }) */
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'Product Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deleteProduct:(id)=>{
        //console.log("samu=",{_id:id});
        product_schema.updateOne({_id:id},
            {
                $set:{
                    ProductStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updateProduct:(id,ProductName,ProductImage,LanguageId,SubcategoryId,ProductTag,ProductTaxslab,HsnId,ProductStatus,ProductCloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        product_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               ProductName:ProductName,
               ProductImage:ProductImage,
               LanguageId:LanguageId,
               SubcategoryId:SubcategoryId,
               ProductTag:ProductTag,
               ProductTaxslab:ProductTaxslab,
               HsnId:HsnId,
               ProductStatus:ProductStatus,
               ProductCloudinary_id:ProductCloudinary_id,          
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }, 
    
}
module.exports = userQueries;