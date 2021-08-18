const mongoose = require("mongoose");

const OfferBody = new mongoose.Schema({
    OfferName:{
        type : String,
        required : true,
    },
    LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    },
    OfferImage:{
        type:String
    },
    OfferStatus:{
        type:String
    },
    OfferCloudinary_id:{
        type:String,
    }
});

module.exports=mongoose.model("offer",OfferBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;