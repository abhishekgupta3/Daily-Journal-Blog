// const express= require("express");
// const ejs= require("ejs");
// const bodyParser= require("body-parser");
// const app=express();
// const port= process.env.PORT || 3000;
// const _ = require("lodash"); 
// const passport = require("passport"); 
// const session = require("express-session"); 
// const {Post,User} = require('./config/mongoose.js')

// app.set("view engine","ejs");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));

// app.use(session({
//     secret: "longstring",
//     resave: false,
//     saveUninitialized: false
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser())

// app.use('/',require('./routes/home.js'));

// //for particular blog posts
// app.get("/posts/:blogTitle",function(req,res){
//     const b = req.params.blogTitle;
//     Post.find((err,items)=>{
//         items.forEach(function(item){
//             let a = item.title;
//             if(_.lowerCase(a)===_.lowerCase(b)){
//                 res.render("post",{element:item})
//             }
//         })
//    })

// })


// app.listen(port,function(){
//     console.log("Server listing at port...");
// })