const conn = require("../config/db_config");
const insertmodel = require('../schema/role_schema');
 
const userQueries ={
    insertRole:(DesignationName,DesignationStatus) => {
        let userObj= {
            //_id:_id,
            DesignationName:DesignationName,
            DesignationStatus:DesignationStatus,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Role Add Successful");
       } 
       else{
        console.warn("Role not inserted");
       }
      
    },

    
    deleteRole:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    DesignationStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateRole:(id,DesignationName,DesignationStatus)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
               DesignationName:DesignationName,
               DesignationStatus:DesignationStatus,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayRole:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    },
    displayrolebyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await insertmodel.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'Role Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'Role Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    }
    
}
module.exports = userQueries;