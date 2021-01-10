const mongoose = require("mongoose");

const adminBody = new mongoose.Schema({
    email_id:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    status:Number,
    upload_documents:{
        type:String
    },
    cloudinary_id:{
        type:String,
    },
});

module.exports=mongoose.model("admin",adminBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;