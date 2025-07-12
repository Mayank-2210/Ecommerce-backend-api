const Comment = require('../models/commentModel');
const Product = require('../models/productModel');

const addComment = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {productId,comment,rating} = req.body;

        const product = await Product.findById(productId);
        if(!product) return res.status(500).json({message:'Product Not Found'});

        const newComment = await Comment.create({
            user:userId,
            product:productId,
            comment,
            rating
        });

        res.status(201).json({message:'Comment Created Successfully'},newComment);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};

const getProductComments = async(req,res)=>{
    try{
        const {productId} = req.params;

        const comments = await Comment.find({product:productId}).populate('user','name').sort({createdAt:-1});

        res.status(200).json({total:comments.length,comments});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const deleteComment = async(req,res)=>{
    try{
        const {commentId} = req.params;

        const comment = await Comment.findById(commentId);
        if(!comment) return res.status(500).json({message:'Comment Not Found'});

        if(comment.user.toString()!== req.user.id && req.user.role !== 'admin') return res.status(404).json({message:'Not Authorized to delete'});

        await comment.deleteOne();

        res.status(200).json({message:'Comment deletd'});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports = {
    addComment,
    getProductComments,
    deleteComment
}

