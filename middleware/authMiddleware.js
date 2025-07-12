const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({message:'Not authorized, no token'});
    }

    const token = authHeader.split(" ")[1];
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {protect};