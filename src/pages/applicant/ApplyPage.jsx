// src/pages/applicant/ApplyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApplicationForm from '../../components/applicant/ApplicationForm';
import './ApplyPage.css';

// We need the mock data again to find the job title
const allJobs = [
  { 
    id: 1, title: 'Software Engineer, Frontend', location: 'Mountain View, CA', experience: 'Mid-Senior Level', team: 'Google Search',
    description: 'The Google Search team is responsible for building the most popular and beloved search engine in the world. As a frontend engineer, you will work on the user-facing aspects of Search, ensuring a fast, delightful, and accessible experience for billions of users.',
    qualifications: ['Bachelor\'s degree in Computer Science or equivalent practical experience.', '3 years of experience with web technologies (HTML, CSS, JavaScript).', 'Experience with modern JavaScript frameworks like React, Vue, or Angular.'],
    responsibilities: ['Design, develop, test, deploy, maintain, and improve software.', 'Manage individual project priorities, deadlines, and deliverables.', 'Collaborate with a team of engineers, designers, and product managers to launch new features.']
  },
  { 
    id: 2, title: 'UX Designer', location: 'New York, NY', experience: 'Associate', team: 'Google Cloud',
    description: 'The Google Cloud UX team is dedicated to making our cloud products simple, intuitive, and enjoyable to use. You will be at the forefront of this effort, creating elegant solutions for complex technical problems.',
    qualifications: ['A portfolio showcasing your UX design work.', 'Experience with design tools like Figma, Sketch, or Adobe XD.', 'Understanding of user-centered design principles.'],
    responsibilities: ['Conduct user research and translate insights into sitemaps, wireframes, and prototypes.', 'Work with product managers to define user requirements and product strategy.', 'Create and maintain design systems and style guides.']
  },
  // Add other jobs here with full details...
  { id: 3, title: 'Product Manager', location: 'Remote', experience: 'Senior Level', team: 'YouTube' /* ...add details */ },
  { id: 4, title: 'Data Scientist', location: 'Mountain View, CA', experience: 'Senior Level', team: 'Google AI' /* ...add details */ },
];


const ApplyPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const foundJob = allJobs.find(j => j.id == jobId);
    setJob(foundJob);
  }, [jobId]);

  const handleApplicationSubmit = (formData) => {
    console.log('Submitting application for Job ID:', jobId);
    console.log('Form Data:', formData);
    // In a real app, you would send this to your backend API
    // api.submitApplication(jobId, formData);
    setIsSubmitted(true); // Show a success message
  };

  if (isSubmitted) {
    return (
      <div className="apply-page">
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>Your application for {job?.title} has been submitted successfully.</p>
          <Link to="/" className="back-link">← Return to Job Listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-page">
      {job ? (
        <ApplicationForm jobTitle={job.title} onSubmit={handleApplicationSubmit} />
      ) : (
        <p>Loading job information...</p>
      )}
    </div>
  );
};

export default ApplyPage;