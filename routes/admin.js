const express = require('express');
const app = express();
const routes = express.Router();
const {db}=require('../db');

routes.get("/:id", async(req, res)=>{
    try{
        const u = await db.getAdmin(req.params.id);
        console.log(u);
        res.send(u);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});

module.exports = routes;