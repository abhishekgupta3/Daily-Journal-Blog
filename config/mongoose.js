const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose"); 

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
})

userSchema.plugin(passportLocalMongoose);

 // creating a model 
const Post = mongoose.model( "Post" , postSchema);
const User = mongoose.model( "User" , userSchema);

module.exports = {Post,User};