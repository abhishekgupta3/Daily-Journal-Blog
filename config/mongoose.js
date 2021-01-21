const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose"); 


mongoose.connect("mongodb://localhost:27017/mainDB", { useNewUrlParser: true ,useUnifiedTopology: true })
mongoose.set("useCreateIndex",true);


const postSchema = new mongoose.Schema({
    title: String, 
    content: String
})

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
})

userSchema.plugin(passportLocalMongoose);

 // creating a model 
const Post = mongoose.model( "Post" , postSchema);
const User = mongoose.model( "User" , userSchema);

module.exports = {Post,User};