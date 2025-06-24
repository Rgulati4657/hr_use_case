

// src/pages/applicant/PublicJobListPage.jsx
import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../components/applicant/FilterSidebar';
import PublicJobCard from '../../components/applicant/PublicJobCard';
// import CareersHero from '../../components/applicant/CareersHero';
import './PublicJobListPage.css';

const allJobs = [ // Renamed from mockJobs to allJobs to avoid confusion
    { id: 1, title: 'Software Engineer, Frontend', location: 'Mountain View, CA', experience: 'Mid-Senior Level' },
    { id: 2, title: 'UX Designer', location: 'New York, NY', experience: 'Associate' },
    { id: 3, title: 'Product Manager', location: 'Remote', experience: 'Senior Level' },
    { id: 4, title: 'Data Scientist', location: 'Mountain View, CA', experience: 'Senior Level' },
];

const PublicJobListPage = () => {
  // State to hold the currently selected filters
  const [filters, setFilters] = useState({
    location: [],
    experience: [],
  });

  // State to hold the jobs that are displayed on the screen
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // This effect runs whenever the 'filters' state changes
  useEffect(() => {
    let jobsToDisplay = [...allJobs];

    // Location filtering
    if (filters.location.length > 0) {
      jobsToDisplay = jobsToDisplay.filter(job => filters.location.includes(job.location));
    }
    // Experience filtering
    if (filters.experience.length > 0) {
      jobsToDisplay = jobsToDisplay.filter(job => filters.experience.includes(job.experience));
    }

    setFilteredJobs(jobsToDisplay);
  }, [filters]); // The dependency array ensures this runs only when filters change

  // This function will be passed down to the sidebar
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const currentCategoryFilters = prevFilters[category];
      const newCategoryFilters = currentCategoryFilters.includes(value)
        ? currentCategoryFilters.filter(item => item !== value) // Remove if it's already there
        : [...currentCategoryFilters, value]; // Add if it's not there

      return {
        ...prevFilters,
        [category]: newCategoryFilters,
      };
    });
  };

  return (
    <div className="job-search-page">
      <div className="filter-sidebar-container">
        {/* Pass the handler function down to the sidebar */}
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="job-list-container">
        <h2>{filteredJobs.length} jobs matched</h2>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <PublicJobCard key={job.id} job={job} />
          ))
        ) : (
          <p>No jobs match your current filters. Try clearing some.</p>
        )}
      </div>
    </div>
  );
};

export default PublicJobListPage;












