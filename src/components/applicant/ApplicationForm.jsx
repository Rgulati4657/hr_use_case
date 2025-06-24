// src/components/applicant/ApplicationForm.jsx
import React, { useState } from 'react';
import './ApplicationForm.css'; // We'll create this CSS file

const ApplicationForm = ({ jobTitle, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data up to the parent page to handle the submission
    onSubmit(formData);
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>Apply for {jobTitle}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          onChange={handleChange} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          onChange={handleChange} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="resume">Resume (PDF, DOCX)</label>
        <input 
          type="file" 
          id="resume" 
          name="resume" 
          required 
          accept=".pdf,.doc,.docx"
          onChange={handleChange} 
        />
      </div>

      <button type="submit" className="submit-button">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;

