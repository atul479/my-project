const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transferRoutes = require('./routes/transfer');

const app = express();
app.use(bodyParser.json());
app.use('/', transferRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/accountTransfer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
