const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}, // Optional: you can set an empty object as default
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
