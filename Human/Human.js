const mongoose = require("mongoose");

const Human = new mongoose.Schema({
name:{
    type: String,
    required:true,
    trim:true,
    lowercase:true
},
age:{
    type:Number,
    default:0
}
})
   
module.exports = mongoose.model(`Human`,Human);