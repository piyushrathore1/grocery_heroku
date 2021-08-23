const conn = require("../config/db_config");
const rights_schema = require("../schema/rights_schema");

const userQueries ={
    insertrights:(DesignationId,RightsModuleName,RigthsView,RigthsInsert,RigthsUpdate,RigthsDelete,RightsStatus) => {
        let userObj= {
            //_id:_id,
            DesignationId:DesignationId,
            RightsModuleName:RightsModuleName,
            RigthsView:RigthsView,
            RigthsInsert:RigthsInsert,
            RigthsUpdate:RigthsUpdate,
            RigthsDelete:RigthsDelete,
            RightsStatus:RightsStatus,
        }
   
       if(rights_schema.create(userObj)){
           console.log("Rigths Add Successful");
       } 
       else{
        console.warn("record not inserted");
       }
      
    },

    displayrights:async(req,res)=>{
        try{
            var query = { RightsStatus: 0 };
            const alldata = await rights_schema.find(query).populate('DesignationId');
            //res.send(alldata);
            return res.status(200).json({
                Data : alldata,
                Success :true,
                Message:'rights Data Found Successfully'
            })
        }catch(e){ res.send(e)}
    },

    displayrightsbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await rights_schema.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'rights Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'rights Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    deleterights:(id)=>{
        //console.log("samu=",{_id:id});
        rights_schema.updateOne({_id:id},
            {
                $set:{
                    RightsStatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },
    updaterights:(id,DesignationId,RightsModuleName,RigthsView,RigthsInsert,RigthsUpdate,RigthsDelete,RightsStatus)=>{
        //console.log(email_id);
        console.log("come to update ");
        rights_schema.updateOne({_id:id},
            {$set:{
               // a,b,c
               DesignationId:DesignationId,
               RightsModuleName:RightsModuleName,
               RigthsView:RigthsView,
               RigthsInsert:RigthsInsert,
               RigthsUpdate:RigthsUpdate,
               RigthsDelete:RigthsDelete,
               RightsStatus:RightsStatus,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    
}
module.exports = userQueries;