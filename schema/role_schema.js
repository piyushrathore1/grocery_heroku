const mongoose = require("mongoose");

const roleBody = new mongoose.Schema({
    RoleDesignationName:{
        type : String,
        required : true,
    },
    Rolestatus:Number
    
});

module.exports=mongoose.model("designation",roleBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;