import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        if (response.data.token) {
          // Store the JWT token and role in localStorage
          localStorage.setItem('token', response.data.token); // Store the token
          localStorage.setItem('role', response.data.role);   // Store the user's role
          console.log(response.data.token);
          
          // Redirect based on the role
          if (response.data.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/jobs');
          }
        } else {
          setError('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Login error:', error.response ? error.response.data.message : error.message);
        setError('An error occurred during login.');
      });
  };
  

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
