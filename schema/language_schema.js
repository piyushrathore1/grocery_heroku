const mongoose = require("mongoose");

const languageBody = new mongoose.Schema({
    Name:{
        type : String,
        required : true,
    },
    status:Number
});

module.exports=mongoose.model("language",languageBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;