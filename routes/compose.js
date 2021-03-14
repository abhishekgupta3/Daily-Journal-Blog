const express= require("express");
const {Post,User} = require('../config/mongoose.js')
const router =express.Router();

// GET compose route
router.get("/",function(req,res){
    res.render("compose");
})


// POST on compose route
router.post("/",function(req,res){
   // receiving title&content in post object
   // console.log(req.body);
    const postData = new Post({
        title:req.body.postTitle,
        content:req.body.postBody
    }).save();
    
    //adding post obj to posts array

    //redirecting the user back to home route
    res.redirect("/");
})

module.exports= router;