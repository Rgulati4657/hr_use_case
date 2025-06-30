// src/pages/admin/ApplicantManagementPage.jsx
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { getAllJobs } from '../../api/apiService';
import ApplicantList from '../../components/admin/ApplicantList'; // We can reuse this!

const ApplicantManagementPage = () => {

     const { refreshKey } = useOutletContext();

    const [allJobs, setAllJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState('');
    const [loadingJobs, setLoadingJobs] = useState(true);

    // Effect to fetch all jobs for the dropdown menu
    useEffect(() => {
        const fetchJobsForDropdown = async () => {
            try {
                setLoadingJobs(true);
                const jobsData = await getAllJobs();
                // We only need active jobs for applicant management
                // const activeJobs = jobsData.filter(job => job.status === 'active');
                // setAllJobs(activeJobs || []);
                setAllJobs(jobsData || []);
            } catch (error) {
                console.error("Failed to fetch jobs for dropdown", error);
            } finally {
                setLoadingJobs(false);
            }
        };
        fetchJobsForDropdown();
    }, [refreshKey]);

    const handleJobChange = (event) => {
        setSelectedJobId(event.target.value);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="600" sx={{ mb: 3 }}>
                Applicant Management
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <FormControl fullWidth disabled={loadingJobs}>
                    <InputLabel id="job-select-label">Select a Job Posting</InputLabel>
                    <Select
                        labelId="job-select-label"
                        id="job-select"
                        value={selectedJobId}
                        label="Select a Job Posting"
                        onChange={handleJobChange}
                    >
                        {loadingJobs ? (
                            <MenuItem disabled>Loading jobs...</MenuItem>
                        ) : (
                            allJobs.map(job => (
                                <MenuItem key={job.id} value={job.id}>
                                    {job.job_title} (ID: {job.id})
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            </Paper>

            {/* Conditionally render the applicant list only when a job is selected */}
            {selectedJobId ? (
                <ApplicantList jobId={selectedJobId} key={refreshKey}/>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography color="text.secondary">Please select a job from the dropdown to view its applicants.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ApplicantManagementPage;