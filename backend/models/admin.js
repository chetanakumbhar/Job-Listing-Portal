const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path as needed

async function createAdminUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('adminPassword', 10);
    
    // Create a new admin user
    const newUser = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    // Save the new user to the database
    await newUser.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
}

createAdminUser();
