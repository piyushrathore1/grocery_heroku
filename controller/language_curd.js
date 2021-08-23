const conn = require("../config/db_config");
const language_schema = require("../schema/language_schema");
const insertmodel = require('../schema/language_schema');
 
const userQueries ={
    insertLanguage:(Name,status) => {
        let userObj= {
            //_id:_id,
            LanguageName:Name,
            LanguageStatus:status,
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
                    LanguageStatus   : 1,
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
               LanguageStatus:status,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    /* displayLanguage:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    }, */
    getalllanguagename:async(req,res)=>{
        var all = [];
        try{
            const alldata = await language_schema.find({LanguageStatus:0});
            for (var key in alldata) {
               // console.log(alldata[key]["LanguageName"]);
                var languageall = alldata[key]["LanguageName"];
                all.push(languageall)
                
            }
            
            console.log(all)
            //res.send(alldata);
            return res.status(200).json({
                Data : all,
                Success :true,
                Message:'Language Name Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displayLanguage:async(req,res)=>{
        try{
            const alldata = await language_schema.find({LanguageStatus:0});
            /* const alldata = await language_schema.find({LanguageStatus:0}).select("LanguageName -_id"); */
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'Language Data Found Successfully'
            })
        }catch(e){ res.send(e)}
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