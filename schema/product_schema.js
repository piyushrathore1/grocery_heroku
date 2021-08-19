const mongoose = require("mongoose");
/* const validator = require("validator"); */
const ProductSchema = new mongoose.Schema({
    ProductName:{
        type : String,
        //required : true,
    },
    ProductImage:{
        type : String,
    },
    LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    },
    
    SubcategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory'
    },
    ProductTag:{
        type:String,
    },
    ProductTaxslab:{
        type:String,
    },
    HsnId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'hsn'
    },
    ProductStatus:{
        type:Number,
    },
    ProductCloudinary_id:{
        type:String,
    }
});  

module.exports=mongoose.model('product',ProductSchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;