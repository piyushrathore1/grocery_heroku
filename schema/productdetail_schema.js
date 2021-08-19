const mongoose = require("mongoose");
/* const validator = require("validator"); */
const ProductdetailSchema = new mongoose.Schema({
    ProductdetailVariationName:{
        type : String,
        //required : true,
    },
    ProductId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    ProductdetailSfMrp:{
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
    
});  

module.exports=mongoose.model('Productdetaildetail',ProductdetailSchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;