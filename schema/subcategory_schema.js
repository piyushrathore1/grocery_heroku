const mongoose = require("mongoose");
/* const validator = require("validator"); */
const categorySchema = new mongoose.Schema({
    SubcategoryName:{
        type : String,
        //required : true,
    },
    SubcategoryImage:{
        type : String,
    },
    LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    },
    SubcategoryDescription:{
        type:String,
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    Subcategorystatus:{
        type:Number,
    },
    Subcategorycloudinary_id:{
        type:String,
    }
});  

module.exports=mongoose.model('subcategory',categorySchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;