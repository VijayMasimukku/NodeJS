const express=require('express');
const router=express.Router();
const Post=require('../model/post.js');
const bcrypt=require('bcrypt');
const { body, param,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var SECRETE='RESTAPI'
router.get('/posts',async (req,res)=>{
    const posts=await Post.find({user:req.user});
    res.json({
        status:"success",
        posts
    })
})
router.post('/posts', async (req,res)=>{
    const post= await Post.create({
        title:req.body.title,
        body:req.body.body,
        img:req.body.img,
        user:req.user
    })
    res.json({
        status:"success",
        post
    })
})
router.put('/posts/:id', async (req,res)=>{
    const post=await Post.updateOne({_id:req.params.id,user:req.user},{body:req.body.body});
    console.log(post)
    if(post.modifiedCount>0){
        res.json({
            status:"post updated",
        })

    }else{
        res,json({
            status:"user can't update the this post"
        })
    }
})
router.delete('/posts/:id', async (req,res)=>{
    const post=await Post.deleteOne({_id:req.params.id,user:req.user});
    console.log(post)
    if(post.deletedCount>0){
        res.json({
            status:"post deleted",
        })

    }else{
        res.json({
            status:"not authorized to delete this post"
        })
    }
 })
module.exports=router