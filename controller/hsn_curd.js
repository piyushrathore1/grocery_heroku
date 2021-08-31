const conn = require("../config/db_config");
const insertmodel = require('../schema/hsn_schema');
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
 
const userQueries ={
    insertHsn:(Code,Tax,status) => {
        let userObj= {
            //_id:_id,
            HsnCode:Code,
            HsnTax:Tax,
            Hsnstatus:status,
        }
   
       if(insertmodel.create(userObj)){
           console.log("Hsn Add Successful");
       } 
       else{
        console.warn("Hsn not inserted");
       }
      
    },

    
    deleteHsn:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.updateOne({_id:id},
            {
                $set:{
                    Hsnstatus   : 1,
                }
            }
            ).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
        
    },

    updateHsn:(id,Code,Tax,status)=>{
        //console.log(email_id);
        console.log("come to update ");
        insertmodel.updateOne({_id:id},
            {$set:{
               // a,b,c
               HsnCode:Code,
            HsnTax:Tax,
            Hsnstatus:status,
                } 
            }).then((result)=>{
                
            }).catch((err)=>{console.warn(err)})
    },
    displayHsn:(id)=>{
        //console.log("samu=",{_id:id});
        insertmodel.find({},(err,admin)=>{
            if(err) console.warn("Error in Get Method:-");
            console.log(admin);
        })
        
    },
    displayHsnbyid:async(req,res)=>{
        try{
            const _id = req.params.id;
            const alldata = await insertmodel.findById(_id,(error, data) => {
                if (error) {
                 return res.status(400).json({
                    Data: [],
                    Success :true,
                    Message:'hsn Id not found'
                })
                } else {
                  //res.json(data)
                }
              });
           // res.send(alldata);
            return res.status(200).json({
                Data: [alldata],
                Success :true,
                Message:'hsn Data Found By ID Successfully'
            })  
    
    
        }catch(e){ res.send(e)}
    },
    importcsv:async(req,res,buffer)=>{
        try{
            csvtojson()
            .fromFile(buffer)
            .then(csvData => {
              console.log(csvData);  

              for(let i=0;i<csvData.length;i++){
                  console.log(csvData[i]);
                  
              }
             /*insertmodel.insertMany(csvData, (err, res) => {
                if (err) throw err;
    
                console.log(`Inserted rows sucessfully`);
                //client.close();
              });   */
            }); 
        }catch(e){ res.send(e)}
    },
    
}
module.exports = userQueries;