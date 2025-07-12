const User = require('../models/userModel'); // created the collection with name User in mongodb
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:'7d',
    });
};

const registerUser = async(req,res)=>{
    try{
        const{name,email,password} = req.body;

        const userExist = await User.findOne({email});
        if(userExist) return res.status(401).json({message:'User already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await User.create({  // creating the user in collection USER
            name,
            email,
            password:hashPassword,
        });

        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),  // sending the response from the database
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    } 
};

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(500).json({message:'Invalid credentials'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(404).json({message:'Wrong Password'});

        res.json({
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        })
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getProfile = async(req,res)=>{
    try{
        res.json(req.user);
    }
    catch(err){
        res.status(501).json({message:err.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};