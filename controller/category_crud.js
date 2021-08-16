const conn = require("../config/db_config");
const category_schema = require("../schema/category_schema");



const userQueries ={
    /* insertCategory:(Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            Name:Name,
            MobileNo:MobileNo,
            Email_id:Email_id,
            Password:Password,
            status:status,
            upload_Photo:upload_documents,
            cloudinary_id:cloudinary_id,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Vendor Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    }, */
    insertCategory:(req,res,upload_documents,cloudinary_id)=>{
        
        const categorydata = new category_schema(req.body,upload_documents,cloudinary_id);
        categorydata.save().then(() =>{
        //res.send(vendordata);
        return res.status(200).json({
            Data: categorydata,
            msg:'Category Insert Sucessfully',
            sucess :'true',
        })
    }).catch((e)=>{
        res.send(e);
    })
    },

    displayCategory:async(req,res)=>{
        try{
            const alldata = await category_schema.find().populate('LanguageId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                sucess :'true'
            })
        }catch(e){ res.send(e)}
    },

    displaycategorybyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await category_schema.findById(_id,(error, data) => {
                if (error) {
                  return next(error)
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: alldata,
                sucess :'true',
            })  
    
    
        }catch(e){ res.send(e)}
    }

    
    /* deleteAdmin:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    status   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateAdmin:(id,Name,MobileNo,Email_id,Password,status,upload_documents,cloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
                Name : Name,
                MobileNo : MobileNo,
                Email_id : Email_id,
                Password : Password,
                status   : status,
                upload_documents : upload_documents,
                cloudinary_id    : cloudinary_id,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayAdmin:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    } */
    
}
module.exports = userQueries;