const mongoose = require("mongoose");

const Humans = new mongoose.Schema({
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
                                 //第一引数：mongodbのフォルダ名　第二引数：スキーマモデル
module.exports = mongoose.model(`humans`,Humans);