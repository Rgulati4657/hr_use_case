// // src/components/admin/ApplicantList.jsx
// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { 
//     Box, Typography, CircularProgress, Alert,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
// } from '@mui/material';
// import { getApplicationsForJob } from '../../api/apiService';
// import ApplicantRow from './ApplicantRow';

// const ApplicantList = ({ jobId }) => {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!jobId) return;

//         const fetchApplicants = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const data = await getApplicationsForJob(jobId);
//                 setApplications(data || []);
//             } catch (err) {
//                 console.error("Failed to fetch applications:", err);
//                 setError("Could not load applicants for this job.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchApplicants();
//     }, [jobId]);

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
//                 Candidate Pipeline
//             </Typography>
//             {applications.length === 0 ? (
//                 <Typography color="text.secondary">No applicants for this position yet.</Typography>
//             ) : (
//                 <TableContainer component={Paper} variant="outlined">
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell>Applied On</TableCell>
//                                 <TableCell>Status</TableCell>
//                                 <TableCell align="right">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {applications.map(app => (
//                                 <ApplicantRow key={app.id} application={app} />
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Box>
//     );
// };

// ApplicantList.propTypes = {
//     jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };

// export default ApplicantList;

// // src/components/admin/ApplicantList.jsx
// import { useState, useEffect, useMemo } from 'react'; // Add useMemo
// import PropTypes from 'prop-types';
// import {
//     Box, Typography, CircularProgress, Alert,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     TextField, InputAdornment, Select, MenuItem, FormControl // New imports for filters
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { getApplicationsForJob, updateApplicationStatus } from '../../api/apiService'; // Update import
// // import ApplicantRow from './ApplicantRow';
// // import StatefulApplicantRow from './StatefulApplicantRow';
// import ApplicantRow from './ApplicantRow';

// const ApplicantList = ({ jobId }) => {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     // --- NEW: State for filtering ---
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('all');

//     useEffect(() => {
//         if (!jobId) return;

//         const fetchApplicants = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const data = await getApplicationsForJob(jobId);
//                   console.log("RAW API RESPONSE for getApplicationsForJob:", data);
//                 setApplications(data || []);
//             } catch (err) {
//                 setError("Could not load applicants for this job.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchApplicants();
//     }, [jobId]);

//     // --- NEW: Memoized filtering logic ---
//     const filteredApplications = useMemo(() => {
//         return applications
//             .filter(app => {
//                 // Status filter
//                 if (statusFilter === 'all') return true;
//                 return app.status === statusFilter;
//             })
//             .filter(app => {
//                 // Search filter (searches name and email)
//                 if (!searchTerm) return true;
//                 const lowerSearch = searchTerm.toLowerCase();
//                 return (
//                     app.applicant.full_name.toLowerCase().includes(lowerSearch) ||
//                     app.applicant.email.toLowerCase().includes(lowerSearch)
//                 );
//             });
//     }, [applications, searchTerm, statusFilter]);
    
//     // --- NEW: Handler to update status ---
//     const handleStatusChange = async (appId, newStatus) => {
//         // Optimistic update
//         setApplications(prev => prev.map(app => 
//             app.id === appId ? { ...app, status: newStatus } : app
//         ));
//         try {
//             await updateApplicationStatus(appId, newStatus);
//         } catch (err) {
//             console.error("Failed to update status, reverting.", err);
//             // Revert on failure (could be more robust with fetching again)
//             // For now, an error message is sufficient
//             setError("Failed to update status for an applicant. Please refresh.");
//         }
//     };


//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;

//     const applicationStatuses = ['all', 'applied', 'screening', 'assessment', 'interview_scheduled', 'hired', 'rejected'];

//     return (
//         <Box>
//             {/* --- NEW: Filter Controls --- */}
//             <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
//                 <TextField 
//                     fullWidth 
//                     placeholder="Search by name or email..." 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
//                 />
//                 <FormControl sx={{ minWidth: 180 }}>
//                     <Select
//                         value={statusFilter}
//                         onChange={(e) => setStatusFilter(e.target.value)}
//                         displayEmpty
//                     >
//                         {applicationStatuses.map(status => (
//                             <MenuItem key={status} value={status}>
//                                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             </Paper>

//             <Typography variant="h5" component="h2" gutterBottom>
//                 Candidate Pipeline ({filteredApplications.length} candidates)
//             </Typography>

//             {applications.length === 0 ? (
//                 <Typography color="text.secondary">No applicants for this position yet.</Typography>
//             ) : (
//                 <TableContainer component={Paper} variant="outlined">
//                     <Table>
//                         <TableHead>
//                             {/* ... TableHead ... */}
//                         </TableHead>
//                         <TableBody>
//                             {filteredApplications.map(app => (
//                                 <ApplicantRow
//                                     key={app.id} 
//                                     application={app} 
//                                     onStatusChange={handleStatusChange} // Pass handler down
//                                 />
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Box>
//     );
// };
// // ... propTypes
// ApplicantList.propTypes = {
//     jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// };
// export default ApplicantList;


// src/components/admin/ApplicantList.jsx

import { useOutletContext } from 'react-router-dom'; 
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    Box, Typography, CircularProgress, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, InputAdornment, Select, MenuItem, FormControl
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getApplicationsForJob, updateApplicationStatus } from '../../api/apiService';
// import ApplicantRow from './ApplicantRow';
import ReviewPopup from '../shared/ReviewPopup';
import StatefulApplicantRow from './StatefulApplicantRow';

const ApplicantList = ({ jobId }) => {

     const { refreshKey } = useOutletContext();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [reviewPopup, setReviewPopup] = useState({ open: false, title: '', content: '' });

    useEffect(() => {
        if (!jobId) return;
        const fetchApplicants = async () => {
            setLoading(true);
setError(null);
            try {
                // Assuming this endpoint now returns the rich data
                const data = await getApplicationsForJob(jobId);
                setApplications(data || []);
            } catch (err) {
                console.error("Failed to fetch applications:", err);
                setError("Could not load applicants for this job.");
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId,refreshKey]);

    const filteredApplications = useMemo(() => {
        return applications
            .filter(app => statusFilter === 'all' || app.status === statusFilter)
            .filter(app => {
                if (!searchTerm) return true;
                const lowerSearch = searchTerm.toLowerCase();
                return (
                    app.applicant?.full_name?.toLowerCase().includes(lowerSearch) ||
                    app.applicant?.email?.toLowerCase().includes(lowerSearch)
                );
            });
    }, [applications, searchTerm, statusFilter]);

    const handleStatusChange = async (appId, newStatus) => {
        setApplications(prev => prev.map(app =>
            app.id === appId ? { ...app, status: newStatus } : app
        ));
        try {
            await updateApplicationStatus(appId, newStatus);
        } catch (err) {
            setError("Failed to update status. Please refresh.");
        }
    };

    const handleOpenReviewPopup = (applicantName, reviewContent) => {
        setReviewPopup({
            open: true,
            title: `AI Review for ${applicantName}`,
            content: reviewContent,
        });
    };

    const handleCloseReviewPopup = () => {
        setReviewPopup({ open: false, title: '', content: '' });
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;

    const applicationStatuses = ['all', 'applied', 'screening', 'assessment', 'interview_scheduled', 'hired', 'rejected'];

    return (
        <Box>
            <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                />
                <FormControl sx={{ minWidth: 180 }}>
                    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty>
                        {applicationStatuses.map(status => (
                            <MenuItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>

            <Typography variant="h5" component="h2" gutterBottom>
                Candidate Pipeline ({filteredApplications.length} candidates)
            </Typography>

            {applications.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Applicant</TableCell>
                                <TableCell>AI Score</TableCell>
                                <TableCell>AI Review Summary</TableCell>
                                <TableCell>Applied On</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredApplications.map(app => (
                                <StatefulApplicantRow
                                    key={app.id}
                                    application={app}
                                    onStatusChange={handleStatusChange}
                                    onReviewClick={handleOpenReviewPopup}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography color="text.secondary" sx={{mt: 3}}>
                    No applicants match your criteria.
                </Typography>
            )}

            {/*  --- ERROR AREA (VERIFIED) ---
                The syntax for this component call is correct.
                The error was likely a missing closing tag or semicolon before this block.
            */}
            <ReviewPopup
                open={reviewPopup.open}
                onClose={handleCloseReviewPopup}
                title={reviewPopup.title}
                content={reviewPopup.content}
            />
        </Box>
    );
};

ApplicantList.propTypes = {
    jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ApplicantList;