const mongoose = require("mongoose");
/* const validator = require("validator"); */
const RightsSchema = new mongoose.Schema({
    DesignationId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'designation'
    },
    RightsModuleName:{
        type : String,
    },
    RigthsView:{
        type:Number,
    },
    RigthsInsert:{
        type:Number,
    },
    RigthsUpdate:{
        type:Number,
    },
    RigthsDelete:{
        type:Number,
    },
    RightsStatus:{
        type:Number,
    },
});  

module.exports=mongoose.model('right',RightsSchema);
//const result = mongoose.model('admin',adminBody);
//module.exports= result;