const express = require('express');
const jwt=require('jsonwebtoken');
const multer = require('multer');

const routes = express.Router();
const {user}=require('../db');

//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profile')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+"-"+file.originalname)
    }
  })
   
  let upload = multer({ storage: storage });

// get all users data 
routes.get("/all", async(req, res)=>{
    try{
        const u = await user.getUsers();
        console.log(u);
        res.send(u);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});
routes.post("/auth", async(req, res)=>{
    try{
        let result= await user.auth(req.body);
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
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});
//get user data by id 
routes.get("/:id", async(req, res)=>{
    try{
        const u = await user.getUser(req.params.id);
        console.log(u);
        res.send(u);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});

//Post user data by by json
routes.post("/", upload.single('image'), async(req, res, next)=>{
    try{
        const file = req.file;
        console.log(req.file);
        if (!file) {
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error);
        }
        const path = file.path;
        req.body.path = file.path;
        const u = await user.setUser(req.body, path);
        console.log(u);
        u.affectedRows > 0 ?res.send(u.affectedRows.toString()) : res.send(u.affectedRows.toString());
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : SignUp Failed');
    }
});


module.exports = routes;