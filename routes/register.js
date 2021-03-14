const express= require("express");
const router =express.Router();
const passport = require("passport"); 
const {Post,User} = require('../config/mongoose.js')

// GET register route
router.get("/",function(req,res){
    res.render("register");
});

router.post("/", (req,res)=>{
    // Post.register
    console.log(req.body);
    User.register({username: req.body.inputEmail}, req.body.inputPassword, function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            console.log("reached here..")
            passport.authenticate("local")(req,res,function(){
                res.redirect("/home");
            });
            res.redirect("/");
        }
    });
    

});

module.exports= router;