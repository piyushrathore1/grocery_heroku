const mongoose = require("mongoose");

const bannerBody = new mongoose.Schema({
    BannerName:{
        type : String,
        required : true,
    },
    LanguageId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'language'
    },
    BannerImage:{
        type:String
    },
    BannerType:{
        type:String
    },
    BannerPosition:{
        type:String
    },
    OfferStatus:{
        type:String
    },
    OfferCloudinary_id:{
        type:String,
    }
});

module.exports=mongoose.model("banner",bannerBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;