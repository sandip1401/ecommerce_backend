const jwt=require('jsonwebtoken');
// const jwtAuthMiddleware=(req,res,next)=>{
//     const 
// }

const generateToken=(userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET);
}

module.exports=generateToken;