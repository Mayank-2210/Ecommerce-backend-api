const fs = require('fs');
const path = require('path');
const Product = require("../models/productModel");

const uploadProduct = async(req,res)=>{
    try{
        const {name,description,price,category} = req.body;

        if(!req.file) return res.status(400).json({message:'Image file is required'});

        const imagePath = `/uploads/${req.file.filename}`;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image:imagePath,
        });

        res.status(201).json({
            message:'Product Uploaded Successfully',
            product
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

const getAllProducts = async(req,res)=>{
    try{
            const {category,keyword,sort,page=1,min,max} = req.query;

            const query = {};

            if(keyword){
                query.name = {$regex:keyword , $options:'i'};
            }

            if(category){
                query.category = category;
            }

            if(min || max){
                query.price = {};
                if(min) query.price.$gte = parseInt(min);
                if(max) query.price.$lte = parseInt(max);
            }

            const pageSize = 10;
            const skip = (parseInt(page)-1)*pageSize;

            const sortOption = {};
            if(sort === 'asc') sortOption.price = 1;
            if(sort === 'desc') sortOption.price = -1;

            const products = await Product.find(query).sort(sortOption).skip(skip).limit(pageSize);

            const total = await Product.countDocuments(query);

            res.status(200).json({
                total,
                page: parseInt(page),
                pageSize,
                products,
            });
        }
    catch(error){
        res.status(506).json({message:error.message});
    }
}

const updateProduct = async(req,res)=>{
    try{
        const{name,description,category,price} = req.body;

        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product Not found'});
        }

        if(req.file){
            const oldImagePath = path.join(__dirname, '..' , product.image);
            if(fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath);
            }

            product.image = `/uploads/${req.file.filename}`;
        }

        if(name) product.name = name;
        if(description) product.description = description;
        if(price) product.price = price;
        if(category) product.category = category;

        await product.save();

        res.json({message:'Product Updated Successfully'}, product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const deleteProduct = async(req,res)=>{
    try{
        const product = Product.findById(req.params.id);

        if(!product) return res.status(405).json({message:'Product Not Found'});

        const imagePath = path.join(__dirname, '..' , 'product.image');
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }

        await product.deleteOne();

        res.json({message:'Product Deleted Succcessfully'});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};

module.exports = {
    uploadProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}
