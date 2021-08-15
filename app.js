const express = require("express");
const conn = require("./config/db_config");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("welcome to my project mediApp");
})

const admin = require("./route/admin");
app.use('/admin/',admin);

const doctor = require("./route/doctor");
app.use('/doctor/',doctor);

const vendor = require("./route/vendor");
app.use('/vendor/',vendor);

const role = require("./route/role");
app.use('/role/',role);

app.use(express.json());
//app.use(express.urlencoded({extended:true}));

/*app.listen(3000,()=>{
    console.log("server is connected");
})*/
app.listen(process.env.PORT || 5000,()=>{
    console.log("server is connected");
})