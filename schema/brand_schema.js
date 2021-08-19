const mongoose = require("mongoose");
/* const validator = require("validator"); */
const brandSchema = new mongoose.Schema({
    BrandName:{
        type : String,
        //required : true,
    },
    BrandImage:{
        type : String,
    },
    LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    },
    BrandDescription:{
        type:String,
    },
    BrandStatus:{
        type:Number,
    },
    BrandCloudinary_id:{
        type:String,
    }
});  

module.exports=mongoose.model('brand',brandSchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;