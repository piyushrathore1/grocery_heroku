const conn = require("../config/db_config");
const insertmodel = require('../schema/vendor_schema');
 
const userQueries ={
    insertVendor:(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            Name:Name,
            MobileNo:MobileNo,
            Email_id:Email_id,
            Password:Password,
            status:status,
            upload_documents:upload_documents,
            cloudinary_id:cloudinary_id,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Vendor Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    
    deleteVendor:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    status   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateVendor:(id,Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
                Name : Name,
                MobileNo : MobileNo,
                Email_id : Email_id,
                Password : Password,
                status   : status,
                upload_documents : upload_documents,
                cloudinary_id    : cloudinary_id,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayVendor:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    }
    
}
module.exports = userQueries;