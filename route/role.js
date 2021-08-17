const express = require("express");
const router =  express.Router();
const admin_schema = require("../schema/role_schema");
const userQueries = require("../controller/role_curd");
//const upload = require("../controller/file_upload");
//const cloudinary = require("../controller/cloudinary");
/*router.post("/insert",(req,res)=>{
    //var a = new admin_schema(req.body);   
   // a.save();
    admin_schema.create(req.body).then((result)=>{
        res.send(result);
    })

})*/

router.post('/getAllRole',(req,res)=>{
    console.log("Display record:-");
    var a=[];
    var Data=[];
    try{
        var query = { Rolestatus: 0 };
        admin_schema.find(query,(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
            //res.send(admin);
            admin.forEach((day,index)=>{
                //a.push(day);
                Data.push(day);
            })
            //a.push("Data":1,"success:true","message:display Successfully");
            Data={'Data':Data,'Success':true,'Message':'Vendor Data Successful'};
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

//router.post("/addAdmin",upload.array('upload_documents[]'),async(req,res)=>{
 router.post("/addRole",(req,res)=>{
    //console.log(req.body);
    var DesignationName=req.body.DesignationName;
    var status=req.body.status;
    console.log(DesignationName);
   
    try{
       
        userQueries.insertRole(DesignationName,status);

        const a={'Data':1,'Success':true,'Message':'Role Data Successful Insert'};
        res.send(a);
        console.log("Data Insert Sussesful");
    }
    catch(e){
        console.log("Error in insert",e);
    }
});

router.post("/deleteRole/:id",(req,res)=>{
    var id={_id:req.params._id};
    try{
        //console.log(req.params._id);
        userQueries.deleteRole({_id:req.params.id});
        const a={'Data':1,'Success':true,'Message':'Role Data Successful Delete'};
        res.send(a);
        console.log("Admin Delete Sussesful");
    }
    catch(err){
        console.log("Error indelete",err);
        const a=[{'Data':0,'Success':false,'Message':'Role Data Not Delete'}];
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

router.post('/updateRole/:id',(req,res)=>{
    var id={_id:req.params.id};
    //var email_id={email_id:req.body.email_id};
    //var password={password:req.body.password};
    //var status={status:req.body.status};
    //console.log(id)
    var DesignationName=req.body.DesignationName;
    var status=req.body.status;
   
    try{
       
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
                    userQueries.updateAdmin({_id:req.params.id},DesignationName,status);
                })})
            
            const a={'Data':1,'Success':true,'Message':'Role  Data Successful Update'};
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