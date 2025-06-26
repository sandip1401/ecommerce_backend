const express=require('express');
const router=express.Router();
const User=require('../models/user');
const { error } = require('console');
const generateToken=require('../middleware/auth');
const bcrypt=require("bcrypt");
const sendEmail = require('../utils/sendEmail');

function generateOTP(){
    return Math.floor(100000 + Math.random()*900000).toString(); 
}

router.post("/register", async(req,res)=>{
    const userExists=await User.findOne({email:"User already exists"});
    if(userExists) return res.status(400).json({error:"User already exists"});

    const otp=generateOTP();
    const otpExpiry=new Date(Date.now()+10*60*1000); //10 min

    const user= new User({ ...req.body,otp, otpExpiry});
    await user.save();

    await sendEmail(user.email, "Verify your account", `your OTP is: ${otp}`);
    res.json({message:"OTP sent to email"});
})

router.post("/verify", async(req,res)=>{
    const{email,otp}=req.body;
    const user=await User.findOne({email});

    if(!user || user.verified){
        return res.status(400).json({error:"Invalid request"});
    }
    if(user.otp !== otp || user.otpExpiry<Date.now()){
        return res.status(400).json({error:"Invalid or expired OTP"});
    }
    user.verified=true;
    user.otp=null;
    user.otpExpiry=null;
    await user.save();

    res.status(200).json({message:"Account verified"});
})



module.exports=router;