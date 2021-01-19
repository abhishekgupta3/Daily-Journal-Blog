const mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost:27017/mainDB", { useNewUrlParser: true ,useUnifiedTopology: true })


const postSchema = new mongoose.Schema({
    title: String, 
    content: String
})

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
})
 // creating a model 
const Post = mongoose.model( "Post" , postSchema);
const User = mongoose.model( "User" , userSchema);

module.exports = {Post,User};