const conn = require("../config/db_config");
const insertmodel = require('../schema/admin_schema');

const userQueries ={
    insertUser:(email_id,password,status,upload_documents,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            email_id:email_id,
            password:password,
            status:status,
            upload_documents:upload_documents,
            cloudinary_id:cloudinary_id,
        }
   
       if(insertmodel.create(userObj)){
           console.log("record inserted");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    
    deleteAdmin:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.deleteOne({_id:id}).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateAdmin:(id,email_id,password,status,upload_documents,cloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
                email_id : email_id,
                password : password,
                status   : status,
                upload_documents : upload_documents,
                cloudinary_id    : cloudinary_id,
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
        
    }
    
}
module.exports = userQueries;