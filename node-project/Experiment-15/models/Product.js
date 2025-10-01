// models/Product.js
const mongoose = require('mongoose');

// Define the nested schema for Product Variant
const VariantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

// Define the main Product schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Apparel', 'Books'], // Example categories
  },
  // Array of nested documents: this is the key requirement.
  variants: [VariantSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);