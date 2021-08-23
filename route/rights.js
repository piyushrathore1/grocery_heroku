const express = require("express");
const router =  express.Router();
const rights_schema = require("../schema/rights_schema");
const userQueries = require("../controller/rights_crud");
//const upload = require("../controller/file_upload");
//const cloudinary = require("../controller/cloudinary");


router.post("/getrights",(req,res)=>{
    userQueries.displayrights(req,res);
})

router.post("/getrightsbyid/:id",(req,res)=>{
    userQueries.displayrightsbyid(req,res);
})

//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
 router.post("/addrights",(req,res)=>{
    console.log(req.body);
    var DesignationId=req.body.DesignationId;
    var RightsModuleName=req.body.RightsModuleName;
    var RigthsView=req.body.RigthsView;
    var RigthsInsert=req.body.RigthsInsert;
    var RigthsUpdate=req.body.RigthsUpdate;
    var RigthsDelete=req.body.RigthsDelete;
    var RightsStatus=req.body.RightsStatus;

    //console.log(DesignationName);
   
    try{
       
        userQueries.insertrights(DesignationId,RightsModuleName,RigthsView,RigthsInsert,RigthsUpdate,RigthsDelete,RightsStatus);

        const a={'Data':1,'Success':true,'Message':'rights Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
});

router.post("/deleterights/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleterights({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'rights Data Successful Delete'};
        res.send(a);
        console.log("rights Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'Data':0,'Success':false,'Message':'rights Data Not Delete'}];
        res.send(a);
    }
  
});

router.post('/updaterights/:id',(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var DesignationId=req.body.DesignationId;
    var RightsModuleName=req.body.RightsModuleName;
    var RigthsView=req.body.RigthsView;
    var RigthsInsert=req.body.RigthsInsert;
    var RigthsUpdate=req.body.RigthsUpdate;
    var RigthsDelete=req.body.RigthsDelete;
    var RightsStatus=req.body.RightsStatus;
   
    try{
       
            console.log("no file selecte to update")
            //var upload_documents;
            //var cloudinary_id;
            rights_schema.find({_id:id},(err,users)=>{
                if(err) console.warn("error",err);
                // console.log(users);
                 users.forEach((day,index)=>{
                    //upload_documents= day.upload_documents;
                    //cloudinary_id= day.cloudinary_id;
                  //  console.log(upload_documents);
                   // console.log(cloudinary_id);
                    userQueries.updaterights({_id:req.params.id},DesignationId,RightsModuleName,RigthsView,RigthsInsert,RigthsUpdate,RigthsDelete,RightsStatus);
                })})
            
            const a={'Data':1,'Success':true,'Message':'rights  Data Successful Update'};
            res.send(a);
            console.log("Update Sussesful without file");
            
        }
        catch(err){
             console.log("Error in update",err);
            const a=[{'Data':0,'Success':false,'Message':'Data Not Update'}];
            res.send(a);
        }

  
})


module.exports = router;