const express = require("express");
const app = express();
const Humans = require("../Human/Human");

const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });


app.get("/Humans",async (req,res) => {
    const humansdata = await Humans.find();
    const namedata = humansdata.map(humansdata => humansdata.name )
    try{
        res.json(namedata);
    } catch(err){
        res.status(500).send(err);
    }
    console.log(namedata);
} )

app.post("/Human",async (req,res) => {
    console.log("Request Body:",req.body); 
    const human = new Humans({
        name: req.body.namae,
        age: req.body.toshi || 0 
    });
    try{
        await human.save();
        res.redirect("/")
    } catch(err){
        res.status(500).send(err);
    }

} )

//楽楽販売から、データをPOST自動処理
app.post("/RHHuman",async (req,res) => {
    console.log("Request Body:",req.body); 
    const human = new Humans({
        name: req.body.namae,
        age: req.body.toshi || 0 
    });
    try{
        await human.save();
        res.status(200).json({message:'データが正常に保存されました'});
    } catch(err){
        res.status(500).send(err);
    }

} )

//楽楽販売からシステム連携でCSV受け取り
app.post("/upload-csv", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "CSVファイルが見つかりません" });
    }

    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
            results.push(data);
        })
        .on("end", async () => {
            // CSVデータを処理してMongoDBに保存
            try {
                for (const row of results) {
                    const human = new Humans({
                        name: row.name, // CSVファイルの`name`カラムを使用
                        age: row.age    // CSVファイルの`age`カラムを使用
                    });
                    await human.save();
                }
                res.status(200).json({ message: "CSVデータが正常に保存されました" });
            } catch (err) {
                res.status(500).json({ error: "データの保存に失敗しました" });
            } finally {
                // アップロードされたファイルを削除
                fs.unlinkSync(req.file.path);
            }
        });
});


module.exports = app;
;