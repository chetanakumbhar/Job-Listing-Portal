const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Adjust the path as needed
const User = require('../models/User'); // Adjust the path as needed
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'yourDefaultSecretKey';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied. Invalid token format.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
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

// Add a job route
router.post('/add-job', verifyToken, verifyAdmin, async (req, res) => {
  const { title,company, location, salary, description,responsibilities,qualifications } = req.body;

  if (!title || !company || !location || !salary || !description || !responsibilities || !qualifications) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    // Check if job already exists
    const existingJob = await Job.findOne({ title });
    if (existingJob) {
      return res.status(400).json({ message: 'Job already exists' });
    }

    // Create and save the new job
    const job = new Job({ title,company,location,salary,description,responsibilities,qualifications });
    const savedJob = await job.save();

    res.status(201).json({ message: 'Job added successfully', job: savedJob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Assuming you're using MongoDB or similar
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get a single job
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job
router.put('/jobs/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job' });
  }
});

router.delete('/jobs/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
