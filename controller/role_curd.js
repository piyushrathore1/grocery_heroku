const conn = require("../config/db_config");
const insertmodel = require('../schema/role_schema');
 
const userQueries ={
    insertRole:(DesignationName,status) => {
        let userObj= {
            //_id:_id,
            DesignationName:DesignationName,
            Designationstatus:status,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Role Add Successful");
       } 
       else{
        console.warn("Role not inserted");
       }
      
    },

    
    deleteRole:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    Rolestatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateAdmin:(id,DesignationName,status)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
               DesignationName : DesignationName,
               Designationstatus   : status,
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