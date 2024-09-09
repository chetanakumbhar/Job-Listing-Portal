const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed
const bcrypt = require('bcrypt');

// Set secret key from environment or use a default for local dev
const secretKey = process.env.JWT_SECRET || 'yourDefaultSecretKey';

// login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'secret_key'); // Use a secret key

    // Return token and user info
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
