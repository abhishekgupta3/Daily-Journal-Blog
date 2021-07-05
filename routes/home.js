const express= require("express");
const {Post,User} = require('../config/mongoose.js')
const router =express.Router();

router.use('/about',require('./about'))
router.use('/contact',require('./contact'))
router.use('/compose',require('./compose'))
router.use('/login',require('./login'))
// router.use('/register',require('./register'))

// GET home route
router.get("/",function(req,res){

Post.find({},(err,items)=>{
    res.render("home",{posts:items});
})
    // res.render("home",{posts:defaultArray});
})

module.exports= router;