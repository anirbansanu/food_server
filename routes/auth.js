const express= require('express');
const jwt=require('jsonwebtoken');
const { sendStatus } = require('express/lib/response');
const routes=express.Router();
const db=require('../db/auth_db');

routes.post('/', async(req,res)=>{
    try{
        let result= await db.login(req.body);
        if(result.length>0){
            const payloadJwt = {
                id: result[0]
            };
            const authToken = jwt.sign(payloadJwt, 'gfg_jwt_secret_key', {
                expiresIn: 31536000 // expires in 1 Year
            });
            res.json(authToken);
        }else{
            res.status(404).send('Invalid username or password');
            //res.sendStatus(404).send('Invalid username or password');
        }
    }catch(e){
        res.sendStatus(404);
    }
});

module.exports=routes;