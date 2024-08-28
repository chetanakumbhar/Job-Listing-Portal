const express = require('express');
const JobListing = require('../models/JobListing');
const router = express.Router();

// Create a new job listing
router.post('/', async (req, res) => {
  try {
    const newJob = new JobListing(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all job listings
router.get('/', async (req, res) => {
  try {
    const jobs = await JobListing.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific job listing by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await JobListing.findById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a job listing by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a job listing by ID
router.delete('/:id', async (req, res) => {
  try {
    await JobListing.findByIdAndDelete(req.params.id);
    res.status(200).json("Job listing deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
