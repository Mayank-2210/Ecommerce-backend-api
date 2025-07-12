const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    reason:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['pending' , 'approved' , 'Rejected'],
        default:'pending'
    },
    requestDate:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('ReturnRequest',returnSchema);