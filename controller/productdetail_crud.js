const conn = require("../config/db_config");
const productdetail_schema = require("../schema/productdetail_schema");



const userQueries ={
    insertProductdetail:(ProductdetailVariationName,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus) => {
        let userObj= {
            //_id:_id,
            ProductdetailVariationName:ProductdetailVariationName,
            ProductId:ProductId,
            ProductdetailSFMrp:ProductdetailSFMrp,
            ProductdetailSFSrp:ProductdetailSFSrp,
            ProductdetailScheduleMrp:ProductdetailScheduleMrp,
            ProductdetailScheduleSrp:ProductdetailScheduleSrp,
            ProductdetailAdditionalDiscountSF:ProductdetailAdditionalDiscountSF,
            ProductdetailAdditionalDiscountSchedule:ProductdetailAdditionalDiscountSchedule,
            ProductdetailStatus:ProductdetailStatus
          
        }
   
       if(productdetail_schema.create(userObj)){
           console.log("ProductdetailAdd Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

     displayProductdetail:async(req,res)=>{
        try{
            const alldata = await productdetail_schema.find({ProductStatus:0}).populate('LanguageId').populate('SubcategoryId').populate('HsnId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'ProductdetailData Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displayProductdetailbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await productdetail_schema.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'ProductdetailId not found'
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
                Message:'ProductdetailData Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deleteProductdetail:(id)=>{
        //console.log("samu=",{_id:id});
        productdetail_schema.updateOne({_id:id},
            {
                $set:{
                    ProductStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updateProductdetail:(id,ProductdetailVariationName,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus)=>{
        //console.log(email_id);
        console.log("come to update ");
        productdetail_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               ProductdetailVariationName:ProductdetailVariationName,
               ProductId:ProductId,
               ProductdetailSFMrp:ProductdetailSFMrp,
               ProductdetailSFSrp:ProductdetailSFSrp,
               ProductdetailScheduleMrp:ProductdetailScheduleMrp,
               ProductdetailScheduleSrp:ProductdetailScheduleSrp,
               ProductdetailAdditionalDiscountSF:ProductdetailAdditionalDiscountSF,
               ProductdetailAdditionalDiscountSchedule:ProductdetailAdditionalDiscountSchedule,
               ProductdetailStatus:ProductdetailStatus        
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }, 
    
}
module.exports = userQueries;