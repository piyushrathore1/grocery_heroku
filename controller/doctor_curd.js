const conn = require("../config/db_config");
const insertmodel = require('../schema/doctor_schema');

const userQueries ={
    insertUser:(name,degree,mobile_no) => {
        let userObj= {
            //_id:_id,
            name:name,
            degree:degree,
            mobile_no:mobile_no,
        }
   
        //console.log("asd");
       if(insertmodel.create(userObj)){
           console.log("record inserted");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    deleteDoctor:(id)=>{
        insertmodel.deleteOne({_id:id}).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateDoctor:(id,name,degree,mobile_no)=>{
        //console.log(email_id);
        console.log("come to update");
        insertmodel.updateOne({_id:id},
            {$set:{
                    name:name,
                    degree:degree,
                    mobile_no:mobile_no
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }
    
    
}
module.exports = userQueries;