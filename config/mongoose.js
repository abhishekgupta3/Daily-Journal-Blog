const mongoose = require("mongoose");

// db config 
const db = 'mongodb+srv://admin-abhishek:abhishek@cluster0.juiri.mongodb.net/mainDB';

// db connect
mongoose.connect(db, { useNewUrlParser: true ,useUnifiedTopology: true })
mongoose.set("useCreateIndex",true);

// post schema
const postSchema = new mongoose.Schema({
	author : String,
    title: String, 
    content: String
})

// user schema
const userSchema = new mongoose.Schema({
	name : String,
    username : String,
    password : String
})

 // creating a model 
const Post = mongoose.model( "Post" , postSchema);
const User = mongoose.model( "User" , userSchema);

module.exports = {Post,User};