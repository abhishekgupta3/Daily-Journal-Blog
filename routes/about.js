const express= require("express");
const Data = require('../config/mongoose.js')
const router =express.Router();

const aboutStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

// GET about route
router.get("/",function(req,res){
    res.render("about",{aboutStartingContent:aboutStartingContent});
})

module.exports= router;