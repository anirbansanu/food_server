const express = require('express');
const multer = require('multer');

const routes = express.Router();
const {product}=require('../db');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+"-"+file.originalname)
    }
  })
   
  let upload = multer({ storage: storage });

routes.get("/all", async(req, res)=>{
    try{
        const prod = await product.getAll();
        console.log(prod);
        res.send(prod);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});
routes.get("/all/:id", async(req, res)=>{
    try{
        const prod = await product.getAllByUser(req.params.id);
        console.log(prod);
        res.send(prod);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});

routes.get("edit/:p_id/:u_id", async(req, res)=>{
    try{
        const prod = await product.getByUser(req.params.p_id,req.params.u_id);
        console.log(prod);
        res.send(prod);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});
routes.get("/:id", async(req, res)=>{
    try{
        const prod = await product.get(req.params.id);
        console.log(prod);
        res.send(prod);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Found');
    }
});
routes.post("/", upload.array('images', 5), async(req, res, next)=>{
    try{
        const files = req.files;
        console.log("files");
        console.log(files);
        if (!files || files.length<=0) {
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error);
        }
        //file, fileone, filetwo, filethree, filefour,
        req.body.file  = files[0]?files[0].path:'';
        req.body.fileone = files[1]?files[1].path:'';
        req.body.filetwo = files[2]?files[2].path:'';
        req.body.filethree = files[3]?files[3].path:'';
        req.body.filefour = files[4]?files[4].path:'';

        const prod = await product.set(req.body);
        console.log(prod);
        res.send(prod);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Posted On Server');
    }
});
routes.patch("/edit", upload.array('images', 5), async(req, res)=>{
    try{
        const files = req.files;
        console.log(files);
        if (!files) {
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error);
        }
        //file, fileone, filetwo, filethree, filefour,
        req.body.file  = files[0]?files[0].path:'';
        req.body.fileone = files[1]?files[1].path:'';
        req.body.filetwo = files[2]?files[2].path:'';
        req.body.filethree = files[3]?files[3].path:'';
        req.body.filefour = files[4]?files[4].path:'';

        const prod = await product.update(req.body);
        console.log(prod);
        res.send(prod);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Posted On Server');
    }
});
routes.delete("/delete/:id",async(req, res)=>{
    try{
    //     const files = req.files;
    //     console.log(files);
    //     if (!files) {
    //         const error = new Error('Please choose files');
    //         error.httpStatusCode = 400;
    //         return next(error);
    //     }
    //     //file, fileone, filetwo, filethree, filefour,
    //     req.body.file  = files[0]?files[0].path:'';
    //     req.body.fileone = files[1]?files[1].path:'';
    //     req.body.filetwo = files[2]?files[2].path:'';
    //     req.body.filethree = files[3]?files[3].path:'';
    //     req.body.filefour = files[4]?files[4].path:'';

        const data = await product.del(req.params.id);
        console.log(req.params.id);
        res.send(data);
    }catch(e){
        console.log(e);
        res.status(404).send('ERROR : Not Posted On Server');
    }
});
module.exports = routes;
