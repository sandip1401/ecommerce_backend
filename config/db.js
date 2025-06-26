const { error } = require('console');
const mongoose=require('mongoose')
require('dotenv').config();

const URL=process.env.MONGO_URL;
const connectDB=async()=>{
    try{
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.log('MongoDB connection failed',err);
        process.exit(1);
    }
}
module.exports=connectDB;