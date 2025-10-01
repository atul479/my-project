const express = require('express');
const mongoose = require('mongoose');
// The line below was likely causing the dotenv messages, if present, DELETE IT:
// require('dotenv').config(); 

// --- 1. Hardcode the MongoDB URI ---
// This line uses the fixed string directly, eliminating the "undefined" error.
const mongoURI = 'mongodb://localhost:27017/ecommerceDB'; 

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected successfully.'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    // If you are getting ECONNREFUSED, ensure 'mongod' is running in another terminal.
    process.exit(1); 
  });

const app = express();
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// --- 2. Hardcode the Port ---
const PORT = 5000; 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));