const express = require("express");
const router = express.Router();
const category_schema = require("../schema/category_schema");
const userQueries = require("../controller/category_crud");
const upload = require("../controller/file_upload");
const cloudinary = require("../controller/cloudinary");



router.use(express.json());
router.get("/",(req,res)=>{
    res.send("welcome to category route");
})

router.post("/addcategory",(req,res)=>{
    userQueries.insertCategory(req);
})


module.exports = router;