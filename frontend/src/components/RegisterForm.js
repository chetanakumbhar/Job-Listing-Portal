import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');  // Added to handle error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Clear previous error
    setError('');

    // Make API request
    axios.post('http://localhost:5000/api/auth/register', { name, email, password })
      .then(response => {
        // Check if registration was successful
        if (response.data.token) {
          alert('Registration successful!');
          // You might want to redirect or perform additional actions here
        } else {
          setError('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Registration error:', error);
        // Show error message from backend if available
        setError(error.response?.data?.message || 'Registration failed. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Register</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}  {/* Display error messages */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
