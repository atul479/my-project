// controllers/productController.js
const Product = require('../models/Product');

// @desc    Insert sample products
// @route   POST /api/products/seed
exports.insertSampleProducts = async (req, res) => {
  try {
    await Product.deleteMany({}); // Clear collection first

    const sampleProducts = [{
        name: 'Classic T-Shirt',
        price: 19.99,
        category: 'Apparel',
        variants: [{
          color: 'Red',
          size: 'M',
          stock: 50
        }, {
          color: 'Blue',
          size: 'L',
          stock: 30
        }, ],
      },
      {
        name: 'Laptop Pro 15',
        price: 1200.00,
        category: 'Electronics',
        variants: [{
          color: 'Silver',
          size: 'One Size',
          stock: 15
        }, ],
      },
      {
        name: 'Running Shoes',
        price: 79.50,
        category: 'Apparel',
        variants: [{
          color: 'Black',
          size: '9',
          stock: 20
        }, {
          color: 'Black',
          size: '10',
          stock: 10
        }, {
          color: 'White',
          size: '9',
          stock: 5
        }, ],
      },
    ];

    const products = await Product.insertMany(sampleProducts);
    res.status(201).json({
      message: 'Sample products inserted',
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// @desc    Retrieve all products (Expected Output i)
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// @desc    Filter products by category (Expected Output ii)
// @route   GET /api/products/category/:categoryName
exports.filterByCategory = async (req, res) => {
  try {
    const category = req.params.categoryName;
    const products = await Product.find({
      category: category
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// @desc    Project specific variant details (Expected Output iii)
// @route   GET /api/products/variants-projection
exports.projectVariantDetails = async (req, res) => {
  try {
    // This query uses projection to only return the product name,
    // category, and the 'size' and 'stock' fields from the 'variants' array.
    const products = await Product.find({
      // Filter for products that have a variant with 'size: M'
      'variants.size': 'M' 
    }, {
      name: 1,
      category: 1,
      'variants.size': 1, // Project specific fields from the nested document
      'variants.stock': 1,
      price: 0 // Explicitly exclude price and _id (optional, _id is default)
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// @desc    Find products with a variant meeting multiple criteria
// @route   GET /api/products/filter-variant
exports.filterBySpecificVariant = async (req, res) => {
  try {
    // Find all products that have a variant which is 'Black' AND has 'stock > 10'
    const products = await Product.find({
      variants: {
        $elemMatch: {
          color: 'Black',
          stock: {
            $gt: 10
          }
        }
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};