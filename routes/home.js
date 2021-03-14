const express= require("express");
const {Post,User} = require('../config/mongoose.js')
const router =express.Router();

router.use('/about',require('./about'))
router.use('/contact',require('./contact'))
router.use('/compose',require('./compose'))
router.use('/login',require('./login'))
// router.use('/register',require('./register'))

const newBlog1 = new Post({
    title: "HELLO WORLD",
    content : "nice to meet this world."
})
const newBlog2 = new Post({
    title: "HeY iA< // '''",
    content : "nusu huhgio ajfhi kaoaop  this workdl."
})


const defaultArray = [newBlog1,newBlog2];

// GET home route
router.get("/",function(req,res){

Post.find({},(err,items)=>{
    // console.log(items);
    res.render("home",{posts:items});
})
    // res.render("home",{posts:defaultArray});
})

module.exports= router;