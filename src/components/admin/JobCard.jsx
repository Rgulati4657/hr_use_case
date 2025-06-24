// import PropTypes from 'prop-types';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { Card, Box, Typography, IconButton, Tooltip, Switch } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// // This is now the one and only card component, with sorting built-in.
// const JobCard = ({ job, onViewClick, onEditClick, onDeleteClick, onStatusChange, isDull }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: job.id });

//   // --- FIX FOR DRAG & DROP VISUALS ---
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition: transition || 'transform 250ms ease-in-out', // Add a smooth transition
//     opacity: isDull ? 0.3 : 1, // Apply the "dull" effect
//     zIndex: isDragging ? 100 : 'auto', // Bring the dragged card to the front
//     height: '100%',
//   };

//   // --- FIX FOR DATE ---
//   let displayDate = 'No date';
//   if (job.created_at) {
//       const date = new Date(job.created_at);
//       if (!isNaN(date)) { // Check if the date is valid
//           displayDate = date.toLocaleDateString();
//       } else {
//           displayDate = 'Invalid Date';
//       }
//   }

//   const is_active = job.status === 'active';

//   const handleSwitchChange = (event) => {
//     onStatusChange(event.target.checked ? 'active' : 'inactive');
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       <Card
//         variant="outlined"
//         sx={{
//           borderRadius: '12px',
//           p: 2,
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.2)' : 'none', // Add shadow when dragging
//         }}
//       >
//         <Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
//             <Typography variant="h6" component="div" fontWeight="600">
//               {job.job_title}
//             </Typography>
//             <Tooltip title={is_active ? "Status: Active" : "Status: Inactive"}>
//               <Switch checked={is_active} onChange={handleSwitchChange} size="small" color="success" />
//             </Tooltip>
//           </Box>
//           <Typography variant="body2" color="text.secondary">
//             Created: {displayDate} | ID: {job.id}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//           {/* Drag Handle */}
//           <Box {...attributes} {...listeners} sx={{ cursor: 'grab', color: 'text.disabled', '&:hover': { color: 'text.primary' } }}>
//             <Tooltip title="Drag to reorder"><DragIndicatorIcon /></Tooltip>
//           </Box>
//           {/* Action Buttons */}
//           <Box>
//             <Tooltip title="View Details"><IconButton size="small" onClick={onViewClick}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
//             <Tooltip title="Edit"><IconButton size="small" onClick={onEditClick}><EditIcon fontSize="small" /></IconButton></Tooltip>
//             <Tooltip title="Delete"><IconButton size="small" onClick={onDeleteClick} sx={{ '&:hover': { color: 'error.main' } }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
//           </Box>
//         </Box>
//       </Card>
//     </div>
//   );
// };

// JobCard.propTypes = {
//   job: PropTypes.object.isRequired,
//   onViewClick: PropTypes.func.isRequired,
//   onEditClick: PropTypes.func.isRequired,
//   onDeleteClick: PropTypes.func.isRequired,
//   onStatusChange: PropTypes.func.isRequired,
//   isDull: PropTypes.bool,
// };

// export default JobCard;

import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Box, Typography, IconButton, Tooltip, Switch } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const JobCard = ({ job, onViewClick, onEditClick, onDeleteClick, onStatusChange, isOverlay = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    disabled: isOverlay, // Disable sortable logic for the overlay clone
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // --- THIS IS THE KEY ---
    // Make the original card invisible when dragging, but keep its space
    opacity: isDragging ? 0 : 1,
    height: '100%',
  };

  const date = new Date(job.created_at);
  const displayDate = !isNaN(date) ? date.toLocaleDateString() : 'Invalid Date';
  const is_active = job.status === 'active';

  const handleSwitchChange = (event) => onStatusChange(event.target.checked ? 'active' : 'inactive');

  const cardContent = (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '12px',
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Add a "lifting" shadow effect. If it's an overlay, it's always "lifted"
        boxShadow: isOverlay ? '0 8px 24px rgba(0,0,0,0.2)' : 'none',
        // Make the overlay clone rotate slightly for a nice effect
        transform: isOverlay ? 'rotate(2deg)' : 'none',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" fontWeight="600">{job.job_title}</Typography>
          <Tooltip title={is_active ? "Status: Active" : "Status: Inactive"}>
            <Switch checked={is_active} onChange={handleSwitchChange} size="small" color="success" />
          </Tooltip>
        </Box>
        <Typography variant="body2" color="text.secondary">Created: {displayDate} | ID: {job.id}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box {...attributes} {...listeners} sx={{ cursor: 'grab', color: 'text.disabled', '&:hover': { color: 'text.primary' } }}>
          <Tooltip title="Drag to reorder"><DragIndicatorIcon /></Tooltip>
        </Box>
        <Box>
          <Tooltip title="View Details"><IconButton size="small" onClick={onViewClick}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton size="small" onClick={onEditClick}><EditIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton size="small" onClick={onDeleteClick} sx={{ '&:hover': { color: 'error.main' } }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
        </Box>
      </Box>
    </Card>
  );

  return isOverlay ? cardContent : <div ref={setNodeRef} style={style}>{cardContent}</div>;
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  onViewClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onStatusChange: PropTypes.func,
  isOverlay: PropTypes.bool,
};

export default JobCard;