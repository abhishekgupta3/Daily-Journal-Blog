const mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost:27017/mainDB", { useNewUrlParser: true ,useUnifiedTopology: true })


const dbSchema = new mongoose.Schema({
    email : String,
    password : String,
    title: String, content: String
})

 // creating a model 
const Data = mongoose.model( "Data" , dbSchema);

module.exports = Data;