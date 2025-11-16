const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {jwtAuthMiddleware} = require('../middleware/auth');

router.get("/", jwtAuthMiddleware, async (req, res) => {
try{
       const response= await Product.find()
       res.status(200).json(response)
    // res.json(await Product.find());

}catch(error){
    console.log("router get error",error)
    res.status(400).json(error)
}
});

router.post("/", async (req, res) => {
    try{
         const product = new Product(req.body);
        await product.save();
        res.status(201).json("success")
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
    
});

module.exports = router;
