import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import JobList from './components/JobList';
import AddJob from './components/AddJob';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS file if needed
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserName(response.data.name); // Set the user name after fetching data
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setUserName(''); // Clear username after logout
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Job Portal</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Job Listings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Job</Link>
              </li>
              {/* Conditionally hide "Login" and "Register" links if the user is logged in */}
              {!userName && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
            {/* Place user name and logout button at the right corner */}
            {userName && (
              <div className="ml-auto d-flex align-items-center">
                <span className="welcome-message mr-3">Welcome, {userName}!</span>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
