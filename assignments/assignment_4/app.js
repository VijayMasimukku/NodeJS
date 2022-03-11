const express = require('express')
const mongoose =require('mongoose');
var methodOverride = require('method-override')
const bodyparser = require('body-parser')


const user = require('./model/schema');
// const User = require('./model/schema');

const app=express()
//connecting database
mongoose.connect('mongodb://localhost:27017/myassignment4');

app.use(bodyparser.urlencoded({extended:false}))

app.set("views","./views")
app.set("view engine","ejs")


app.use(methodOverride('_method'))

app.get('/',async(req,res) => {
    const users= await user.find()
    res.render('index.ejs',{users})

})
app.get('/form',(req,res) => {
    res.render('form.ejs')

})

app.post("/user/add",(req,res)=>{
    user.create({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        city:req.body.city
    })

    res.redirect("/");
})

app.put("/user/:id",async(req,res)=>{

    await user.updateOne({_id:req.params.id},{isPromoted:true})  
    res.redirect("/");
})
app.delete("/user/:id",async(req,res)=>{

    await user.deleteOne({_id:req.params.id})
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log('server is listening on port: 3000....')
})