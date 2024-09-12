import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get jobId from the URL

function JobDetails() {
  const { id } = useParams(); // Get the jobId from the URL params
  const [job, setJob] = useState(null);
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

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="container my-4">
      <h1>{job.title}</h1>
      <h3>{job.company}</h3>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Qualifications:</strong> {job.qualifications}</p>
      <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
    </div>
  );
}

export default JobDetails;
