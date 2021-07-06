const express       = require("express");
const ejs           = require("ejs");
const bodyParser    = require("body-parser");
const app           = express();
const port          = process.env.PORT || 3000;
const _             = require("lodash"); 
const mongoose      = require("mongoose");
const passport      = require("passport"); 
const localStrategy = require('passport-local').Strategy;
const session       = require("express-session"); 
const bcrypt        = require('bcrypt');
const {Post,User}   = require('./config/mongoose.js')

// Middleware
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: "longstring",
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new localStrategy(function (username, password, done) {

  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) return done(err);
      if (res === false) return done(null, false, { message: 'Incorrect password.' });
      
      return done(null, user);
    });
  });

}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}

// GET home route
app.get("/",function(req,res){
    Post.find({},(err,items)=>{
        res.render("home",{posts:items,isAuthenticated:req.isAuthenticated()});
    })
});

// GET compose route
app.get("/compose",isLoggedIn, function(req,res){  
    res.render("compose",{isAuthenticated:req.isAuthenticated()});
});

// GET profile route
app.get("/profile",isLoggedIn, function(req,res){ 
    const email = req.user.username;
    Post.find({email: email},(err,items)=>{
        res.render("profile",{posts:items,isAuthenticated:req.isAuthenticated()});
    })
});

// POST on compose route
app.post("/compose",function(req,res){

  const UsersName = req.user.name;
  const email = req.user.username;

   // receiving title & content in post object
    const postData = new Post({
        author  : UsersName,
        title   : req.body.postTitle,
        content : req.body.postBody,
        email   : email
    }).save();

    //redirecting the user back to home route
    res.redirect("/");
});

// GET register route
app.get("/register",function(req,res){
    res.render("register",{isAuthenticated:req.isAuthenticated()});
});

// POST register route
app.post("/register", (req,res)=>{

  User.findOne({ username: req.body.username },function(err,foundUser){
    if(err){
      console.log(err);
      res.redirect('/register?error=true');
    }
    else {
      if(foundUser){
        console.log("user exists");
        res.redirect('/register?error=true');
        return;
      }
    }
  });
      bcrypt.genSalt(10, function (err, salt) {
          if (err) return next(err);
          bcrypt.hash(req.body.password, salt, function (err, hash) {
              if (err) return next(err);
      
              const newUser = new User({
                name: req.body.Name,
                username: req.body.username,
                password: hash
              });
              newUser.save();

              res.redirect('/login');
          });
      });
});

// GET login route
app.get("/login",function(req,res){
    res.render("login",{isAuthenticated:req.isAuthenticated()});
});

// POST login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?error=true'
}));

// logout route
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//Delete particular blog posts
app.get("/delete/:blogTitle",function(req,res){

    const userEmail = req.user.username;
    const requestedtitle = req.params.blogTitle;

    Post.find((err,items)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else {
          items.forEach(function(item){
              let foundtitle = item.title;
              if(_.lowerCase(foundtitle)===_.lowerCase(requestedtitle) && item.email == userEmail){
                  const id = item._id;
                  Post.findByIdAndDelete(id,(err)=>{
                      if(err){
                        res.redirect('/');
                        return;
                      }
                      else {res.redirect('/'); return;}
                  });
              }
          });
        }
    });

});

//for particular blog posts
app.get("/posts/:blogTitle",function(req,res){
    const requestedtitle = req.params.blogTitle;
    Post.find((err,items)=>{
        items.forEach(function(item){
            let foundtitle = item.title;
            if(_.lowerCase(foundtitle)===_.lowerCase(requestedtitle)){
                res.render("post",{element:item,isAuthenticated:req.isAuthenticated()})
            }
        });
   });
});


app.listen(port,function(){
    console.log("Server listing at port...");
});