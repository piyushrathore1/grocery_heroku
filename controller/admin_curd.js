const conn = require("../config/db_config");
const insertmodel = require('../schema/admin_schema');
 
const userQueries ={
    insertAdmin:(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            AdminName:Name,
            AdminMobileNo:MobileNo,
            AdminEmail_id:Email_id,
            AdminPassword:Password,
            Adminstatus:status,
            Adminupload_Photo:upload_documents,
            Admincloudinary_id:cloudinary_id,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Vendor Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    
    deleteAdmin:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    Adminstatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateAdmin:(id,Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
               AdminName:Name,
               AdminMobileNo:MobileNo,
               AdminEmail_id:Email_id,
               AdminPassword:Password,
               Adminstatus:status,
               Adminupload_Photo:upload_documents,
               Admincloudinary_id:cloudinary_id,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayAdmin:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    },
    displayadminbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await insertmodel.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Admin Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'Admin Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    
}
module.exports = userQueries;