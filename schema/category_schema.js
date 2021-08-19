const mongoose = require("mongoose");
/* const validator = require("validator"); */
const categorySchema = new mongoose.Schema({
    CategoryName:{
        type : String,
        //required : true,
    },
    CategoryImage:{
        type : String,
    },
    LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    },
    CategoryDescription:{
        type:String,
    },
    CategoryMetatitle:{
        type:String,
    },
    CategoryMetaDescription:{
        type:String
    },
    Categorystatus:{
        type:Number,
    },
    Categorycloudinary_id:{
        type:String,
    }

    
    
});  

module.exports=mongoose.model('category',categorySchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;