const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();
app.use("/profile",express.static('./profile'));
app.use("/products",express.static('./products'));

const adminRoutes=require('./routes/admin');
const userRoutes=require('./routes/user');
const productRoutes=require('./routes/product');
const catRoutes=require('./routes/cat');

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/product', productRoutes);
app.use('/cat', catRoutes);

app.listen(8070,()=>{
    console.log("listening the port at 8070");
});