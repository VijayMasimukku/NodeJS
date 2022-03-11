const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyparser=require('body-parser')
//const userRouter=require('./routers/user');
const  loginRouter=require('./routers/login');
const postRouter=require('./routers/posts');
const { decode } = require('jsonwebtoken');
var jwt = require('jsonwebtoken');
mongoose.connect('mongodb://localhost:27017/restapi');
var SECRET='RESTAPI'
app.use(bodyparser());
app.use('/posts',(req,res,next)=>{
    console.log(req.headers.authorization)
    var token=req.headers.authorization.split("test ")[1];
    console.log(token)
    if(!token){
       return  res.status(401).json({
            status:"failed",
            message:"token is missing"
        })
    }
      // verify the token
jwt.verify(token, SECRET, async function(err, decoded) {
    console.log(decoded)
    console.log(token)
    // err
    // decoded undefined
    if(err){
        return res.status(401).json({
            status:"failed",
            message:"invalid token"
        })
    }
    req.user=decoded.data;
    next();
  });
})
//app.use('/api/v1/users',userRouter);
app.use('/api/v1',loginRouter);
app.use('/api/v1',postRouter)
app.listen(5000,()=>console.log('server is listening'))