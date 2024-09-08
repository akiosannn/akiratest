const express = require("express");
const app = express();
const Humans = require("../Human/Human");

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

module.exports = app;
;