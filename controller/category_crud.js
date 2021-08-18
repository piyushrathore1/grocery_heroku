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
    insertCategory:(Name,Image1,LanguageId,Description,Metatitle,MetaDescription,status,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            CategoryName:Name,
            CategoryImage:Image1,
            LanguageId:LanguageId,
            CategoryDescription:Description,
            CategoryMetatitle:Metatitle,
            CategoryMetaDescription:MetaDescription,
            Categorystatus:status,
            Categorycloudinary_id:cloudinary_id,
        }
   
       if(category_schema.create(userObj)){
           console.log("category Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    displayCategory:async(req,res)=>{
        try{
            var query = { Categorystatus: 0 };
            const alldata = await category_schema.find(query).populate('LanguageId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'Category Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displaycategorybyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await category_schema.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Category Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'Category Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deleteCategory:(id)=>{
        //console.log("samu=",{_id:id});
        category_schema.updateOne({_id:id},
            {
                $set:{
                    Categorystatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updateCategory:(id,Name,upload_documents,LanguageId,Description,Metatitle,MetaDescription,status,cloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        category_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               CategoryName:Name,
               CategoryImage:upload_documents,
               LanguageId:LanguageId,
               CategoryDescription:Description,
               CategoryMetatitle:Metatitle,
               CategoryMetaDescription:MetaDescription,
               Categorystatus:status,
               Categorycloudinary_id:cloudinary_id,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    
}
module.exports = userQueries;