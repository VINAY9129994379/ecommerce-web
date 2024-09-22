// routes/productRoutes.js
const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get a product by ID
router.get('/:id', getProductById);

// Update a product by ID
router.put('/:id', updateProductById);

// Delete a product by ID
router.delete('/id', deleteProductById);

module.exports = router;
