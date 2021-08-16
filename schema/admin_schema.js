const mongoose = require("mongoose");

const adminBody = new mongoose.Schema({
    Name:{
        type : String,
        //required : true,
    },
    MobileNo:{
        type : String,
       // required : true,
    },
    Email_id:{
        type : String,
        //required : true,
    },
    Password:{
        type : String,
       // required : true,
    },
    status:Number,
    upload_Photo:{
        type:String
    },
    cloudinary_id:{
        type:String,
    },
});

module.exports=mongoose.model("admin",adminBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;