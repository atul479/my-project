// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  insertSampleProducts,
  getAllProducts,
  filterByCategory,
  projectVariantDetails,
  filterBySpecificVariant
} = require('../controllers/productController');

// Helper route to seed data
router.post('/seed', insertSampleProducts);

// 1. Retrieve all products
router.get('/', getAllProducts);

// 2. Filter products by category
router.get('/category/:categoryName', filterByCategory);

// 3. Project specific variant details
router.get('/variants-projection', projectVariantDetails);

// Optional: Advanced filter on nested array with $elemMatch
router.get('/filter-variant', filterBySpecificVariant);

module.exports = router;