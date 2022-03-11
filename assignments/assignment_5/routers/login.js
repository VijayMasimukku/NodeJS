const express=require('express');
const router=express.Router();
const User=require('../model/user.js');
const bcrypt=require('bcrypt');
const { body, param,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var SECRETE='RESTAPI'
router.post('/register%0A',body("email"),body("name"),async (req,res)=>{
    console.log(req.body)
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {name,email,password}=req.body
        bcrypt.hash(password, 10,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                res.status(400).json({
                    status:"failed",
                    message:"invalid details"
                })
            }
            const user= await User.create({
                name,
                email,
                password:hash
            });
            res.json({
                status:"success",
                user
            })
        });
        }catch(e){
           res.json({ status:"fail",
            message:e.message})

        }
});
//login details matched with register details
router.post('/login%0A',body("email"),body("password"),async (req,res)=>{
    console.log(req.body)
    try{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {name,email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            res.status(401).json({
                status:"failed",
                message:"invalid user"
            })
        }
        // Load hash from your password DB.
      bcrypt.compare(password, user.password).then(function(result) {
           // result == true
           if(result){
               //Signing a token with 1 hour of expiration:
            var token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user._id
              },'SECRETE');
               res.json({
                   status:"success",
                   message:"login successfully",
                   token
               })
           }else{
            res.status(401).json({
                status:"failed",
                message:"not authenticated"
            })

           }
    });
        }catch(e){
           res.json({
                status:"fail",
            message:e.message
        })

        }
});
module.exports=router; 