const sendEmail = require('../utils.js/sendEmail');

const ReturnRequest = require('../models/returnModel');

const Order = require('../models/orderModel');


const requestReturn = async(req,res)=>{
    try{
        const {orderId , productId , reason} = req.body;

        const order = await Order.findById(orderId);

        if(!order) return res.status(404).json({message:'Order not Found'});

        const alreadyRequested = await ReturnRequest.findOne({
            user:req.user.id,
            order:orderId,
            product:productId,
        });

        if(alreadyRequested) return res.status(404).json({message:'Return already Requested'});

        const returnRequest = await ReturnRequest.create({
            user:req.user.id,
            order:orderId,
            product:productId,
            reason,
        });

        const itemToUpdate = order.items.find((item)=> item.product.toString() === productId);

        if(itemToUpdate) {
            itemToUpdate.returnStatus = 'requested';
            await order.save();
        }

        await sendEmail({
            to: req.user.email,
            subject: 'Return Request Submitted',
            text: `Hi ${req.user.name},\n\nYour Return Request for Order #${orderId} has been Submitted`,
        })

        res.status(201).json({message:'Return request submitted',returnRequest});
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};

const getAllReturns = async(req,res)=>{
    try{
        const returns = await ReturnRequest.find()
        .populate('user' , 'name email')
        .populate('order' , 'orderId totalAmount')
        .populate('product' , 'name price');

        res.status(200).json(returns);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const approveReturn = async(req,res)=>{
    try{
        const returnRequest = await ReturnRequest.findById(req.params.id)
        .populate('user','name email')
        .populate('order')
        .populate('product','name');

        if(!returnRequest) return res.status(400).json({message:'Request Not Found'});

        returnRequest.status = 'approved';
        await returnRequest.save();

        const order = returnRequest.order;

        const itemToUpdate = order.items.find((item) => item.product.toString() === returnRequest.product._id.toString());

        if(itemToUpdate){
            itemToUpdate.returnStatus = 'approved';
            await order.save();
        }

        await sendEmail({
            to:returnRequest.user.email,
            subject:'Return Approved',
            text:`Hi ${returnRequest.user.name}, \n\nGood news! Your return request has been approved. Refund will be processed soon`
        })

        res.status(200).json({message:'Return approved' , returnRequest});  
    }   
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const rejectReturn = async(req,res)=>{
    try{
        const returnRequest = await ReturnRequest.findById(req.params.id).populate('user','name email');
        if(!returnRequest) return res.status(404).json({message:'Request Not Found'});

        returnRequest.status = 'Rejected';
        await returnRequest.save();

        const order = returnRequest.order;

        const itemToUpdate = order.items.find((item)=>item.product.toString() === returnRequest.product._id.toString());

        if(itemToUpdate){
            itemToUpdate.returnStatus = 'rejected';
            await order.save();
        }

        await sendEmail({
            to:returnRequest.user.email,
            subject:'Request Rejected',
            text:`Hi ${returnRequest.user.name}, \n\nYour return request has been rejected. Contact For further details.`
        })

        res.status(200).json({message:'Return Rejected' , returnRequest});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports = {
    requestReturn,
    getAllReturns,
    approveReturn,
    rejectReturn
}