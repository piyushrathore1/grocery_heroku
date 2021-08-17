const conn = require("../config/db_config");
const brand_schema = require("../schema/brand_schema");



const userQueries ={
    insertbrand:(BrandName,BrandImage,LanguageId,BrandDescription,BrandStatus,BrandCloudinary_id) => {
        let userObj= {
            //_id:_id,
            BrandName:BrandName,
            BrandImage:BrandImage,
            LanguageId:LanguageId,
            BrandDescription:BrandDescription,
            BrandStatus:BrandStatus,
            BrandCloudinary_id:BrandCloudinary_id
        }
   
       if(brand_schema.create(userObj)){
           console.log("brand Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

      displaybrand:async(req,res)=>{
        try{
            const alldata = await brand_schema.find({BrandStatus:0}).populate('LanguageId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'brand Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displaybrandbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await brand_schema.findById(_id,(error, data) => {
                if (error) {
                  return next(error)
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: alldata,
                Success :true,
                Message:'brand Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deletebrand:(id)=>{
        //console.log("samu=",{_id:id});
        brand_schema.updateOne({_id:id},
            {
                $set:{
                    BrandStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updatebrand:(id,BrandName,BrandImage,LanguageId,BrandDescription,BrandStatus,BrandCloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        brand_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               BrandName:BrandName,
               BrandImage:BrandImage,
               LanguageId:LanguageId,
               BrandDescription:BrandDescription,
               BrandStatus:BrandStatus,
               BrandCloudinary_id:BrandCloudinary_id         
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },  
    
}
module.exports = userQueries;