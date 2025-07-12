const razorpay = require('../utils.js/razorpayInstance');
const crypto = require('crypto');
const Order = require('../models/orderModel');

const createRazorpayOrder = async(req,res)=>{
    try{
        const {amount} = req.body;

        const options = {
            amount: amount*100,
            currency:"INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.status(201).json({
            success:true,
            order,
        })
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const verifyRazorpayPayment = async (req,res)=>{
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const sign = crypto.createHmac('sha256' , process.env.KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

        if(sign!==razorpay_signature){
            return res.status(401).json({success:false , message:'Invalid Signature'});
        }

        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({message:'Order not found'});

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentInfo = {
            id:razorpay_payment_id,
            status:'Paid',
            method:'Razorpay'
        };

        await order.save();

        res.status(201).json({
            success:true,
            order,
        })

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports = {createRazorpayOrder,verifyRazorpayPayment};