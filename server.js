const express=require('express');
const app=express();
const connectDB=require('./config/db')
connectDB();
require("dotenv").config();

const bodyparser=require('body-parser');
app.use(bodyparser.json());
const PORT=process.env.PORT||3000;

const userRoutes=require('./routes/userRoutes');
app.use('/user',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port`, PORT)
})