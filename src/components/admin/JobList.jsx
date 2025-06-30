
// import { useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// // import SortableJobCard from './SortableJobCard.jsx';
// import JobCard from './JobCard.jsx';
// import ConfirmationDialog from '../shared/ConfirmationDialog.jsx';
// import { useState } from 'react';
// import { deleteJobById } from '../../api/apiService.js';

// const JobList = ({ jobs, loading, error, searchTerm, statusFilter, onOpenTab, onStatusChange ,  draggingItemId }) => {
//   const [jobToDelete, setJobToDelete] = useState(null);

//   const filteredJobs = useMemo(() => {
//     if (!jobs) return [];
//     return jobs
//       .filter(job => statusFilter === 'all' || job.status === statusFilter)
//       .filter(job => job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()));
//   }, [jobs, statusFilter, searchTerm]);

//   const handleViewDetails = (job) => onOpenTab({ id: `view-${job.id}`, label: job.job_title, type: 'view-job', jobId: job.id, closable: true });
//   const handleEditJob = (job) => onOpenTab({ id: `edit-${job.id}`, label: `Edit: ${job.job_title}`, type: 'edit-job', jobId: job.id, closable: true });
//   const handleDeleteClick = (job) => setJobToDelete(job);

//   const handleConfirmDelete = async () => {
//     if (!jobToDelete) return;
//     try {
//       await deleteJobById(jobToDelete.id);
//       // The parent component will eventually refetch or you can pass a callback to remove it
//       // For now, this will require a refresh to see the change.
//       // To make it instant, the parent would need to handle the deletion logic.
//       window.location.reload(); // Simple solution for now
//     } catch (err) {
//       console.error("Failed to delete job:", err);
//     } finally {
//       setJobToDelete(null);
//     }
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box>
//       <SortableContext items={filteredJobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
//         <Grid container spacing={3}>
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <Grid item key={job.id} xs={12} sm={6} md={4} lg={3}>
//                 <JobCard
//                   job={job}
//                   onViewClick={() => handleViewDetails(job)}
//                   onEditClick={() => handleEditJob(job)}
//                   onDeleteClick={() => handleDeleteClick(job)}
//                   onStatusChange={(newStatus) => onStatusChange(job.id, newStatus)}
//                    isDull={draggingItemId && draggingItemId !== job.id}  

//                 />
//               </Grid>
//             ))
//           ) : (
//             <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
//               <Typography variant="h6" color="text.secondary">No jobs match your criteria.</Typography>
//             </Grid>
//           )}
//         </Grid>
//       </SortableContext>

//       <ConfirmationDialog
//         open={!!jobToDelete}
//         onClose={() => setJobToDelete(null)}
//         onConfirm={handleConfirmDelete}
//         title="Confirm Deletion"
//         contentText={`Are you sure you want to permanently delete the job posting for "${jobToDelete?.job_title}"? This action cannot be undone.`}
//       />
//     </Box>
//   );
// };

// JobList.propTypes = {
//   jobs: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string,
//   searchTerm: PropTypes.string.isRequired,
//   statusFilter: PropTypes.string.isRequired,
//   onOpenTab: PropTypes.func.isRequired,
//   onStatusChange: PropTypes.func.isRequired,
//    draggingItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };

// export default JobList;


// src/components/admin/JobList.jsx

import PropTypes from 'prop-types';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import JobCard from './JobCard.jsx';

// --- CHANGED: Simplified props. No more searchTerm, statusFilter, or error. ---
// --- It now receives the onDeleteJob function from the parent. ---
const JobList = ({ jobs, loading, onOpenTab, onStatusChange, onDeleteJob }) => {

  // --- REMOVED: All filtering logic (useMemo) is gone. The parent handles it. ---
  // --- REMOVED: All deletion state (jobToDelete) and dialog logic is gone. ---

  const handleViewDetails = (job) => {
    onOpenTab({ id: `view-${job.id}`, label: job.job_title, type: 'view-job', jobId: job.id, closable: true });
  };

  const handleEditJob = (job) => {
    onOpenTab({ id: `edit-${job.id}`, label: `Edit: ${job.job_title}`, type: 'edit-job', jobId: job.id, closable: true });
  };

  // --- The loading check is still important ---
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
  }

  // --- REMOVED: The error alert is gone. The parent handles displaying errors globally. ---

  return (
    <Box>
      <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
        <Grid container spacing={3}>
          {jobs.length > 0 ? (
            // --- CHANGED: We now map over the 'jobs' prop directly, as it's pre-filtered ---
            jobs.map((job) => (
              <Grid item key={job.id} xs={12} sm={6} md={4} lg={3}>
                <JobCard
                  job={job}
                  onViewClick={() => handleViewDetails(job)}
                  onEditClick={() => handleEditJob(job)}
                  // --- CHANGED: onDeleteClick now directly calls the prop from the parent ---
                  onDeleteClick={() => onDeleteJob(job.id)}
                  onStatusChange={(newStatus) => onStatusChange(job.id, newStatus)}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No jobs found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </SortableContext>
      
      {/* --- REMOVED: The ConfirmationDialog is no longer needed here. --- */}
    </Box>
  );
};

// --- CHANGED: Updated PropTypes to match the new, simpler component ---
JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onOpenTab: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onDeleteJob: PropTypes.func.isRequired, // New required prop
};

export default JobList;