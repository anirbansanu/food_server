const express = require('express');
const routes = express.Router();
const {cat}=require('../db');

routes.get("/all", async(req, res)=>{
    try{
        const cats = await cat.getall();
        console.log(cats);
        res.send(cats);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});

routes.post("/", async(req, res)=>{
    try{
        const cats = await cat.set(req.body);
        console.log(cats);
        res.send(cats);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});

routes.delete("/", async(req, res)=>{
    try{
        const cats = await cat.del(req.params.id);
        console.log(cats);
        res.send(cats);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});

module.exports = routes;