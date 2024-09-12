import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import
import 'bootstrap/dist/css/bootstrap.min.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const isAdminToken = checkIfAdmin(token);
      console.log('Admin status:', isAdminToken);
      setIsAdmin(isAdminToken);
    }

    fetchJobs();
  }, []);

  const checkIfAdmin = (token) => {
    try {
      const decodedToken = jwtDecode(token); // Adjusted
      return decodedToken && decodedToken.isAdmin; // Modify based on your JWT structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load jobs');
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in as admin to delete jobs');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
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
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text">
                    <strong>Description:</strong> {job.description}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="card-text">
                    <strong>Salary:</strong> ${job.salary}
                  </p>

                  {/* View Details Button */}
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary mr-2">
                    View Details
                  </Link>

                  {/* Update Job Button */}
                  {isAdmin && (
                    <Link to={`/jobs/edit/${job._id}`} className="btn btn-warning mr-2">
                      Edit
                    </Link>
                  )}

                  {/* Delete Job Button */}
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteJob(job._id)}
                    >
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

export default JobList;
