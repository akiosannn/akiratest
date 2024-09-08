const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")

app.use(express.urlencoded({ extended: true })); // URLエンコードされたボディを解析する
app.use(express.json());
const routes = require('./route/routes');
app.use(routes);

app.use(express.static(path.join(__dirname,`public`)))

//pass:H130h130
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("データベース接続成功🔴"))
.catch(err => console.log('データベース接続失敗✖'))



app.listen(process.env.PORT || 3000,() => {
    console.log("サーバーが起動🚀")
})
