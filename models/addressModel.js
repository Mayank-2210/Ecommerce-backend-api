const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    house:{
        type:String,
        required:true,
    },
    area:{
        type:String,
        required:true,
    },
    addressType:{
        type:String,
        enum:['Home' , 'Work' , 'Other'],
        default: 'Home',
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Address',addressSchema);