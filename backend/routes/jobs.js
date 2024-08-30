const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new job
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
