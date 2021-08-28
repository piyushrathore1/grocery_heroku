const conn = require("../config/db_config");
const insertmodel = require('../schema/photo_schema');
 
const userQueries ={
    insertphoto:(upload_Photo) => {
        let userObj= {
            //_id:_id,
            upload_Photo:upload_Photo,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Photo Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    


  
    
}
module.exports = userQueries;