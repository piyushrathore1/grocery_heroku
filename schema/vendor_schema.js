const mongoose = require("mongoose");

const vendorBody = new mongoose.Schema({
    Name:{
        type : String,
       // required : true,
    },
    MobileNo:{
        type : String,
       // required : true,
    },
    Email_id:{
        type : String,
       // required : true,
    },
    Password:{
        type : String,
       // required : true,
    },
    status:Number,
    upload_documents:{
        type:String
    },
    cloudinary_id:{
        type:String,
    },
});

module.exports=mongoose.model("vendor",vendorBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;