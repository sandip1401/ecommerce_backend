const mongoose=require("mongoose");
const User=require('../models/user');
const product = require("./product");


const cartSchema= new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    items:[{
        productId:{type: mongoose.Schema.Types.ObjectId, ref:"Product"},
        quantity: Number,
    }]
})

module.exports=mongoose.model("Cart", cartSchema);