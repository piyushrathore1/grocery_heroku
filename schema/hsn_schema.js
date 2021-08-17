const mongoose = require("mongoose");

const hsnBody = new mongoose.Schema({
    HsnCode:{
        type : String,
        required : true,
    },
    HsnTax:{
        type : String,
        required : true,
    },
    Hsnstatus:Number
    
});

module.exports=mongoose.model("hsn",hsnBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;