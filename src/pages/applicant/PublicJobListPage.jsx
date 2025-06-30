

// // src/pages/applicant/PublicJobListPage.jsx
// import React, { useState, useEffect } from 'react';
// import FilterSidebar from '../../components/applicant/FilterSidebar';
// import PublicJobCard from '../../components/applicant/PublicJobCard';
// // import CareersHero from '../../components/applicant/CareersHero';
// import './PublicJobListPage.css';

// const allJobs = [ // Renamed from mockJobs to allJobs to avoid confusion
//     { id: 1, title: 'Software Engineer, Frontend', location: 'Mountain View, CA', experience: 'Mid-Senior Level' },
//     { id: 2, title: 'UX Designer', location: 'New York, NY', experience: 'Associate' },
//     { id: 3, title: 'Product Manager', location: 'Remote', experience: 'Senior Level' },
//     { id: 4, title: 'Data Scientist', location: 'Mountain View, CA', experience: 'Senior Level' },
// ];

// const PublicJobListPage = () => {
//   // State to hold the currently selected filters
//   const [filters, setFilters] = useState({
//     location: [],
//     experience: [],
//   });

//   // State to hold the jobs that are displayed on the screen
//   const [filteredJobs, setFilteredJobs] = useState(allJobs);

//   // This effect runs whenever the 'filters' state changes
//   useEffect(() => {
//     let jobsToDisplay = [...allJobs];

//     // Location filtering
//     if (filters.location.length > 0) {
//       jobsToDisplay = jobsToDisplay.filter(job => filters.location.includes(job.location));
//     }
//     // Experience filtering
//     if (filters.experience.length > 0) {
//       jobsToDisplay = jobsToDisplay.filter(job => filters.experience.includes(job.experience));
//     }

//     setFilteredJobs(jobsToDisplay);
//   }, [filters]); // The dependency array ensures this runs only when filters change

//   // This function will be passed down to the sidebar
//   const handleFilterChange = (category, value) => {
//     setFilters(prevFilters => {
//       const currentCategoryFilters = prevFilters[category];
//       const newCategoryFilters = currentCategoryFilters.includes(value)
//         ? currentCategoryFilters.filter(item => item !== value) // Remove if it's already there
//         : [...currentCategoryFilters, value]; // Add if it's not there

//       return {
//         ...prevFilters,
//         [category]: newCategoryFilters,
//       };
//     });
//   };

//   return (
//     <div className="job-search-page">
//       <div className="filter-sidebar-container">
//         {/* Pass the handler function down to the sidebar */}
//         <FilterSidebar onFilterChange={handleFilterChange} />
//       </div>
//       <div className="job-list-container">
//         <h2>{filteredJobs.length} jobs matched</h2>
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map(job => (
//             <PublicJobCard key={job.id} job={job} />
//           ))
//         ) : (
//           <p>No jobs match your current filters. Try clearing some.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PublicJobListPage;








// src/pages/applicant/PublicJobListPage.jsx
// src/pages/applicant/PublicJobListPage.jsx

import { useState, useEffect, useMemo } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { getAllJobs, getJobById } from '../../api/apiService';

import FilterSidebar from '../../components/applicant/FilterSidebar';
import PublicJobCard from '../../components/applicant/PublicJobCard';
import './PublicJobListPage.css';

const PublicJobListPage = () => {
    // State for data from the API
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for user-controlled filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        location: [],
        experience: [],
    });

    // Fetch data once when the component mounts
    useEffect(() => {
        const fetchAndPrepareJobs = async () => {
            try {
                const jobSummaries = await getAllJobs();
                const detailPromises = jobSummaries.map(job => getJobById(job.id));
                const detailedJobs = await Promise.all(detailPromises);
                setAllJobs(detailedJobs);
            } catch (err) {
                setError("Sorry, we couldn't load job openings at this time.");
                console.error("Failed to fetch jobs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAndPrepareJobs();
    }, []);

    // This logic now filters the job list based on search and checkbox filters
    const filteredJobs = useMemo(() => {
        if (!allJobs) return [];

        return allJobs
            .filter(job => job.status === 'active') // Always show only active jobs
            .filter(job => {
                // Search term filter (checks the job title)
                const searchMatch = job.job_title.toLowerCase().includes(searchTerm.toLowerCase());

                // Checkbox filters
                // NOTE: This assumes your job object will have 'location' and 'experience' fields from the backend.
                // We use placeholders for now, which you can update later.
                const locationMatch = filters.location.length === 0 || filters.location.includes(job.location || 'Remote');
                const experienceMatch = filters.experience.length === 0 || filters.experience.includes(job.experience || 'Mid-Senior Level');

                return searchMatch && locationMatch && experienceMatch;
            });
    }, [allJobs, searchTerm, filters]);

    // Handler for checkboxes
    const handleFilterChange = (category, value) => {
        setFilters(prevFilters => {
            const currentCategoryFilters = prevFilters[category];
            const newCategoryFilters = currentCategoryFilters.includes(value)
                ? currentCategoryFilters.filter(item => item !== value)
                : [...currentCategoryFilters, value];
            return { ...prevFilters, [category]: newCategoryFilters };
        });
    };

    // Handler to clear all filters
    const clearAllFilters = () => {
        setSearchTerm('');
        setFilters({ location: [], experience: [] });
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div className="job-search-page">
            <div className="filter-sidebar-container">
                <FilterSidebar
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearAllFilters}
                />
            </div>
            <div className="job-list-container">
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    {filteredJobs.length} jobs matched
                </Typography>
                
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <PublicJobCard key={job.id} job={job} />
                    ))
                ) : (
                    <Typography sx={{ mt: 4 }}>
                        No jobs match your current filters. Try clearing some.
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default PublicJobListPage;



