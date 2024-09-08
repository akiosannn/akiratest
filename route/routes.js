const express = require("express");
const app = express();
const Human = require("../Human/Human");

app.get("/Humans",async (req,res) => {
    await Human.find();

    try{
        res.send(Human);
    } catch(err){
        res.status(500).send(err);
    }

} )

app.post("/Human",async (req,res) => {
    console.log("Request Body:",req.body); 
    const human = new Human({
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

module.exports = app;