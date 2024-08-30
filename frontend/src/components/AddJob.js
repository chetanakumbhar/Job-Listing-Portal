import React, { useState } from 'react';
import axios from 'axios';

function AddJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/jobs', {
      title,
      description,
      company,
      location,
      salary
    })
    .then(response => {
      alert('Job added successfully!');
      setTitle('');
      setDescription('');
      setCompany('');
      setLocation('');
      setSalary('');
    })
    .catch(error => console.error('Error adding job:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
