
// import PropTypes from 'prop-types';
// import { TableRow, TableCell, Link, Select, MenuItem, Button } from '@mui/material';

// const ApplicantRow = ({ application, onStatusChange }) => {
//     const { id, applicant, status, applied_at } = application;

//     const allStatuses = ['applied', 'screening', 'assessment', 'interview_scheduled', 'hired', 'rejected'];

//     return (
//         <TableRow hover>
//             <TableCell>
//                 <Link component="button" variant="body2">{applicant?.full_name || 'N/A'}</Link>
//             </TableCell>
//             <TableCell>{applicant?.email || 'N/A'}</TableCell>
//             <TableCell>{new Date(applied_at).toLocaleDateString()}</TableCell>
//             <TableCell>
//                 {/* --- CHANGED: Status is now an editable Select component --- */}
//                 <Select
//                     value={status || 'applied'}
//                     onChange={(e) => onStatusChange(id, e.target.value)}
//                     size="small"
//                     sx={{ minWidth: 140 }}
//                     // Stop the row's hover effect from triggering when clicking the select
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     {allStatuses.map(s => (
//                         <MenuItem key={s} value={s}>
//                             {s.charAt(0).toUpperCase() + s.slice(1)}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </TableCell>
//             <TableCell align="right">
//                 <Button variant="outlined" size="small">View Resume</Button>
//             </TableCell>
//         </TableRow>
//     );
// };

// ApplicantRow.propTypes = {
//     application: PropTypes.object.isRequired,
//     onStatusChange: PropTypes.func.isRequired, // New prop
// };

// export default ApplicantRow;

// // src/components/admin/ApplicantRow.jsx
// import PropTypes from 'prop-types';
// import { TableRow, TableCell, Link, Select, MenuItem, Button, Typography } from '@mui/material';

// const ApplicantRow = ({ application, onStatusChange }) => {
//     // Destructure with safety checks using optional chaining (?.)
//     const { id, applicant, status, applied_at } = application;

//     const allStatuses = ['applied', 'screening', 'assessment', 'interview_scheduled', 'hired', 'rejected'];

//     // --- FIX 1: Check if the applicant object exists before trying to access its properties ---
//     const applicantName = applicant?.full_name;
//     const applicantEmail = applicant?.email;
//     const resumeUrl = applicant?.resume_gcs_uri;

//     return (
//         <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//             <TableCell>
//                 {applicantName ? (
//                     <Link component="button" variant="body2">{applicantName}</Link>
//                 ) : (
//                     <Typography variant="body2" color="error">N/A</Typography>
//                 )}
//             </TableCell>
//             <TableCell>
//                 {applicantEmail || <Typography variant="body2" color="error">N/A</Typography>}
//             </TableCell>
//             <TableCell>
//                 {new Date(applied_at).toLocaleDateString()}
//             </TableCell>
//             <TableCell>
//                 <Select
//                     value={status || 'applied'}
//                     onChange={(e) => onStatusChange(id, e.target.value)}
//                     size="small"
//                     sx={{ minWidth: 140 }}
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     {allStatuses.map(s => (
//                         <MenuItem key={s} value={s}>
//                             {s.charAt(0).toUpperCase() + s.slice(1)}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </TableCell>
//             <TableCell align="right">
//                 {/* --- FIX 2: The "View Resume" button is now a link that opens in a new tab --- */}
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     component="a" // Makes the button behave like an anchor tag
//                     href={resumeUrl}
//                     target="_blank" // Opens the link in a new tab
//                     rel="noopener noreferrer" // Security best practice for target="_blank"
//                     disabled={!resumeUrl} // The button is disabled if there's no resume URL
//                     sx={{
//                         // Match the style from your screenshot
//                         borderColor: 'error.main',
//                         color: 'error.main',
//                         '&:hover': {
//                             borderColor: 'error.dark',
//                             backgroundColor: 'error.light',
//                         }
//                     }}
//                 >
//                     View Resume
//                 </Button>
//             </TableCell>
//         </TableRow>
//     );
// };

// ApplicantRow.propTypes = {
//     application: PropTypes.object.isRequired,
//     onStatusChange: PropTypes.func.isRequired,
// };

// export default ApplicantRow;


// src/components/admin/ApplicantRow.jsx
import PropTypes from 'prop-types';
import { TableRow, TableCell, Link, Select, MenuItem, Button, Typography, Box, Chip } from '@mui/material';

const ApplicantRow = ({ application, onStatusChange, onReviewClick }) => {
  // Destructure with optional chaining for safety.
  // This assumes the new, rich data structure.
  const { id, applicant, status, applied_at, resume_score, resume_review_summary } = application;

  const allStatuses = ['applied', 'screening', 'assessment', 'interview_scheduled', 'hired', 'rejected'];

  const applicantName = applicant?.full_name;
  const resumeUrl = applicant?.resume_gcs_uri;

  // Function to truncate the review summary
  const truncateText = (text, length = 100) => {
    if (!text) return 'No review yet.';
    if (text.length <= length) return text;
    return text.substring(0, length) + '... (click to read more)';
  };

  return (
    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Link component="button" variant="body2" sx={{fontWeight: '500'}}>{applicantName || 'N/A'}</Link>
        <Typography variant="caption" display="block">{applicant?.email || 'N/A'}</Typography>
      </TableCell>
      <TableCell>
        <Chip 
          label={resume_score ? `${Math.round(resume_score * 100)}%` : 'N/A'}
          color={resume_score > 0.8 ? 'success' : resume_score > 0.6 ? 'warning' : 'default'} 
          size="small"
        />
      </TableCell>
      <TableCell
        onClick={() => onReviewClick(applicantName, resume_review_summary)}
        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
      >
        <Typography variant="body2" color="text.secondary">
          {truncateText(resume_review_summary)}
        </Typography>
      </TableCell>
      <TableCell>{new Date(applied_at).toLocaleDateString()}</TableCell>
      <TableCell>
        <Select value={status} onChange={(e) => onStatusChange(id, e.target.value)} size="small" sx={{ minWidth: 140 }}>
          {allStatuses.map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
        </Select>
      </TableCell>
      <TableCell align="right">
        <Button component="a" href={resumeUrl} target="_blank" disabled={!resumeUrl} variant="outlined" size="small">
          View Resume
        </Button>
      </TableCell>
    </TableRow>
  );
};

ApplicantRow.propTypes = {
  application: PropTypes.object.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onReviewClick: PropTypes.func.isRequired, // New prop for the popup
};

export default ApplicantRow;