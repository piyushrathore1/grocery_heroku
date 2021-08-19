const mongoose = require("mongoose");

const roleBody = new mongoose.Schema({
    DesignationName:{
        type : String,
        required : true,
    },
    DesignationStatus:Number
    
});

module.exports=mongoose.model("designation",roleBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;