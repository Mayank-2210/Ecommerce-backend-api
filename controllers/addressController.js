const Address = require('../models/addressModel');

const addAddress = async(req,res)=>{
    try{
        const userId = req.user.id;

        const {fullname,mobile,pincode,state,city,house,area,addressType} = req.body;

        const address = await Address.create({
            user:userId,
            fullname,
            mobile,
            pincode,
            state,
            city,
            house,
            area,
            addressType
        });

        res.status(201).json({message:'Address Added Successfully' , address});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getUserAddresses = async(req,res)=>{
    try{
        const userId = req.user.id;

        const addresses = await Address.find({user:userId});

        res.status(201).json({
            total:addresses.length,
            addresses
        })
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const updateAddress = async(req,res)=>{
    try{
        const addressId = req.params.id;
        const userId = req.user.id;

        const address = await Address.findOneAndUpdate(
            {_id:addressId , user:userId},
            req.body,
            {new:true}
        );

        if(!address){
            return res.status(500).json({message:'Address Not Found'});
        }

        res.status(201).json({
            message:'Address updated Successfully',
            address
        });
    }   
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const deleteAddress = async(req,res)=>{
    try{
        const addressId = req.params.id;
        const userId = req.user.id;

        const deleted = await Address.findOneAndDelete({_id:addressId , user:userId});

        if(!deleted) return res.status(500).json({message:'Address Not Found'});

        res.status(201).json({message:'Address Deleted'});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports = {
    addAddress,
    getUserAddresses,
    updateAddress,
    deleteAddress
};