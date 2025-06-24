// // src/pages/applicant/PublicJobDetailPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom'; // Assuming you use React Router
// // import { getJobById } from '../../api/jobs';

// const mockJobDetail = {
//     id: 1,
//     title: 'Software Engineer, Frontend',
//     location: 'Mountain View, CA',
//     team: 'Google Search',
//     description: 'Detailed description about the role, responsibilities, and the impact you will have.',
//     qualifications: ['BS degree in Computer Science or equivalent practical experience.', '3 years of experience with web technologies.', 'Experience with React, Vue, or Angular.'],
//     responsibilities: ['Design, develop, test, deploy, maintain and improve software.', 'Manage individual project priorities, deadlines and deliverables.']
// };

// const PublicJobDetailPage = () => {
//     const { jobId } = useParams(); // Gets 'jobId' from the URL, e.g., /jobs/1
//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch job details based on the jobId from the URL
//         // getJobById(jobId).then(data => {
//         //     setJob(data);
//         //     setLoading(false);
//         // });
//         setJob(mockJobDetail);
//         setLoading(false);
//     }, [jobId]);

//     if (loading) return <p>Loading...</p>;
//     if (!job) return <p>Job not found.</p>;

//     return (
//         <div>
//             <h1>{job.title}</h1>
//             <p>{job.team} - {job.location}</p>
//             <Link to={`/apply/${job.id}`}>
//                 <button>Apply Now</button>
//             </Link>

//             <h2>Job Description</h2>
//             <p>{job.description}</p>
            
//             <h2>Qualifications</h2>
//             <ul>
//                 {job.qualifications.map((q, index) => <li key={index}>{q}</li>)}
//             </ul>

//             <h2>Responsibilities</h2>
//             <ul>
//                 {job.responsibilities.map((r, index) => <li key={index}>{r}</li>)}
//             </ul>
//         </div>
//     );
// };

// export default PublicJobDetailPage;



// src/pages/applicant/PublicJobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PublicJobDetailPage.css'; // We'll create this CSS file

// In a real app, this data would come from your API.
// For now, we'll simulate it by importing the same mock data.
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


const PublicJobDetailPage = () => {
    // This hook gets the 'jobId' from the URL (e.g., /jobs/1)
    const { jobId } = useParams(); 
    const [job, setJob] = useState(null);

    useEffect(() => {
        // Find the job from our mock data array.
        // The '==' is intentional here in case jobId is a string and id is a number.
        const foundJob = allJobs.find(j => j.id == jobId); 
        setJob(foundJob);
    }, [jobId]);

    // Handle cases where the job is not found or is still loading
    if (!job) {
        return (
            <div className="job-detail-page">
                <h2>Job not found</h2>
                <Link to="/" className="back-link">← Back to all jobs</Link>
            </div>
        );
    }

    return (
        <div className="job-detail-page">
            <Link to="/" className="back-link">← Back to all jobs</Link>
            <div className="detail-header">
                <h1>{job.title}</h1>
                <p className="subtitle">{job.team} • {job.location}</p>
                {/* <button className="apply-button">Apply Now</button> */}
                <Link to={`/apply/${job.id}`} className="apply-button-link">Apply Now</Link>
            </div>

            <div className="detail-section">
                <h2>Job description</h2>
                <p>{job.description}</p>
            </div>

            <div className="detail-section">
                <h2>Minimum qualifications</h2>
                <ul>
                    {job.qualifications.map((q, index) => <li key={index}>{q}</li>)}
                </ul>
            </div>
            
            <div className="detail-section">
                <h2>Responsibilities</h2>
                <ul>
                    {job.responsibilities.map((r, index) => <li key={index}>{r}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default PublicJobDetailPage;