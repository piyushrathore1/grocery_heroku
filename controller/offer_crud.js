const conn = require("../config/db_config");
const offer_schema = require("../schema/offer_schema");



const userQueries ={
    insertoffer:(OfferName,OfferImage,LanguageId,OfferStatus,OfferCloudinary_id) => {
        let userObj= {
            //_id:_id,
            OfferName:OfferName,
            OfferImage:OfferImage,
            LanguageId:LanguageId,
            OfferStatus:OfferStatus,
            OfferCloudinary_id:OfferCloudinary_id,
        }
   
       if(offer_schema.create(userObj)){
           console.log("offer Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

     displayoffer:async(req,res)=>{
        try{
            const alldata = await offer_schema.find({OfferStatus:0}).populate('LanguageId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'offer Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displayofferbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await offer_schema.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Offer Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'offer Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deleteoffer:(id)=>{
        //console.log("samu=",{_id:id});
        offer_schema.updateOne({_id:id},
            {
                $set:{
                    OfferStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updateoffer:(id,OfferName,OfferImage,LanguageId,OfferStatus,OfferCloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        offer_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               OfferName:OfferName,
               OfferImage:OfferImage,
               LanguageId:LanguageId,
               OfferStatus:OfferStatus,
               OfferCloudinary_id:OfferCloudinary_id,          
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }, 
    
}
module.exports = userQueries;