const conn = require("../config/db_config");
const subcategory_schema = require("../schema/subcategory_schema");



const userQueries ={
    insertSubCategory:(SubcategoryName,SubcategoryImage,LanguageId,SubcategoryDescription,CategoryId,Subcategorystatus,Subcategorycloudinary_id) => {
        let userObj= {
            //_id:_id,
            SubcategoryName:SubcategoryName,
            SubcategoryImage:SubcategoryImage,
            LanguageId:LanguageId,
            SubcategoryDescription:SubcategoryDescription,
            CategoryId:CategoryId,
            Subcategorystatus:Subcategorystatus,
            Subcategorycloudinary_id:Subcategorycloudinary_id,
        }
   
       if(subcategory_schema.create(userObj)){
           console.log("subcategory Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

     displaysubcategory:async(req,res)=>{
        try{
            const alldata = await subcategory_schema.find({Subcategorystatus:0}).populate('LanguageId').populate('CategoryId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'subcategory Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displaysubcategorybyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await subcategory_schema.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Banner Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'subcategory Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deletesubcategory:(id)=>{
        //console.log("samu=",{_id:id});
        subcategory_schema.updateOne({_id:id},
            {
                $set:{
                    Subcategorystatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updatesubcategory:(id,SubcategoryName,SubcategoryImage,LanguageId,SubcategoryDescription,CategoryId,Subcategorystatus,Subcategorycloudinary_id)=>{
        //console.log(email_id);
        console.log("come to update ");
        subcategory_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
            SubcategoryName:SubcategoryName,
            SubcategoryImage:SubcategoryImage,
            LanguageId:LanguageId,
            SubcategoryDescription:SubcategoryDescription,
            CategoryId:CategoryId,
            Subcategorystatus:Subcategorystatus,
            Subcategorycloudinary_id:Subcategorycloudinary_id,           
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    }, 
    
}
module.exports = userQueries;