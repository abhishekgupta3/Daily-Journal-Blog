const express= require("express");
const ejs= require("ejs");
const bodyParser= require("body-parser");
const app=express();
const port= process.env.PORT || 3000;
const _ = require("lodash"); 
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose"); 
const passport = require("passport"); 
const session = require("express-session"); 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: "longstring",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-abhishek:abhishek@cluster0.juiri.mongodb.net/mainDB", { useNewUrlParser: true ,useUnifiedTopology: true })
mongoose.set("useCreateIndex",true);


// post schema
const postSchema = new mongoose.Schema({
    title: String, 
    content: String
})

// user schema
const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    googleId: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// creating a model 
const Post = mongoose.model( "Post" , postSchema);
const User = mongoose.model( "User" , userSchema);

passport.use(User.createStrategy());

// serialize user cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserialize user cookie
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: "115819054609-eqc0tl17gr0aso9a503d1s34q29oh32g.apps.googleusercontent.com",
    clientSecret: "aqeAedbeBL1mXnyekwGvailF",
    callbackURL: "http://localhost:3000/auth/google/",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// GET home route
app.get("/",function(req,res){

    Post.find({},(err,items)=>{
        res.render("home",{posts:items});
    })
 
});

const aboutStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";
const contactStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

// GET about route
app.get("/about",function(req,res){
    res.render("about",{aboutStartingContent:aboutStartingContent});
});

// GET contact route
app.get("/contact",function(req,res){
    res.render("contact",{contactStartingContent:contactStartingContent});
});

// GET compose route
app.get("/compose",function(req,res){
  if(req.isAuthenticated()){
    res.render("compose");
  }
  else res.redirect('/login')
});

// POST on compose route
app.post("/compose",function(req,res){
   // receiving title & content in post object
    const postData = new Post({
        title:req.body.postTitle,
        content:req.body.postBody
    }).save();

    //redirecting the user back to home route
    res.redirect("/");
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/compose");
  });

// GET register route
app.get("/register",function(req,res){
    res.render("register");
});

// POST register route
app.post("/register", (req,res)=>{

    User.register({username: req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            // window.alert(err);
            res.redirect("/register");
        }
        else{
            console.log("reached here..")
            passport.authenticate("local")(req,res,function(){
                res.redirect("/compose");
            });
        }
    });
});

// GET login route
app.get("/login",function(req,res){
    res.render("login");
});

// POST login route
app.post("/login",function(req,res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  console.log(user);

  req.login(user, function(err){
      if(err){
        console.log(err);
        res.redirect("/login");
      }
      else{
        passport.authenticate("local")(req, res, function(){
          res.redirect("/compose");
        });
      }
    });

});

// logout route
app.get("/logout",function(req,res){
  req.logout();
  res.redirect('/login');
})

//for particular blog posts
app.get("/posts/:blogTitle",function(req,res){
    const b = req.params.blogTitle;
    Post.find((err,items)=>{
        items.forEach(function(item){
            let a = item.title;
            if(_.lowerCase(a)===_.lowerCase(b)){
                res.render("post",{element:item})
            }
        });
   });
});


app.listen(port,function(){
    console.log("Server listing at port...");
});

