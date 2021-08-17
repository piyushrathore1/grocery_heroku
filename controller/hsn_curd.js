const conn = require("../config/db_config");
const insertmodel = require('../schema/hsn_schema');
 
const userQueries ={
    insertHsn:(Code,Tax,status) => {
        let userObj= {
            //_id:_id,
            HsnCode:Code,
            HsnTax:Tax,
            Hsnstatus:status,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Hsn Add Successful");
       } 
       else{
        console.warn("Hsn not inserted");
       }
      
    },

    
    deleteHsn:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    Hsnstatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateHsn:(id,Code,Tax,status)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
               Code : Code,
               Tax:Tax,
                status   : status,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayHsn:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    }
    
}
module.exports = userQueries;