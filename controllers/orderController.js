const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const placeOrder = async(req,res)=>{
    try{
        const userId = req.user.id;

        const cart = await Cart.findOne({user:userId}).populate('items.product');

        if(!cart || cart.items.length === 0){
            return res.status(500).json({message:'Cart Is Empty'});
        }

        const totalAmount = cart.items.reduce((total,item)=>{
            return total + item.product.price * item.quantity;
        }, 0);

        const order = await Order.create({
            user:userId,
            items:cart.items.map(item=>({
                product:item.product._id,
                quantity:item.quantity
            })),
            totalAmount,
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({
            message:'Order Placed Successfully',
            order
        });
    }

    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getMyOrders = async(req,res)=>{
    try{

        const userId = req.user.id;
        const order = await Order.find({user:userId}).populate('items.product','name price image').sort({createdAt:-1});

        res.status(201).json({order});
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
    
};

module.exports = {
    placeOrder,
    getMyOrders
}