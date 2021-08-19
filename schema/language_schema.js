const mongoose = require("mongoose");

const languageBody = new mongoose.Schema({
    LanguageName:{
        type : String,
        required : true,
    },
    LanguageStatus:Number
});

module.exports=mongoose.model("language",languageBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;