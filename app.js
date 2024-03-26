require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./app/routes/products')
const orderRoutes = require('./app/routes/orders')
const userRoutes = require('./app/routes/users')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// app.use((req,res,next)=>{
//     res.status(200).json({
//     msg:"This is simple request"
//     });
// });
//use of morgan
app.use(morgan("dev"));

//mongoose connection string
mongoose.connect("mongodb+srv://avikarshac54:"+process.env.MONGO_ATLAS+"@cluster0.rlrjap1.mongodb.net/").then(()=>{
    console.log("connected successfully");
})

//use of body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//code to handle CORS Error
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin,X-Requested-Width,Content-Type,Accept,Authorization" );
    res.header("Access-Control-Allow-Credentials",true);
    if(res.header=="OPTIONS"){
        res.header("Access-Control-Allow-Method","PUT","POST","DELETE","GET");
        return res.status(200).json();
    }
    next();
})

app.use("/products",productRoutes)
app.use("/orders",orderRoutes)
app.use("/users",userRoutes)

//handle error by using middle

app.use((req,res,next)=>{
    const error = new Error("Route not found");
    //error.status(400);
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:error.message
    })
})
module.exports=app;
