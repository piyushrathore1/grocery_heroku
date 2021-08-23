const conn = require("../config/db_config");
const productdetail_schema = require("../schema/productdetail_schema");



/* exports.addproductdetail = (req, res, next) => {
    /*  res.status(200).json({
       success: true,
       message: "hello language controller",
     }); 
 
     const productdetail = new productdetail_schema(req.body);
     console.log(req.body)
     productdetail.save().then(() =>{
         //res.send(vendordata);
         return res.status(200).json({
             Data: productdetail,
             msg:'productdetail Insert Sucessfully',
             sucess :'true',
         })
     }).catch((e)=>{
         res.send(e);
     })
 
 
   }; */

const userQueries ={
    insertProductdetail:(res,ProductdetailVariationName,ProductdetailImage,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus,ProductdetailCloudinary_id) => {
        let userObj= {
            //_id:_id,
            ProductdetailVariationName:ProductdetailVariationName,
            ProductdetailImage:ProductdetailImage,
            ProductId:ProductId,
            ProductdetailSFMrp:ProductdetailSFMrp,
            ProductdetailSFSrp:ProductdetailSFSrp,
            ProductdetailScheduleMrp:ProductdetailScheduleMrp,
            ProductdetailScheduleSrp:ProductdetailScheduleSrp,
            ProductdetailAdditionalDiscountSF:ProductdetailAdditionalDiscountSF,
            ProductdetailAdditionalDiscountSchedule:ProductdetailAdditionalDiscountSchedule,
            ProductdetailStatus:ProductdetailStatus,
            ProductdetailCloudinary_id:ProductdetailCloudinary_id
          
        }
   
       if(productdetail_schema.create(userObj)){
           console.log("ProductdetailAdd Successfully");
           const a={'Data':1,'Success':true,'Message':'ProductdetailData Successful Insert'};
            res.send(a);
            console.log(productdetail_schema.create(userObj))
       } 
      
       else{
           res.send("error");
        /* res.send({
            Data: 0,
            msg:'Vendor Insert not Sucessfully',
            sucess :'true',
        }) */
        console.warn("record not inserted");
       }
       console.log(productdetail_schema.create(userObj))
      
    },

     displayProductdetail:async(req,res)=>{
        try{
            const alldata = await productdetail_schema.find({ProductdetailStatus:0}).populate('ProductId');
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
                    ProductdetailStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updateProductdetail:(id,ProductdetailVariationName,ProductdetailImage,ProductId,ProductdetailSFMrp,ProductdetailSFSrp,ProductdetailScheduleMrp,ProductdetailScheduleSrp,ProductdetailAdditionalDiscountSF,ProductdetailAdditionalDiscountSchedule,ProductdetailStatus,ProductdetailCloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        productdetail_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               ProductdetailVariationName:ProductdetailVariationName,
               ProductdetailImage:ProductdetailImage,
               ProductId:ProductId,
               ProductdetailSFMrp:ProductdetailSFMrp,
               ProductdetailSFSrp:ProductdetailSFSrp,
               ProductdetailScheduleMrp:ProductdetailScheduleMrp,
               ProductdetailScheduleSrp:ProductdetailScheduleSrp,
               ProductdetailAdditionalDiscountSF:ProductdetailAdditionalDiscountSF,
               ProductdetailAdditionalDiscountSchedule:ProductdetailAdditionalDiscountSchedule,
               ProductdetailStatus:ProductdetailStatus,
               ProductdetailCloudinary_id:ProductdetailCloudinary_id   
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }, 
    
}
module.exports = userQueries;