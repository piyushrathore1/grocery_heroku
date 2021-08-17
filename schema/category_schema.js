const mongoose = require("mongoose");
/* const validator = require("validator"); */
const categorySchema = new mongoose.Schema({
    Name:{
        type : String,
        //required : true,
    },
    Image1:{
        type : String,
    },
    /* LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    }, */
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
    },
    cloudinary_id:{
        type:String,
    }

    
    
});  

module.exports=mongoose.model('category',categorySchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;