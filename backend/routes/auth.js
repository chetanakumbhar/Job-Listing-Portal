const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ensure you use environment variables for secret keys
const secretKey = process.env.JWT_SECRET || 'yourDefaultSecretKey';

// User registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'user' });
    const savedUser = await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ token, userId: savedUser._id, role: savedUser.role, message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid or expired' });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Protected route to get user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('name email');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Example protected route for admin
router.get('/admin-protected', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: `Hello Admin, your user ID is ${req.user.userId}` });
});

module.exports = router;
