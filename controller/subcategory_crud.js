const conn = require("../config/db_config");
const subcategory_schema = require("../schema/subcategory_schema");



const userQueries ={
    insertCategory:(Name,Image1,LanguageId,Description,status,cloudinary_id) => {
        let userObj= {
            //_id:_id,
            SubcategoryName:Name,
            SubcategoryImage:Image1,
            LanguageId:LanguageId,
            SubcategoryDescription:Description,
            CategoryId:CategoryId,
            Subcategorystatus:status,
            Subcategorycloudinary_id:cloudinary_id,
        }
   
       if(subcategory_schema.create(userObj)){
           console.log("subcategory Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    displayCategory:async(req,res)=>{
        try{
            const alldata = await subcategory_schema.find().populate('LanguageId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                sucess :'true',
                Message:'Category Data Found Sucessfully'
            })
        }catch(e){ res.send(e)}
    },

    displaycategorybyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await subcategory_schema.findById(_id,(error, data) => {
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
                Message:'Category Data Found By ID Sucessfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deleteCategory:(id)=>{
        //console.log("samu=",{_id:id});
        subcategory_schema.updateOne({_id:id},
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
        subcategory_schema.updateOne({_id:id},
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