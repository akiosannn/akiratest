const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true })); // URLエンコードされたボディを解析する
app.use(express.json());
const routes = require('./route/routes');
app.use(routes);


//pass:H130h130
mongoose.connect(`mongodb+srv://akiosannn:H130h130@cluster0.0rjo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log("データベース接続成功🔴"))
.catch(err => console.log('データベース接続失敗✖'))



app.listen(process.env.PORT || 3000,() => {
    console.log("サーバーが起動🚀")
})
