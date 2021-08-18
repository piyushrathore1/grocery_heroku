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
        
    },
    displaylanguagebyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await insertmodel.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Language Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'Language Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    }
    
}
module.exports = userQueries;