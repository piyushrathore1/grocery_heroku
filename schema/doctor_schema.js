const mongoose = require("mongoose");

const doctorBody = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    degree:{
        type : String,
        required : true,
    },
    mobile_no : Number,

    alternative_mobile_no : Number,

    clinic_name : String,

    clinic_address : String,
   
    city : String,
   
    state : String,
   
    pincode : Number,
   
    landmark : String,
   
    doctor_reg_no : String,
   
    email_id : String,
   
    upload_documents : {
        type:String,
        
    },
    cloudinary_id:{
        type:String,
    },
    //file_o_name :String,
});

module.exports=mongoose.model("doctor",doctorBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;