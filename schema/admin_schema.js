const mongoose = require("mongoose");

const adminBody = new mongoose.Schema({
    AdminName:{
        type : String,
        //required : true,
    },
    AdminMobileNo:{
        type : String,
       // required : true,
    },
    AdminEmail_id:{
        type : String,
        //required : true,
    },
    AdminPassword:{
        type : String,
       // required : true,
    },
    Adminstatus:Number,
    Adminupload_Photo:{
        type:String
    },
    Admincloudinary_id:{
        type:String,
    },
});

module.exports=mongoose.model("admin",adminBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;