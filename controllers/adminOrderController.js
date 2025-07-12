const Order = require('../models/orderModel');

const getAllOrdersAdmin = async(req,res)=>{
    try{
        const orders = await Order.find().populate('user','name email').populate('items.product','name price');

        res.status(201).json({total:orders.length,orders});
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};

const updateOrderStatus = async(req,res)=>{
    try{
        const orderId  = req.params.id;
        const { newstatus } = req.body;

        const order = await Order.findById(orderId);

        if(!order) return res.status(404).json({message:'Order Not Found'});

        order.trackingHistory.push({
            status:newstatus,
            updatedAt: new Date()
        });

        order.status = newstatus;
        await order.save();

        res.json({message:'Order Updated Successfully',order});
    }
    catch(err){
        res.status(501).json({message:err.message});
    }
};

module.exports = {getAllOrdersAdmin,updateOrderStatus};