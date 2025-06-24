

// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { 
//     Box, 
//     Typography, 
//     CircularProgress, 
//     Alert, 
//     Paper, 
//     Grid,
//     Chip,
//     Divider,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     Stack
// } from '@mui/material';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For nice list bullets
// import { getJobById } from '../../api/apiService.js';

// // A helper component to avoid repeating the list-rendering logic.
// const SectionList = ({ title, items }) => {
//     if (!items || items.length === 0) return null; // Don't render empty sections

//     return (
//         <Box>
//             <Typography variant="h6" component="h3" gutterBottom>
//                 {title}
//             </Typography>
//             <List dense>
//                 {items.map((item, index) => (
//                     <ListItem key={index} disableGutters>
//                         <ListItemIcon sx={{ minWidth: '32px' }}>
//                             <CheckCircleOutlineIcon color="primary" fontSize="small" />
//                         </ListItemIcon>
//                         <ListItemText primary={item} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// };

// SectionList.propTypes = {
//     title: PropTypes.string.isRequired,
//     items: PropTypes.arrayOf(PropTypes.string),
// };

// const JobDetailView = ({ jobId }) => {
//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!jobId) {
//             setLoading(false);
//             setError("No Job ID provided.");
//             return;
//         }

//         const fetchJob = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const data = await getJobById(jobId);
//                 setJob(data);
//             } catch (err) {
//                 setError("Failed to fetch job details. The job may have been deleted.");
//                 console.error("Failed to fetch job details:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJob();
//     }, [jobId]);

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
//     }

//     if (error) {
//         return <Alert severity="error">{error}</Alert>;
//     }
    
//     if (!job) {
//         return <Alert severity="info">Select a job to view its details.</Alert>;
//     }

//     return (
//         <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
//             {/* --- Main Header Section --- */}
//             <Box sx={{ mb: 3 }}>
//                 <Chip 
//                     label={job.status.charAt(0).toUpperCase() + job.status.slice(1)} 
//                     color={job.status === 'active' ? 'success' : 'default'} 
//                     size="small"
//                     sx={{ mb: 1 }}
//                 />
//                 <Typography variant="h4" component="h1" fontWeight="600">{job.job_title}</Typography>
//             </Box>

//             {/* --- Metadata Section (Dates) --- */}
//             <Grid container spacing={2} sx={{ mb: 3, color: 'text.secondary' }}>
//                 <Grid item xs={12} sm={6}>
//                     <Typography variant="body2">
//                         <strong>Created:</strong> {new Date(job.created_at).toLocaleString()}
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Typography variant="body2">
//                         <strong>Expires:</strong> {job.expires_at ? new Date(job.expires_at).toLocaleString() : 'Not set'}
//                     </Typography>
//                 </Grid>
//             </Grid>

//             <Divider sx={{ mb: 3 }} />

//             {/* --- Job Description Content --- */}
//             <Stack spacing={4}>
//                 <Box>
//                     <Typography variant="h6" component="h3" gutterBottom>Company Summary</Typography>
//                     <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.company_summary}</Typography>
//                 </Box>
//                 <Box>
//                     <Typography variant="h6" component="h3" gutterBottom>Role Summary</Typography>
//                     <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.role_summary}</Typography>
//                 </Box>
                
//                 {/* --- Use the helper component for all lists --- */}
//                 <SectionList title="Key Responsibilities" items={job.jd_content.key_responsibilities} />
//                 <SectionList title="Required Qualifications" items={job.jd_content.required_qualifications} />
//                 <SectionList title="Preferred Qualifications" items={job.jd_content.preferred_qualifications} />
//                 <SectionList title="Benefits" items={job.jd_content.benefits} />
//             </Stack>
//         </Paper>
//     );
// };

// JobDetailView.propTypes = {
//     jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };

// export default JobDetailView;


// src/components/admin/JobDetailView.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// --- 1. Import useParams from react-router-dom ---
import { useParams } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    CircularProgress, 
    Alert, 
    Paper, 
    Grid,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getJobById } from '../../api/apiService.js';

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
SectionList.propTypes = { title: PropTypes.string.isRequired, items: PropTypes.arrayOf(PropTypes.string) };


const JobDetailView = ({ jobId: jobIdFromProp }) => { // Renamed prop for clarity
    // --- 2. Get the jobId from the URL if it exists ---
    const params = useParams();

    // --- 3. Decide which ID to use: the prop first, then the URL parameter ---
    const jobId = jobIdFromProp || params.jobId;

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobId) {
            setLoading(false);
            setError("No Job ID provided.");
            return;
        }

        const fetchJob = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getJobById(jobId);
                setJob(data);
            } catch (err) {
                setError("Failed to fetch job details. The job may have been deleted or does not exist.");
                console.error("Failed to fetch job details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    // --- 4. Update the dependency array to react to changes from either source ---
    }, [jobId]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!job) return <Alert severity="info">Job data is not available.</Alert>;

    return (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 3 }}>
                <Chip label={job.status.charAt(0).toUpperCase() + job.status.slice(1)} color={job.status === 'active' ? 'success' : 'default'} size="small" sx={{ mb: 1 }} />
                <Typography variant="h4" component="h1" fontWeight="600">{job.job_title}</Typography>
            </Box>
            <Grid container spacing={2} sx={{ mb: 3, color: 'text.secondary' }}>
                <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Created:</strong> {new Date(job.created_at).toLocaleString()}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2"><strong>Expires:</strong> {job.expires_at ? new Date(job.expires_at).toLocaleString() : 'Not set'}</Typography></Grid>
            </Grid>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={4}>
                <Box><Typography variant="h6" component="h3" gutterBottom>Company Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.company_summary}</Typography></Box>
                <Box><Typography variant="h6" component="h3" gutterBottom>Role Summary</Typography><Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{job.jd_content.role_summary}</Typography></Box>
                <SectionList title="Key Responsibilities" items={job.jd_content.key_responsibilities} />
                <SectionList title="Required Qualifications" items={job.jd_content.required_qualifications} />
                <SectionList title="Preferred Qualifications" items={job.jd_content.preferred_qualifications} />
                <SectionList title="Benefits" items={job.jd_content.benefits} />
            </Stack>
        </Paper>
    );
};

// --- 5. The jobId prop is no longer strictly required ---
JobDetailView.propTypes = {
    jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default JobDetailView;