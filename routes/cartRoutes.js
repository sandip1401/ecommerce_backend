// const express=require('express');
// const router=express.Router();
// const Cart=require('../models/cart');
// const jwtauthmiddleware=require('../middleware/auth');
// const product = require('../models/product');

// router.post('/cart',jwtauthmiddleware,async(req,res)=>{
//     try{
//         const {productID,quantity}=req.body;
//         const userId=req.user.id;
//         let cart=await Cart.findOne({user:userId});
//         if(!cart){
//             cart=new Cart({user:userId, items:[]});
//         }
//         const existingItem=cart.items.find(item=>item.product.toString()===productID);
//         if(existingItem){
//             existingItem.quantity+=quantity;
//         }
//         else{
//             cart.items.push({product:productID,quantity});
//         }
//         await cart.save();
//         res.status(200).json({message:'Item added to cart',cart});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Server error'});
//     }
// })

// module.exports=router;