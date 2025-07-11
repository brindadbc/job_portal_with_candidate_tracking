import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-type">{job.type}</span>
      </div>
      
      <div className="job-company">
        <strong>{job.company}</strong>
      </div>
      
      <div className="job-location">
        📍 {job.location}
      </div>
      
      <div className="job-salary">
        💰 {job.salary}€/an
      </div>
      
      <div className="job-description">
        {job.description}
      </div>
      
      <div className="job-requirements">
        <strong>Compétences requises:</strong>
        <div className="requirements-list">
          {job.requirements.map((req, index) => (
            <span key={index} className="requirement-tag">{req}</span>
          ))}
        </div>
      </div>
      
      <div className="job-actions">
        <button className="btn btn-primary">
          Postuler
        </button>
        <button className="btn btn-secondary">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default JobCard;
