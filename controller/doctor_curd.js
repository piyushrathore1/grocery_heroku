const conn = require("../config/db_config");
const insertmodel = require('../schema/doctor_schema');

const userQueries ={
    insertUser:(name,degree,mobile_no,alternative_mobile_no,clinic_name,clinic_address,city,state,pincode,landmark,doctor_reg_no,email_id,upload_documents,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            name : name,
            degree : degree,
            mobile_no : mobile_no,
            alternative_mobile_no : alternative_mobile_no,
            clinic_name : clinic_name,
            clinic_address : clinic_address,
            city : city,
            state : state,
            pincode : pincode,
            landmark : landmark,
            doctor_reg_no : doctor_reg_no,
            email_id : email_id,
            upload_documents : upload_documents,
            cloudinary_id :cloudinary_id,
            
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

    updateDoctor:(id,name,degree,mobile_no,alternative_mobile_no,
        clinic_name,clinic_address,city,state,pincode,landmark,
        doctor_reg_no,email_id,upload_documents,cloudinary_id)=>{

        //console.log(name);
        
        //console.log("come to update");
       insertmodel.updateOne({_id:id},
            {$set:{
                    name : name,
                    degree : degree,
                    mobile_no : mobile_no,
                    alternative_mobile_no : alternative_mobile_no,
                    clinic_name : clinic_name,
                    clinic_address : clinic_address,
                    city : city,
                    state : state,
                    pincode : pincode,
                    landmark : landmark,
                    doctor_reg_no : doctor_reg_no,
                    email_id : email_id,
                    upload_documents : upload_documents,
                    cloudinary_id : cloudinary_id,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }
    
    
}
module.exports = userQueries;


