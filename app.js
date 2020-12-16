const express= require("express");
const ejs= require("ejs");
const bodyParser= require("body-parser");
const app=express();
const port= process.env.PORT || 3000;
const _ = require("lodash");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
const posts=[];
const homeStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";
const aboutStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";
const contactStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

app.get("/",function(req,res){
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
})
app.get("/about",function(req,res){
    res.render("about",{aboutStartingContent:aboutStartingContent});
})
app.get("/contact",function(req,res){
    res.render("contact",{contactStartingContent:contactStartingContent});
})
app.get("/compose",function(req,res){
    res.render("compose");
})
app.post("/compose",function(req,res){
    const post={
        title:req.body.postTitle,
        content:req.body.postBody,
    }
    posts.push(post);
res.redirect("/");
})
app.get("/posts/:blogTitle",function(req,res){
    console.log("reached here.");
    posts.forEach(function(element){
    let a = element.title;
    let b = req.params.blogTitle;
        if(_.lowerCase(a)===_.lowerCase(b)){
            res.render("post",{element})
        }
    })
})


app.listen(port,function(){
    console.log("Server listing at port...");
})