const express= require("express");
const Data = require('../config/mongoose.js')
const router =express.Router();

// GET register route
router.get("/",function(req,res){
    res.render("register");
});

router.post("/", (req,res)=>{
    // Post.register
    console.log(req.body);
    // Data.register({username: req.body.inputEmail}, req.body.inputPassword, function(err,user){
    //     if(err){
    //         console.log(err);
    //         res.redirect("/register");
    //     }
    //     else{
    //         console.log("reached here..")
    //         passport.authenticate("local")(req,res,function(){
    //             res.redirect("/home");
    //         });
    //     }
    // });
});

module.exports= router;