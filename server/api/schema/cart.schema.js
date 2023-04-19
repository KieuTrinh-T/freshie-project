const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        required: true
    }],
    is_active: {
        type: Boolean,
        default: true,
    },
    modified_date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

cartSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtuals: true,
});
var cart = mongoose.model('Cart', cartSchema, 'carts');
module.exports = cart;