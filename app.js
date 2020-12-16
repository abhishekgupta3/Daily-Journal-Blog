const express= require("express");
const ejs= require("ejs");
const bodyParser= require("body-parser");
const app=express();
const port= process.env.PORT || 3000;
const _ = require("lodash"); 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

const posts=[]; // posts array

const homeStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

const aboutStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";

const contactStartingContent="Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam natus saepe, consectetur perspiciatis omnis voluptasaccusamus voluptates vero facilis, corrupti qui eius quo,quia id quis nihil animi iure. Nostrum quod suscipiquia eum!";


// GET home route
app.get("/",function(req,res){
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
    // passing posts array to home.ejs
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

// POST on contact route
app.post("/compose",function(req,res){
    //receiving title&content in post object
    const post={
        title:req.body.postTitle,
        content:req.body.postBody,
    }

    //adding post obj to posts array
    posts.push(post);
    //redirecting the user back to home route
    res.redirect("/");
})

//for particular blog posts

app.get("/posts/:blogTitle",function(req,res){

    // traversing the posts array to fing the title
    posts.forEach(function(element){
        let a = element.title; //posts array title
        let b = req.params.blogTitle; // user typed title
        //using lodash to check both of them
            if(_.lowerCase(a)===_.lowerCase(b)){
                res.render("post",{element})
                //rendering the post.ejs 
            }
    })
})


app.listen(port,function(){
    console.log("Server listing at port...");
})