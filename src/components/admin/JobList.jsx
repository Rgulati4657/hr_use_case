

// import { useState, useEffect, useMemo } from 'react';
// import { Box, Grid, Typography, Paper, TextField, InputAdornment } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// // Import our working components and API calls
// import { getAllJobs , deleteJobById } from '../../api/apiService.js';
// import SortableJobCard from './SortableJobCard.jsx'; // Make sure this path is correct
// import ConfirmationDialog from '../shared/ConfirmationDialog.jsx';

// // NOTE: This component now takes an onOpenTab function as a prop
// const JobList = ({ onOpenTab, statusFilter = 'all' }) => {
//   const [allJobs, setAllJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [jobToDelete, setJobToDelete] = useState(null); // To track which job to delete

//   useEffect(() => {
//     // ... (Your existing useEffect to fetch jobs) ...
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await getAllJobs();
//         setAllJobs(data);
//       } catch (err) {
//         const MOCK_JOBS = [
//             { id: 1, job_title: 'Senior Backend Engineer (Mock)', status: 'active' },
//             { id: 2, job_title: 'Frontend Developer (React) (Mock)', status: 'active' },
//             { id: 3, job_title: 'Cloud DevOps Engineer (Mock)', status: 'inactive' },
//         ];
//         setError("Could not connect to the backend. Using mock data.");
//         setAllJobs(MOCK_JOBS);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const filteredJobs = useMemo(() => {
//     if (!allJobs) return [];
//     return allJobs
//       .filter(job => statusFilter === 'all' || job.status === statusFilter)
//       .filter(job => job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()));
//   }, [allJobs, statusFilter, searchTerm]);

//   // When a card is clicked, we call the parent's function instead of navigating
//   const handleViewDetails = (job) => {
//     onOpenTab({ id: `view-${job.id}`, label: job.job_title, type: 'view-job', jobId: job.id , closable:true });
//   };

//   const handleEditJob = (job) => {
//     onOpenTab({ id: `edit-${job.id}`, label: `Edit: ${job.job_title}`, type: 'edit-job', jobId: job.id  , closable:true});
//   };

//   const handleDeleteClick = (job) => {
//   setJobToDelete(job); // Open the dialog by setting the target job
// };

// const handleConfirmDelete = async () => {
//   if (!jobToDelete) return;

//   try {
//     await deleteJobById(jobToDelete.id);
//     // Remove the job from the state for an instant UI update
//     setAllJobs(prevJobs => prevJobs.filter(j => j.id !== jobToDelete.id));
//   } catch (err) {
//     // You can set an error state here to show a snackbar if you want
//     console.error("Failed to delete job:", err);
//   } finally {
//     setJobToDelete(null); // Close the dialog
//   }
// };

//   return (
//     <Box>
//         <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
//              <TextField
//                 fullWidth
//                 size="small"
//                 placeholder={`Search ${statusFilter} jobs...`}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
//             />
//         </Paper>
//         <Grid container spacing={3}>
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((job) => (
//                 <Grid item key={job.id} xs={12} sm={6} md={4}>
//                   {/* We now pass the new handlers to the card */}
//                   <SortableJobCard
//                     job={job}
//                     onViewClick={() => handleViewDetails(job)}
//                     onEditClick={() => handleEditJob(job)}
//                      onDeleteClick={() => handleDeleteClick(job)}
//                     // onDeleteClick can be handled here or passed up
//                   />
//                 </Grid>
//               ))
//             ) : (
//               <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
//                 <Typography variant="h6" color="text.secondary">No jobs match.</Typography>
//               </Grid>
//             )}
//         </Grid>
//           <ConfirmationDialog
//     open={!!jobToDelete}
//     onClose={() => setJobToDelete(null)}
//     onConfirm={handleConfirmDelete}
//     title="Confirm Deletion"
//     contentText={`Are you sure you want to permanently delete the job posting for "${jobToDelete?.job_title}"? This action cannot be undone.`}
//   />
//     </Box>
//   );
// };

// export default JobList;


import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import SortableJobCard from './SortableJobCard.jsx';
import JobCard from './JobCard.jsx';
import ConfirmationDialog from '../shared/ConfirmationDialog.jsx';
import { useState } from 'react';
import { deleteJobById } from '../../api/apiService.js';

const JobList = ({ jobs, loading, error, searchTerm, statusFilter, onOpenTab, onStatusChange ,  draggingItemId }) => {
  const [jobToDelete, setJobToDelete] = useState(null);

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs
      .filter(job => statusFilter === 'all' || job.status === statusFilter)
      .filter(job => job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [jobs, statusFilter, searchTerm]);

  const handleViewDetails = (job) => onOpenTab({ id: `view-${job.id}`, label: job.job_title, type: 'view-job', jobId: job.id, closable: true });
  const handleEditJob = (job) => onOpenTab({ id: `edit-${job.id}`, label: `Edit: ${job.job_title}`, type: 'edit-job', jobId: job.id, closable: true });
  const handleDeleteClick = (job) => setJobToDelete(job);

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJobById(jobToDelete.id);
      // The parent component will eventually refetch or you can pass a callback to remove it
      // For now, this will require a refresh to see the change.
      // To make it instant, the parent would need to handle the deletion logic.
      window.location.reload(); // Simple solution for now
    } catch (err) {
      console.error("Failed to delete job:", err);
    } finally {
      setJobToDelete(null);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <SortableContext items={filteredJobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
        <Grid container spacing={3}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Grid item key={job.id} xs={12} sm={6} md={4} lg={3}>
                <JobCard
                  job={job}
                  onViewClick={() => handleViewDetails(job)}
                  onEditClick={() => handleEditJob(job)}
                  onDeleteClick={() => handleDeleteClick(job)}
                  onStatusChange={(newStatus) => onStatusChange(job.id, newStatus)}
                   isDull={draggingItemId && draggingItemId !== job.id}  

                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h6" color="text.secondary">No jobs match your criteria.</Typography>
            </Grid>
          )}
        </Grid>
      </SortableContext>

      <ConfirmationDialog
        open={!!jobToDelete}
        onClose={() => setJobToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        contentText={`Are you sure you want to permanently delete the job posting for "${jobToDelete?.job_title}"? This action cannot be undone.`}
      />
    </Box>
  );
};

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onOpenTab: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
   draggingItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default JobList;