const conn = require("../config/db_config");
const banner_schema = require("../schema/banner_schema");



const userQueries ={
    insertbanner:(BannerName,BannerImage,LanguageId,BannerType,BannerPosition,Bannerstatus,Bannercloudinary_id) => {
        let userObj= {
            //_id:_id,
            BannerName:BannerName,
            BannerImage:BannerImage,
            LanguageId:LanguageId,
            BannerType:BannerType,
            BannerPosition:BannerPosition,
            Bannerstatus:Bannerstatus,
            Bannercloudinary_id:Bannercloudinary_id,
        }
   
       if(banner_schema.create(userObj)){
           console.log("Banner Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

     displaybanner:async(req,res)=>{
        try{
            const alldata = await banner_schema.find({Bannerstatus:0}).populate('LanguageId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'Banner Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displaybannerbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await banner_schema.findById(_id,(error, data) => {
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
                Message:'Banner Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deletebanner:(id)=>{
        //console.log("samu=",{_id:id});
        banner_schema.updateOne({_id:id},
            {
                $set:{
                    Bannerstatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updatebanner:(id,BannerName,BannerImage,LanguageId,BannerDescription,CategoryId,Bannerstatus,Bannercloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        banner_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
            BannerName:BannerName,
            BannerImage:BannerImage,
            LanguageId:LanguageId,
            BannerDescription:BannerDescription,
            CategoryId:CategoryId,
            Bannerstatus:Bannerstatus,
            Bannercloudinary_id:Bannercloudinary_id,           
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }, 
    
}
module.exports = userQueries;