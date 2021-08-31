const express = require("express");
const router =  express.Router();
const admin_schema = require("../schema/vendor_schema");
const userQueries = require("../controller/vendor_curd");
//kd stopped for new file upload
//const upload = require("../controller/file_upload_vendor");
const cloudinary = require("../controller/cloudinary");
const { request } = require("express");
const fs = require('fs');
var Buffer = require('buffer');
//new code for file upload 
const multer = require('multer'); //multer package
const cors = require("cors");
const bodyParser = require("body-parser");
const base64ToImage = require('base64-to-image');
const {
    v4: uuidv4
} = require("uuid");
const app = express();
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}))
app.use(cors());
app.use("*", cors());
app.use(express.static("uploads")); //static folder so that files can be received using a link
app.use(express.json());
//multer setup to get file and save it to uploads folder


var multerStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/Image')
    },
    filename: function(req,file,cb){
        let ext =path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})

const upload = multer({
    storage: multerStorage,
});
/*router.post("/insert",(req,res)=>{
    //var a = new admin_schema(req.body);   
   // a.save();
    admin_schema.create(req.body).then((result)=>{
        res.send(result);
    })

})*/

router.post('/getAllVendor',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    var Data=[];
    try{
        var query = { Vendorstatus: 0 };
        admin_schema.find(query,(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
            //res.send(admin);
            admin.forEach((day,index)=>{
                //a.push(day);
                Data.push(day);
            })
            //a.push("Data":1,"success:true","message:display Successfully");
            Data={'Data':Data,'Success':true,'Message':'Vendor Data Successful Found'};
            res.send(Data);
        })
       /* userQueries.displayAdmin();
        const a=[{'Data':1,'Success':true,'Message':'Data Successful Delete'}];
        res.send(a);
        console.log("Delete Sussesful");*/
    }
    catch(err){
        console.log("this is erro",e);
    }

});

router.post("/getvendorbyid/:id",(req,res)=>{
    userQueries.displayvendorbyid(req,res);
})

//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
/*  router.post("/addVendor",upload.single('upload_documents'),async(req,res)=>{
    var Name=req.body.Name;
    var MobileNo=req.body.MobileNo;
    var Email_id=req.body.Email_id;
    var Password=req.body.Password;
    var status=req.body.status;
    //Single FIle Uploaded upload.single('upload_documents')
    if(req.file){
        /* var imageBuffer = request.file.buffer;
        console.log("Image Buffer :"+imageBuffer)
        //old
        //var imageName = 'public/images/map.png';
        //main
        var imageName = '/vendor_'+Date.now()+'.png';
        var path1 = fs.createWriteStream(imageName).write(imageBuffer); 
        //old
        var upload_documents=req.file.path;
        console.log("path :"+upload_documents);

        //new
        /* var upload_documents=path1; 
        //f
    }else{
        console.log("file path is not set");
    }
    //Multipal File Uploaded
   /* if(req.files){
        let path=''
        req.files.forEach((files,index,arr)=>{
            path = path + files.path + ','
        })
        path = path.substring(0,path.lastIndexOf(","))
        var upload_documents=path
    }
    try{
        //console.log(req.file.path);
        // image upload on cloud
        const result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result);
        var upload_documents=result.secure_url;
        var cloudinary_id=result.public_id;
      //var upload_documents = '';
     // var cloudinary_id = '';
        userQueries.insertVendor(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
       // res.send("Record inserted");
        const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
    
}); */

//router.post("/addVendor",upload.single('upload_documents'),async(req,res)=>{
//file upload code start kd  29/08/2021
router.post('/upload', async(req, res, next) => {

        var Name=req.body.Name;
        var MobileNo=req.body.MobileNo;
        var Email_id=req.body.Email_id;
        var Password=req.body.Password;
        var status=req.body.status;

        const uuid = uuidv4();
        console.log("Name"+req.body.Name);
        console.log(req.body.filename);
        console.log(req.body.base64url);
        //var filename = req.body.filename;
        var base64url = req.body.base64url;  //receiving base64 url from frontend
        var base64Str = "data:image/png;base64," + base64url  //changing base64url to base64string
        //var path = '/app/';
        // var optionalObj = {
        //     'fileName': filename,
        //     'type': 'png'
        // };
        // base64ToImage(base64Str, path, optionalObj); //saving
        
        // var imageInfo = base64ToImage(base64Str, path, optionalObj);
        // console.log("image info"+imageInfo);
        // var fileLink = '/' + filename;
        // var response = {
        //     message: "Files Added succesfully",
        // };
        // res.writeHead(200, {
        //     "Content-Type": "application/json",
        // });
        try{
                //console.log(req.file.path);
                // image upload on cloud
                const result = await cloudinary.uploader.upload(base64Str);
                console.log("result"+result);
                
                var upload_documents=result.secure_url;
                var cloudinary_id=result.public_id;
                console.log(cloudinary_id);
                //var upload_documents = '';
                // var cloudinary_id = '';
                userQueries.insertVendor(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
               // res.send("Record inserted");
                const a={'Data':1,'Success':true,'Message':'File Uploaded Sucessfully'+cloudinary_id};
                console.log("Data Insert Sussesful");
                //old
                //return  res.send(a);
                //new
                return  res.end(JSON.stringify(a));
            }
            catch(e){
                console.log("Error in insert",e);
            }
        return res.end(JSON.stringify(response));
        //const query = `INSERT INTO Files (filesid,filelink,userid) VALUES ('${uuid}','${req.body.filename}','${req.body.userId}')`;
      //code to push filelink and other details to backend  
      //connection.query(query, function (err, result) {
            /* if (err) {
                console.log(err);
                var response = {
                    message: "Error: Could not upload",
                };
                res.writeHead(404, {
                    "Content-Type": "application/json",
                });
                return res.end(JSON.stringify(response));
            } else {
                var response = {
                    message: "Files Added succesfully",
                };
                res.writeHead(200, {
                    "Content-Type": "application/json",
                });
                return res.end(JSON.stringify(response));
            } */
        //});
});
//file upload code end kd  29/08/2021
router.post("/addVendor",async(req,res)=>{
    // var Name=req.body.Name;
    // var MobileNo=req.body.MobileNo;
    // var Email_id=req.body.Email_id;
    // var Password=req.body.Password;
    // var status=req.body.status;
    console.log("asd");
    //console.log(req);
    //console.log(req.file.filename);
    //console.log(req.file.upload_documents);
    console.log(req.files.upload_documents);
    console.log(req.MultipartRequest);
    //console.log(request.files);
    saveImage(req.body.filename, req.body.upload_documents);
    // if(req.file){
    //     var upload_documents=req.file.path;
    //     console.log("path :"+upload_documents);

    //     //new
    //     /* var upload_documents=path1; */
    //     //f
    // }else{
    //     console.log("file path is not set");
    // }
    // try{
    //     //console.log(req.file.path);
    //     // image upload on cloud
    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     //console.log(result);
    //     var upload_documents=result.secure_url;
    //     var cloudinary_id=result.public_id;
    //   //var upload_documents = '';
    //  // var cloudinary_id = '';
    //     userQueries.insertVendor(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
    //    // res.send("Record inserted");
    //     const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Insert'};
    //     res.send(a);
    //     console.log("Data Insert Sussesful");
    // }
    // catch(e){
    //     console.log("Error in insert",e);
    // }
    function saveImage(filename, data){
        ARTWORK_PATH = "/uploads/";
        var myBuffer = new Buffer(data.length);
        for (var i = 0; i < data.length; i++) {
            myBuffer[i] = data[i];
        }
        fs.writeFile(ARTWORK_PATH+filename, myBuffer, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
      }
      
    
}); 

router.post("/deleteVendor/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        console.log(req.params._id);
        userQueries.deleteVendor({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Delete'};
        res.send(a);
        console.log("Vendor Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'Data':0,'Success':false,'Message':'Vendor Data Not Delete'}];
        res.send(a);
    }
  
});

/*router.delete('/delete1/:id',(req,res)=>{
    //const s1={_id:req.params.id};
    //console.log(s1);
    admin_schema.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{console.warn(err)}) 
});*/

router.post('/updateVendor/:id',upload.single('upload_documents'),async(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var Name=req.body.Name;
    var MobileNo=req.body.MobileNo;
    var Email_id=req.body.Email_id;
    var Password=req.body.Password;
    var status=req.body.status;
    //samu change
    if(req.file){
        var upload_documents=req.file.path
    }
    try{
        if(upload_documents)
        {
            console.log("selcted  file to update");
            //upload_documents=req.body.upload_documents;
            const result = await cloudinary.uploader.upload(req.file.path);
            
            upload_documents=result.secure_url;
            var cloudinary_id=result.public_id;
           // console.log("s1",upload_documents);
            //console.log("s2",cloudinary_id);
           userQueries.updateVendor({_id:req.params.id},Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
    
              const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Update'};
              res.send(a);
              console.log("Update Sussesful with file");
        }else{
            console.log("no file selecte to update")
            var upload_documents;
            var cloudinary_id;
            admin_schema.find({_id:id},(err,users)=>{
                if(err) console.warn("error",err);
                // console.log(users);
                 users.forEach((day,index)=>{
                    upload_documents= day.upload_documents;
                    cloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateVendor({_id:req.params.id},Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Vendor Data Successful Update'};
            res.send(a);
            console.log("Update Sussesful without file");
            
        }}
        catch(err){
             console.log("Error in update",err);
            const a=[{'Data':0,'Success':false,'Message':'Data Not Update'}];
            res.send(a);
        }
    //
   // try{
        //console.log(email_id);
       // userQueries.updateAdmin({_id:req.params.id},email_id,password,status);
      /* userQueries.updateAdmin({_id:req.params.id},email_id,password,status);
        const a=[{'Data':1,'Success':true,'Message':'Data Successful Update'}];
        res.send(a);
        console.log("Update Sussesful");
    }
    catch(err){
        console.log("Error in update",err);
        const a=[{'Data':0,'Success':false,'Message':'Data Not Update'}];
        res.send(a);
    }*/
  
})

/*router.put('/updateAdmin/:id',(req,res)=>{
    admin_schema.updateOne({_id:req.params.id},
        {$set:{
            email_id:req.body.email_id,
            password:req.body.password,
            status:req.body.status
            }
        }).then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>{console.warn(err)})
});*/


module.exports = router;