const express = require('express')
const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const router =  express.Router()

const userschema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})  
const usermodel =  mongoose.model("usermodel",userschema)
router.post('/register',async(req,res)=>{
    const{username,email,password} = req.body
    
    const existinguser = await usermodel.findOne({email})
    if(existinguser){
       return res.send('user already existing')
    }
      const hashedpassword = await bcrypt.hash(password,10)
    try{
        const user = new usermodel({
          username,email,password:hashedpassword
        })
        await  user.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1h' })
        res.send({user,token})
    }
    catch(err){
       res.send(err.message)
    } 
})

router.post('/login',async(req,res)=>{
    const{email,password} = req.body
    try{
      const user = await usermodel.findOne({email})
      if(!user){
        return  res.send("user not found")
      }
      const ismatch = await bcrypt.compare(password,user.password)
      if(!ismatch){
        return res.send("password is wrong")
      }
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1h' })
      res.send({user,token})
    }
    catch(err){
        console.log(err.message)
    } 
})
router.get('/me',async(req,res)=>{
   const authHeader= req.headers['authorization']
   const token =authHeader && authHeader.split(' ')[1];
   if(!token){
    return res.send("token not availabel")  
   }
   try{
   const decoder = jwt.verify(token,process.env.JWT_SECRET)

   const user = await usermodel.findById(decoder.id).select('-password')

   res.send(user)}
   catch(err){
    res.send("invalidtoken"+err.message)
   }
})
router.get('/',async(req,res)=>{
  try{
    const users = await usermodel.find()
    res.send(users)}
    catch(err){
      res.send(err.message)
    }
})
module.exports= router
  