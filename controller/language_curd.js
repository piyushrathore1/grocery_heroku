const conn = require("../config/db_config");
const insertmodel = require('../schema/language_schema');
 
const userQueries ={
    insertLanguage:(Name,status) => {
        let userObj= {
            //_id:_id,
            LanguageName:Name,
            Languagestatus:status,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Language Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    
    deleteLanguage:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    Languagestatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateLanguage:(id,Name,status)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
               LanguageName:Name,
               Languagestatus:status,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayLanguage:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    }
    
}
module.exports = userQueries;