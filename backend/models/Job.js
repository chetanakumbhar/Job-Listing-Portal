const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, // Ensures job titles are unique
  },
  company: { 
    type: String,
    required: true,
  },
  location: { 
    type: String,
    required: true,
  },
  salary: { 
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
