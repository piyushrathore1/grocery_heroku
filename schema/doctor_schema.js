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
    mobile_no:Number,
    
});

module.exports=mongoose.model("doctor",doctorBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;