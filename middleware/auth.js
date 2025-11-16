const jwt = require('jsonwebtoken')
const jwtAuthMiddleware=async(req,res,next)=>{
    const authorization= req.headers.authorization;

    if(!authorization){
        return res.status(401).json({error:'Token Not Found'})
    }
    const token=req.headers.authorization.split('')[1];

    if(!token){
        return res.status(401).json({error:'Unauthorize'})
    }

    try{
        console.log(process.env.JWT_SECRET);
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Invalid token'})
    }
}

const generateToken=(userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET);
}

module.exports={generateToken,jwtAuthMiddleware};