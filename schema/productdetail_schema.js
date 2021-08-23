const mongoose = require("mongoose");
/* const validator = require("validator"); */
const ProductdetailSchema = new mongoose.Schema({
    ProductdetailVariationName:{
        type : String,
        //required : true,
    },
    ProductdetailImage:{
        type:String
    },
    ProductId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    ProductdetailSFMrp:{
        type:String,
    },
    ProductdetailSFSrp:{
        type:String,
    },
    ProductdetailScheduleMrp:{
        type:String,
    },
    ProductdetailScheduleSrp:{
        type:String,
    },
    ProductdetailAdditionalDiscountSF:{
        type:String,
    },
    ProductdetailAdditionalDiscountSchedule:{
        type:String,
    },
    ProductdetailStatus:{
        type:Number,
    },
    ProductdetailCloudinary_id:{
        type:String,
    }
    
});  

module.exports=mongoose.model('Productdetaildetail',ProductdetailSchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;