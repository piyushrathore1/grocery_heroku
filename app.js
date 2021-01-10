const express = require("express");
const conn = require("./config/db_config");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
app.get("/",(req,res)=>{
    res.send("samundar");
})

const admin = require("./route/admin");
app.use('/admin/',admin);

const doctor = require("./route/doctor");
app.use('/doctor/',doctor);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log("server is connected");
})