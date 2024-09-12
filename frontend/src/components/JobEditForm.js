import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function JobEditForm() {
  const { id } = useParams(); // Get the jobId from the URL params
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    qualifications: '',
    responsibilities: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        setError('Failed to load job details');
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, job);
      // Navigate back to the job list or job details page
      navigate(`/jobs/${id}`);
    } catch (error) {
      setError('Failed to update job');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      <h1>Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="qualifications">Qualifications</label>
          <textarea
            className="form-control"
            id="qualifications"
            name="qualifications"
            value={job.qualifications}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="responsibilities">Responsibilities</label>
          <textarea
            className="form-control"
            id="responsibilities"
            name="responsibilities"
            value={job.responsibilities}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Job</button>
      </form>
    </div>
  );
}

export default JobEditForm;
