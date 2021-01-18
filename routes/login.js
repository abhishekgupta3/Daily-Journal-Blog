const express= require("express");
const Data = require('../config/mongoose.js')
const router =express.Router();

// GET login route
router.get("/",function(req,res){
    res.render("login");
})

module.exports= router;