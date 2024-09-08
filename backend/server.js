const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/api/jobs', require('./routes/jobs')); // Ensure this path is correct
app.use('/api/auth', require('./routes/auth')); // Ensure this path is correct

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
