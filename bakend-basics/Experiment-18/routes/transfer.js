const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create sample users
router.post('/create-users', async (req, res) => {
  await User.deleteMany({});
  const users = await User.insertMany([
    { name: 'Alice', balance: 1000 },
    { name: 'Bob', balance: 500 }
  ]);

  res.status(201).json({
    message: 'Users created',
    users
  });
});

// Transfer money logic
router.post('/transfer', async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;

  if (!fromUserId || !toUserId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const sender = await User.findById(fromUserId);
    const receiver = await User.findById(toUserId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Step 1: deduct from sender
    sender.balance -= amount;
    await sender.save();

    // Step 2: add to receiver
    receiver.balance += amount;
    await receiver.save();

    res.status(200).json({
      message: `Transferred $${amount} from ${sender.name} to ${receiver.name}`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
