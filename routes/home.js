const express= require("express");
const Data = require('../config/mongoose.js')
const router =express.Router();

router.use('/about',require('./about'))
router.use('/contact',require('./contact'))
router.use('/compose',require('./compose'))
router.use('/login',require('./login'))
router.use('/register',require('./register'))

const newBlog1 = new Data({
    title: "HELLO WORLD",
    content : "neice to meemt this workdl."
})
const newBlog2 = new Data({
    title: "HeY iA< // '''",
    content : "nusu huhgio ajfhi kaoaop  this workdl."
})
const newBlog3 = new Data({
    title: "uui wpp87 9(W__ ",
    content : "neii rwopopr jiwjo iweui64555 workdl."
})

const defaultArray = [newBlog1,newBlog2,newBlog3];

// GET home route
router.get("/",function(req,res){

// Data.find({},(err,items)=>{
//     console.log(items);
//     res.render("home",{posts:items});
// })
    res.render("home",{posts:defaultArray});
})

module.exports= router;