const mongoose = require("mongoose");

const hsnBody = new mongoose.Schema({
    Code:{
        type : String,
        required : true,
    },
    Tax:{
        type : String,
        required : true,
    },
    status:Number
    
});

module.exports=mongoose.model("hsn",hsnBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;