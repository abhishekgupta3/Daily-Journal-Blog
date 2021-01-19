const express= require("express");
const router =express.Router();

const contactStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

// GET contact route
router.get("/",function(req,res){
    res.render("contact",{contactStartingContent:contactStartingContent});
})

module.exports= router;