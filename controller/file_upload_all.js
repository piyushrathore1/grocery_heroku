const path = require("path");
const multer = require("multer");
//for admin
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/Image')
    },
    filename: function(req,file,cb){
        let ext =path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})

var upload = multer({
    storage : storage,
    fileFilter : function(req,file,callback){        
        if(
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png" 
            
        ){
            callback(null,true)
        }else{
            console.log("Only jpg and png file supported")
            callback(null,false)
        }
    },
    limits:{
        fieldSize:1024 * 1024 *2
    }
})

module.exports = upload