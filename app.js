const express= require("express");
const ejs= require("ejs");
const bodyParser= require("body-parser");
const app=express();
const port= process.env.PORT || 3000;
const _ = require("lodash"); 
const mongoose = require("mongoose"); 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/postDB", { useNewUrlParser: true ,useUnifiedTopology: true })

const homeStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

const aboutStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

const contactStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

const postSchema = new mongoose.Schema({
title: String,
content :  String
})

// creating a model 

const Post = mongoose.model( "Post" , postSchema);

// const newBlog1 = new Post({
//     title: "HELLO WORLD",
//     content : "neice to meemt this workdl."
// })
// const newBlog2 = new Post({
//     title: "HeY iA< // '''",
//     content : "nusu huhgio ajfhi kaoaop  this workdl."
// })
// const newBlog3 = new Post({
//     title: "uui wpp87 9(W__ ",
//     content : "neii rwopopr jiwjo iweui64555 workdl."
// })

const defaultArray = [];

// GET home route
app.get("/",function(req,res){

Post.find({},(err,items)=>{
    // console.log(items);
    if(items.length===0){
        Post.insertMany(defaultArray, (err)=>{
            if(err)console.log(err);
            // else console.log("success");
        });
    }
    res.render("home",{homeStartingContent:homeStartingContent,posts:items});
})

})

// GET about route
app.get("/about",function(req,res){
    res.render("about",{aboutStartingContent:aboutStartingContent});
})

// GET contact route
app.get("/contact",function(req,res){
    res.render("contact",{contactStartingContent:contactStartingContent});
})

// GET compose route
app.get("/compose",function(req,res){
    res.render("compose");
})

// GET login route
app.get("/login",function(req,res){
    res.render("login");
})

// GET register route
app.get("/register",function(req,res){
    res.render("register");
})


// POST on contact route
app.post("/compose",function(req,res){
    //receiving title&content in post object
    const post= new Post({
        title:req.body.postTitle,
        content:req.body.postBody,
    }).save();
    

    //adding post obj to posts array

    //redirecting the user back to home route
    res.redirect("/");
})

//for particular blog posts

app.get("/posts/:blogTitle",function(req,res){
    const b = req.params.blogTitle;
    Post.find((err,items)=>{
        items.forEach(function(item){
            let a = item.title;
            if(_.lowerCase(a)===_.lowerCase(b)){
                res.render("post",{element:item})
                //rendering the post.ejs 
            }

        })
        //posts array title
         // user typed title
        //using lodash to check both of them
           
    })

})


app.listen(port,function(){
    console.log("Server listing at port...");
})