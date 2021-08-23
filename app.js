const express = require("express");
const cors = require('cors'); 
const conn = require("./config/db_config");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();app.use(cors());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("welcome to my New project Fammhouse");
})

const admin = require("./route/admin");
app.use('/admin/',admin);

const doctor = require("./route/doctor");
app.use('/doctor/',doctor);

const vendor = require("./route/vendor");
app.use('/vendor/',vendor);

const role = require("./route/role");
app.use('/role/',role);  //for designation 

const language = require("./route/language");
app.use('/language/',language);

const hsn = require("./route/hsn");
app.use('/hsn/',hsn);

const category = require('./route/category');
app.use('/category',category)

const subcategory = require('./route/subcategory');
app.use('/subcategory',subcategory)

const brand = require('./route/brand');
app.use('/brand',brand)

const offer = require('./route/offer');
app.use('/offer',offer)

const banner = require('./route/banner');
app.use('/banner',banner)

const product = require('./route/product');
app.use('/product',product)

const productdetail = require('./route/productdetail');
app.use('/productdetail',productdetail)

const rights = require('./route/rights');
app.use('/rights',rights)

app.use(express.json());
//app.use(express.urlencoded({extended:true}));

/*app.listen(3000,()=>{
    console.log("server is connected");
})*/
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is connected");
})