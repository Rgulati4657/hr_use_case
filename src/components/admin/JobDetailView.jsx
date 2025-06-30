// // / src/components/admin/JobDetailView.jsx
// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { 
//     Box, Typography, CircularProgress, Alert, Paper, Grid, Chip, 
//     Divider, List, ListItem, ListItemIcon, ListItemText, Stack
// } from '@mui/material';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { getJobById } from '../../api/apiService.js';
// const SectionList = ({ title, items }) => { 
//     if (!items || items.length === 0) return null;
//     return (
//         <Box>
//             <Typography variant="h6" component="h3" gutterBottom>{title}</Typography>
//             <List dense>
//                 {items.map((item, index) => (
//                     <ListItem key={index} disableGutters>
//                         <ListItemIcon sx={{ minWidth: '32px' }}><CheckCircleOutlineIcon color="primary" fontSize="small" /></ListItemIcon>
//                         <ListItemText primary={item} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// };

// const JobDetailView = ({ jobId }) => {
//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!jobId) {
//             setLoading(false);
//             setError("No Job ID was provided to the component.");
//             return;
//         }
//         const fetchJob = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const data = await getJobById(jobId);
//                 setJob(data);
//             } catch (err) {
//                 setError("Failed to fetch job details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchJob();
//     }, [jobId]);

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error">{error}</Alert>;
//     if (!job) return <Alert severity="info">Job details not found.</Alert>;

//     return (
//         <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
//             <Box>
//                 <Chip label={job.status.charAt(0).toUpperCase() + job.status.slice(1)} color={job.status === 'active' ? 'success' : 'default'} size="small" sx={{ mb: 1 }} />
//                 <Typography variant="h4" component="h1" fontWeight="600">{job.job_title}</Typography>
//             </Box>
//             <Divider sx={{ my: 3 }} />
//             {job.jd_content ? (
//                 <Stack spacing={4}>
//                         <Box><Typography variant="h6" component="h3" gutterBottom>Company Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.company_summary}</Typography></Box>
//                         <Box><Typography variant="h6" component="h3" gutterBottom>Role Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.role_summary}</Typography></Box>
//                         <SectionList title="Key Responsibilities" items={job.jd_content.key_responsibilities} />
//                         <SectionList title="Required Qualifications" items={job.jd_content.required_qualifications} />
//                         <SectionList title="Preferred Qualifications" items={job.jd_content.preferred_qualifications} />
//                         <SectionList title="Benefits" items={job.jd_content.benefits} />
//                                    </Stack>
//             ) : (
//                 <Alert severity="warning">No job description content available.</Alert>
//             )}
//         </Paper>
//     );
// };

// // Prop types are unchanged
// JobDetailView.propTypes = { jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired };
// SectionList.propTypes = { title: PropTypes.string.isRequired, items: PropTypes.arrayOf(PropTypes.string) };

// export default JobDetailView;
















 import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import {
    Box, Typography, CircularProgress, Alert, Paper, Grid, Chip,
    Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Button, Snackbar
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getJobById, createApplicant, createApplication } from '../../api/apiService.js';
import ApplicationModal from '../applicant/ApplicationModal.jsx';

// Helper component for lists
const SectionList = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <Box>
            <Typography variant="h6" component="h3" gutterBottom>{title}</Typography>
            <List dense>
                {items.map((item, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: '32px' }}><CheckCircleOutlineIcon color="primary" fontSize="small" /></ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
SectionList.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string)
};


// --- Main Component ---
const JobDetailView = ({ jobId: jobIdFromProp }) => {
    // Get parameters from BOTH sources: props for admin view, URL for public view
    const params = useParams();
    const location = useLocation();

    // Create a final ID, prioritizing the prop, then the URL param
    const finalJobId = jobIdFromProp || params.jobId;
    const isAdminView = location.pathname.startsWith('/admin');

    // All the state for the component
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        if (!finalJobId) {
            setLoading(false);
            setError("No Job ID was provided to the component.");
            return;
        }

        // Check localStorage if the user has already applied (for public view)
        try {
            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
            if (appliedJobs.includes(parseInt(finalJobId, 10))) {
                setHasApplied(true);
            }
        } catch (e) {
            console.error("Could not parse appliedJobs from localStorage", e);
        }

        const fetchJob = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getJobById(finalJobId);
                setJob(data);
            } catch (err) {
                setError("Failed to fetch job details. The job may have been deleted or does not exist.");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [finalJobId]); // The dependency array correctly watches for changes

    const handleApplyNow = () => {
        setIsModalOpen(true);
        setSubmissionError('');
    };

    const handleSubmitApplication = async (applicantData, resumeFile) => {
        setIsSubmitting(true);
        setSubmissionError('');
        try {
            const newApplicant = await createApplicant(applicantData, resumeFile);
            await createApplication(newApplicant.applicant_uid, job.id);

            const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
            if (!appliedJobs.includes(job.id)) {
                appliedJobs.push(job.id);
            }
            localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
            setHasApplied(true);

            setIsModalOpen(false);
            setSnackbarOpen(true);

        } catch (err) {
            const message = err.response?.data?.error || "An unexpected error occurred. Please try again.";
            setSubmissionError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!job) return <Alert severity="info">Job details not found.</Alert>;

    return (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                    <Chip label={job.status.charAt(0).toUpperCase() + job.status.slice(1)} color={job.status === 'active' ? 'success' : 'default'} size="small" sx={{ mb: 1 }} />
                    <Typography variant="h4" component="h1" fontWeight="600">{job.job_title}</Typography>
                </Box>
                {/* Only show the "Apply" button if it's NOT the admin view */}
                {!isAdminView && (
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleApplyNow}
                        disabled={hasApplied || isSubmitting}
                        startIcon={hasApplied ? <CheckCircleIcon /> : null}
                    >
                        {hasApplied ? 'Applied' : 'Apply Now'}
                    </Button>
                )}
            </Box>

            <Grid container spacing={2} sx={{ mb: 3, color: 'text.secondary' }}>
                <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Created:</strong> {new Date(job.created_at).toLocaleString()}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Expires:</strong> {job.expires_at ? new Date(job.expires_at).toLocaleString() : 'Not set'}</Typography></Grid>
            </Grid>
            <Divider sx={{ mb: 3 }} />

            {job.jd_content ? (
                <Stack spacing={4}>
                    <Box><Typography variant="h6" component="h3" gutterBottom>Company Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.company_summary}</Typography></Box>
                    <Box><Typography variant="h6" component="h3" gutterBottom>Role Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.role_summary}</Typography></Box>
                    <SectionList title="Key Responsibilities" items={job.jd_content.key_responsibilities} />
                    <SectionList title="Required Qualifications" items={job.jd_content.required_qualifications} />
                    <SectionList title="Preferred Qualifications" items={job.jd_content.preferred_qualifications} />
                    <SectionList title="Benefits" items={job.jd_content.benefits} />
                </Stack>
            ) : (
                <Alert severity="warning">No job description content available for this post.</Alert>
            )}

            <ApplicationModal
                open={isModalOpen}
                onClose={() => !isSubmitting && setIsModalOpen(false)}
                onSubmit={handleSubmitApplication}
                jobTitle={job.job_title}
                loading={isSubmitting}
            />
            {submissionError && <Alert severity="error" sx={{mt: 2}}>{submissionError}</Alert>}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="Application submitted successfully! We will be in touch."
            />
        </Paper>
    );
};

// Make the prop optional, since it won't exist on the public page
JobDetailView.propTypes = {
    jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default JobDetailView;










































// // src/components/admin/JobDetailView.jsx
// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// // --- 1. REMOVED useParams, it's not needed here ---
// import { 
//     Box, Typography, CircularProgress, Alert, Paper, Grid, Chip, 
//     Divider, List, ListItem, ListItemIcon, ListItemText, Stack
// } from '@mui/material';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { getJobById } from '../../api/apiService.js'; // Removed unused applicant APIs

// // Helper component (no changes)
// const SectionList = ({ title, items }) => { /* ... same as before ... */ };

// // --- Main Component ---
// // --- 2. ADD the jobId prop back in ---
// const JobDetailView = ({ jobId }) => {
    
//     // --- 3. REMOVED useParams() hook call ---

//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     // --- 4. REMOVED all state related to applying for a job. This is a VIEW for admins. ---
//     // const [isModalOpen, setIsModalOpen] = useState(false);
//     // const [isSubmitting, setIsSubmitting] = useState(false);
//     // ... and so on

//     useEffect(() => {
//         // --- 5. The entire logic now depends on the jobId PROP ---
//         if (!jobId) {
//             setLoading(false);
//             setError("No Job ID was provided to the component.");
//             return;
//         }

//         const fetchJob = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const data = await getJobById(jobId);
//                 setJob(data);
//             } catch (err) {
//                 setError("Failed to fetch job details. The job may have been deleted or does not exist.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJob();
//     }, [jobId]); // The dependency array now correctly watches for changes in the PROP

//     // --- (Loading, error, and no-job checks remain the same) ---
//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error">{error}</Alert>;
//     if (!job) return <Alert severity="info">Job details not found.</Alert>;

//     // --- 6. SIMPLIFIED the JSX to be a pure "View". The "Apply Now" button is removed. ---
//     return (
//         <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
//                 <Box>
//                     <Chip label={job.status.charAt(0).toUpperCase() + job.status.slice(1)} color={job.status === 'active' ? 'success' : 'default'} size="small" sx={{ mb: 1 }} />
//                     <Typography variant="h4" component="h1" fontWeight="600">{job.job_title}</Typography>
//                 </Box>
//                 {/* Admin does not need an "Apply Now" button on this screen */}
//             </Box>
            
//             <Grid container spacing={2} sx={{ mb: 3, color: 'text.secondary' }}>
//                 <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Created:</strong> {new Date(job.created_at).toLocaleString()}</Typography></Grid>
//                 <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Expires:</strong> {job.expires_at ? new Date(job.expires_at).toLocaleString() : 'Not set'}</Typography></Grid>
//             </Grid>
//             <Divider sx={{ mb: 3 }} />

//             {/* Check if jd_content exists before trying to access its properties */}
//             {job.jd_content ? (
//                 <Stack spacing={4}>
//                     <Box><Typography variant="h6" component="h3" gutterBottom>Company Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.company_summary}</Typography></Box>
//                     <Box><Typography variant="h6" component="h3" gutterBottom>Role Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.role_summary}</Typography></Box>
//                     <SectionList title="Key Responsibilities" items={job.jd_content.key_responsibilities} />
//                     <SectionList title="Required Qualifications" items={job.jd_content.required_qualifications} />
//                     <SectionList title="Preferred Qualifications" items={job.jd_content.preferred_qualifications} />
//                     <SectionList title="Benefits" items={job.jd_content.benefits} />
//                 </Stack>
//             ) : (
//                 <Alert severity="warning">No job description content available for this post.</Alert>
//             )}
            
//             {/* All modals and snackbars related to applying are removed */}
//         </Paper>
//     );
// };

// // --- 7. ADD the propType for jobId back in. It is now required. ---
// JobDetailView.propTypes = {
//     jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };

// SectionList.propTypes = { 
//     title: PropTypes.string.isRequired, 
//     items: PropTypes.arrayOf(PropTypes.string) 
// };

// export default JobDetailView;