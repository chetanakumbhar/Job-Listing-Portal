import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your backend URL
    axios.post('http://localhost:5000/api/login', { email, password })
      .then(response => {
        alert('Login successful!');
        // Handle successful login (e.g., redirect, store token, etc.)
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
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
            <button type="submit" className="btn btn-primary mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
