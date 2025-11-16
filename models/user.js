const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:String,
        unique:true
    },
    password: String,
    role:{type: String, default:"user"},
    verified:{type:Boolean,default:false},
    otp:String,
    otpExpiry: Date,
})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    try{
        const salt= await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(this.password,salt);
        this.password=hashedpassword;
        next();
    }
    catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User;