const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
        returnStatus:{
            type:String,
             enum:['not requested','requested','approved','rejected'],
            default:'not requested'
        }
    }
);

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    items:[orderItemSchema],
    totalAmount:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    paidAt: Date,
    paymentInfo:{
        id:String,
        status:String,
        method:String,
    },
    status:{
        type:String,
        enum:['Processing', 'Packed', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    trackingHistory:[{
        status: String,
        updatedAt:Date
    }]
},{
    timestamps:true,
});

module.exports = mongoose.model('Order',orderSchema);