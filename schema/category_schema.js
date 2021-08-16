const mongoose = require("mongoose");
/* const validator = require("validator"); */
const categorySchema = new mongoose.Schema({
    Name:{
        type : String,
        //required : true,
    },
    Image:{
        type : String,
    },
    LanguageId:{
        type : String,
    },
    Description:{
        type:String,
    },
    Metatitle:{
        type:String,
    },
    MetaDescription:{
        type:String
    },
    status:{
        type:String,
    }

    
    
});  

module.exports=mongoose.model('category',categorySchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;