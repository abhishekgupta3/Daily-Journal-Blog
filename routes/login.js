const express= require("express");
const router =express.Router();
const {Post,User} = require('../config/mongoose.js')
const passport = require("passport"); 

// GET login route
router.get("/",function(req,res){
    res.render("login");
})

router.post("/",function(req,res){

	console.log("abhi atpug");

	const user = new User({
		email: req.body.inputEmail,
		password: req.body.inputPassword
	});
	console.log(user);

        passport.authenticate("local", function(err,user){
        	if(err){
        		console.log(err);
        		res.render('/login')
        	}
        	req.login(user,function(err){
        		  if(err){
        		   console.log(err);
        		   res.render('/login')
        	      }
        	    return res.render("/");
        	})
        	res.render("/about");
        });
	
})

module.exports= router;