import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchJobs();
    verifyAdmin();  // Verify if the user is admin
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data); // Assuming the response contains job data
      setLoading(false);
    } catch (error) {
      setError('Failed to load jobs');
      setLoading(false);
    }
  };

  // Check if the user is admin by decoding the token or verifying the role from the backend
  const verifyAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Example: decode the token (you can use jwt-decode or send a request to the server)
      const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
      if (payload.role === 'admin') {
        setIsAdmin(true); // If the role is admin, set admin flag
      }
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please login as admin.');
      }

      // Pass the token in the Authorization header
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the header
        }
      });
      setJobs(jobs.filter(job => job._id !== jobId)); // Remove the job from the list
    } catch (error) {
      console.error(error.message);
      setError('Failed to delete job');
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div className="col-md-4 mb-4" key={job._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text"><strong>Description:</strong> {job.description}</p>
                  <p className="card-text"><strong>Location:</strong> {job.location}</p>
                  <p className="card-text"><strong>Salary:</strong> ${job.salary}</p>
                  {isAdmin && (
                    <button className="btn btn-danger" onClick={() => deleteJob(job._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No jobs available</div>
        )}
      </div>
    </div>
  );
}

export default JobList
