const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');

const addToWishlist = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {productId} = req.body;

        const product = await Product.findById(productId);
        if(!product) return res.status(400).json({message:'Product Not Found'});

        const existing = await Wishlist.findOne({user:userId , product:productId});
        if(existing) return res.status(500).json({messsage:'Product Already In The Wishlist'});

        const wish = await Wishlist.create({user:userId , product:productId});

        res.status(201).json({
            message:'Product Added to wishlist',
            wishlist:wish,
        });
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};

const getAllProductsInWishlist = async(req,res)=>{
    try{
        const userId = req.user.id;
        
        const wish = await Wishlist.find({user:userId}).populate('product');

        res.status(201).json({
            total:wish.length,
            wish,
        })
    }
    catch(err){
        res.status(504).json({message:err.message});
    }
};

const deleteProductFromWishlist = async(req,res)=>{ 
    try{
        const userId = req.user.id;
        const productId = req.params.productId;

        const removed = await Wishlist.findOneAndDelete({user:userId , product:productId});

        if(!removed){
            return res.status(504).json({message:'Item Not found in wishlist'});
        }

        res.status(201).json({message:'Item deleted successfully'});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports = {
    addToWishlist,
    getAllProductsInWishlist,
    deleteProductFromWishlist
};