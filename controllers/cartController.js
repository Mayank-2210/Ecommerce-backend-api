const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const addToCart = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {productId,quantity} = req.body;

        const product = await Product.findById(productId);
        if(!product){
            return res.status.json({message:'Product Not Found'});
        }

        let cart = await Cart.findOne({user:userId});

        if(!cart){
            cart = new Cart({
                user:userId,
                items:[{product:productId,quantity}],
            });
        }
        else{
            const itemIndex = cart.items.findIndex(item=> item.product.toString()===productId);

            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            }
            else{
                cart.items.push({product:productId,quantity});
            }
        }

        await cart.save();

        res.status(200).json({message: 'Product added to cart',cart});
    }
    catch(err){
        res.status(504).json({message:err.message});
    }
};

const getCart = async(req,res)=>{
    try{
        const userId = req.user.id;

        const cart = await Cart.findOne({user:userId}).populate('items.product');

        if(!cart || cart.items.length === 0){
            return res.status(200).json({message: 'Cart is empty' , cart : []});
        }

        res.status(200).json({cart});
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};

const removeFromCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
  
      await cart.save();
  
      res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateCartItem = async(req,res)=>{
    try{
        const userId = req.user.id;
        const productId = req.params.productId;
        const {quantity} = req.body;

        if(quantity < 1){
            return res.status(400).json({message:'Quantity must be atleast 1'});
        }

        const cart = await Cart.findOne({user:userId});
        if(!cart) return res.status(404).json({message:'Cart Not Found'});

        const item = cart.items.find(item => item.product.toString() === productId);
        if(!item) return res.status(404).json({message:'Item Not Found in The Cart'});

        item.quantity = quantity;
        await cart.save();

        res.status(201).json({mesaage:'Quantity Updated',cart});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem
}