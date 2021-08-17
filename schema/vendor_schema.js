const mongoose = require("mongoose");

const vendorBody = new mongoose.Schema({
    VendorName:{
        type : String,
       // required : true,
    },
    VendorMobileNo:{
        type : String,
       // required : true,
    },
    VendorEmail_id:{
        type : String,
       // required : true,
    },
    VendorPassword:{
        type : String,
       // required : true,
    },
    Vendorstatus:Number,
    Vendorupload_documents:{
        type:String
    },
    Vendorcloudinary_id:{
        type:String,
    },
});

module.exports=mongoose.model("vendor",vendorBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;