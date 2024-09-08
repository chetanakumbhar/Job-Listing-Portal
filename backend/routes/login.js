const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = process.env.JWT_SECRET; // Load from environment

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // In a real-world app, you'd validate the email/password here
  if (email === 'admin@example.com' && password === 'password') {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = user;
    next();
  });
};

module.exports = { router, verifyToken };
