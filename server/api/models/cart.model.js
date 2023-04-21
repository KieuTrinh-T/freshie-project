const mongoose = require('mongoose');
const Cart = require('../models/cart.model');


const loadCart = async(req) => {
    try {
        const uri = "mongodb+srv://trinhttk20411c:tun4eK0KBEnRlL4T@cluster0.amr5r35.mongodb.net/?retryWrites=true&w=majority";
        mongoose.connect(uri, { dbName: 'cosmetic' });
        mongoose.connection.on('connected', () => {
            console.log('Mess from View: Connected to MongoDB');
        });
        const cart = await Cart.findOne({ user_id: req.params.user_id })
        return cart
    } catch (err) {
        return err
    }
}

module.exports = {
    loadCart,
}