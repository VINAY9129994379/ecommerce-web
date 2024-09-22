// models/Product.js
const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {    // Changed to old_price instead of duplicating new_price
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {  // Changed to "available" to fix the typo
        type: Boolean,
        required: true,
    },
});

// Export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
