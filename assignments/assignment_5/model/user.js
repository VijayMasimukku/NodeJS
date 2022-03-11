const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    //age:{type:Number },
    //maritalstatus:{type:String,enum:['single','married'],default:'single'}
    password:String

},{timestamps:true})
const User=mongoose.model('Users',userSchema);
module.exports=User;