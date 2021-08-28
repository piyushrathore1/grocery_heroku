const mongoose = require("mongoose");

const adminBody = new mongoose.Schema({
    
    upload_Photo:{
        type:String
    },
    
});

module.exports=mongoose.model("photo",adminBody);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;