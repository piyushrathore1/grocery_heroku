const express = require("express");
const router =  express.Router();
const admin_schema = require("../schema/hsn_schema");
const userQueries = require("../controller/hsn_curd");
const upload = require("../controller/file_upload_all");
const cloudinary = require("../controller/cloudinary");
const fs = require('fs');


/* const buffer = fs.readFileSync('AuthHistoryReport.csv'); */
//const upload = require("../controller/file_upload");
//const cloudinary = require("../controller/cloudinary");
/*router.post("/insert",(req,res)=>{
    //var a = new admin_schema(req.body);   
   // a.save();
    admin_schema.create(req. body).then((result)=>{
        res.send(result);
    })

})*/
/* router.post('/importcsv',upload.single('hsnfile'),async(req,res)=>{
    if(req.file){
        /* var upload_documents=req.file.path
        console.log(upload_documents) 
        //const buffer = fs.readFileSync(req.file.path);
        //console.log("Buffer"+buffer);
        console.log("FilePath"+req.file.path);
        const buffer = req.file.path;
        userQueries.importcsv(req,res,buffer);

    }else{
        console.log("file path is not set");
    }
    /* try{
        //const result = await cloudinary.uploader.upload(req.file.path);
       //console.log(result);
      // var ProductImage=result.secure_url;
      // console.log("path "+ProductImage) 
    //userQueries.importcsv(req,res,buffer);
    }
    catch(e){
        console.log("Error in insert",e);
    } 
}) */

router.post('/importcsv',async(req,res)=>{
        console.log(req.body.filename);
       // console.log(req.body.base64url);
        //var filename = req.body.filename;
        var base64url = req.body.base64url;  //receiving base64 url from frontend
        var base64Str = "data:text/csv;base64," + base64url  //changing base64url to base64string
        try{
                //console.log(req.file.path);
                // image upload on cloud
                //uploadParams.put("resource_type", "csv");
                cloudinary.uploader.upload_tag_params.put("resource_type", "csv");
                const result = await cloudinary.uploader.upload(base64Str);
                console.log("result"+result);
                
                var upload_documents=result.secure_url;
                var cloudinary_id=result.public_id;
                console.log("cid"+cloudinary_id);
                console.log("url"+result.secure_url)
                //var upload_documents = '';
                // var cloudinary_id = '';
                //userQueries.insertVendor(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id);
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
    
})

router.post('/getAllHsn',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    var Data=[];
    try{
        var query = { Hsnstatus: 0 };
        admin_schema.find(query,(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
            //res.send(admin);
            admin.forEach((day,index)=>{
                //a.push(day);
                Data.push(day);
            })
            //a.push("Data":1,"success:true","message:display Successfully");
            Data={'Data':Data,'Success':true,'Message':'Hsn Data Successful'};
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


router.post("/gethsnbyid/:id",(req,res)=>{
    userQueries.displayHsnbyid(req,res);
})


//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
 router.post("/addHsn",(req,res)=>{
    //console.log(req.body);
    var Code=req.body.Code;
    var Tax=req.body.Tax;
    var status=req.body.status;
    //console.log(DesignationName);
   
    try{
       
        userQueries.insertHsn(Code,Tax,status);

        const a={'Data':1,'Success':true,'Message':'Hsn Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
});

router.post("/deleteHsn/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteHsn({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Hsn Data Successful Delete'};
        res.send(a);
        console.log("Admin Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'Data':0,'Success':false,'Message':'Hsn Data Not Delete'}];
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

router.post('/updateHsn/:id',(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var Code=req.body.Code;
    var Tax=req.body.Tax;
    var status=req.body.status;
   
    try{
       
            console.log("no file selecte to update")
            //var upload_documents;
            //var cloudinary_id;
            admin_schema.find({_id:id},(err,users)=>{
                if(err) console.warn("error",err);
                // console.log(users);
                 users.forEach((day,index)=>{
                    //upload_documents= day.upload_documents;
                    //cloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updateHsn({_id:req.params.id},Code,Tax,status);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Hsn  Data Successful Update'};
            res.send(a);
            console.log("Update Sussesful without file");
            
        }
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