const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api', jobRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
