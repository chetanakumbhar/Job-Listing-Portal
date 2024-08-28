const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jobListingsRoute = require('./routes/jobListings');
const usersRoute = require('./routes/users');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/jobListings', auth, jobListingsRoute); // Protect job listing routes
app.use('/api/users', usersRoute); // No protection for registration and login

app.get('/', (req, res) => {
  res.send('Job Listing Portal Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
