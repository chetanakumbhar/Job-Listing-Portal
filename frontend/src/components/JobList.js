import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Job Listings</h1>
      <div className="list-group">
        {jobs.map(job => (
          <div key={job._id} className="list-group-item list-group-item-action">
            <h5 className="mb-1">{job.title}</h5>
            <p className="mb-1">{job.description}</p>
            <small>Company: {job.company}</small><br />
            <small>Location: {job.location}</small><br />
            {job.salary && <small>Salary: ${job.salary}</small>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
