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
    user.otp=null;
    user.otpExpiry=null;
    const response=await user.save();
    const payload={
            id: response.id,
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload)
        console.log("Token is : ", token);

        res.status(200).json({message:"signup succesfully",result: response, token: token});
})

router.post("/sendotp",async(req,res)=>{
    const {email}=req.body;
    console.log("1")
    const user=await User.findOne({email});
    console.log("2")
    if(!user){
        return res.status(400).json({error:"user not exist"});
    }
    console.log("3")
    if(!user.verified){
        console.log("4")
        const otp=generateOTP();
        console.log("5")
        user.otp=otp;
        user.otpExpiry=new Date(Date.now()+10*60*1000);
        console.log("6")
        await user.save();
        console.log("7")
        await sendEmail(user.email, "Login OTP",`Your OTP is: ${otp}`);
        return res.json({message: "OTP sent to email for login verification"});
    }
})

router.post("/login", async(req,res)=>{
    const {email,otp}=req.body;
    const user=await User.findOne({email});

    if(!user||user.otp!==otp || user.otpExpiry<Date.now()){
        return res.status(400).json({error:"Invalid or expired OTP"});
    }
    user.verified=true;
    user.otp=null;
    user.otpExpiry=null;
    const response=await user.save();
    const payload={
            id: response.id,
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload)
        console.log("Token is : ", token);

        res.status(200).json({message:"Login succesfully",result: response, token: token});
})

router.post('/login-password', async(req,res)=>{
    try{
        const {mobile,password}=req.body
        const user=await User.findOne({mobile:mobile});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Internal servee error'})
        }
        console.log("login successful")
        //generate token
        const payload={
            id:user.id
        }
        const token=generateToken(payload)

        //return token as response
        res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports=router;