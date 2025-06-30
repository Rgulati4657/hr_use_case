// // src/components/applicant/PublicJobCard.jsx

// import PropTypes from 'prop-types';
// import { Card, Box, Typography, Button, Stack, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import BusinessIcon from '@mui/icons-material/Business';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// const PublicJobCard = ({ job }) => {
//     const navigate = useNavigate();

//     const handleViewDetails = () => {
//         // Navigate to the detail page for this specific job
//         navigate(`/jobs/${job.id}`);
//     };

//     // Safely get the first few qualifications for a preview.
//     // This will work perfectly once the backend sends jd_content.
//     const qualificationsPreview = job.jd_content?.required_qualifications?.slice(0, 3) || [];

//     return (
//         <Card 
//             variant="outlined" 
//             sx={{ 
//                 p: 3, 
//                 transition: 'box-shadow 0.3s',
//                 '&:hover': {
//                     boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
//                 },
//             }}
//         >
//             <Typography variant="h5" component="h2" fontWeight="600">
//                 {job.job_title}
//             </Typography>

//             {/* Metadata Section with placeholders */}
//             <Stack direction="row" spacing={2} sx={{ my: 2 }} alignItems="center">
//                 <Chip icon={<BusinessIcon />} label="Simplify Inc." variant="outlined" size="small" />
//                 <Chip icon={<LocationOnIcon />} label="Remote" variant="outlined" size="small" />
//                 <Chip icon={<BarChartIcon />} label="Mid-Senior Level" variant="outlined" size="small" />
//             </Stack>

//             {/* Qualifications Preview Section */}
//             {qualificationsPreview.length > 0 && (
//                 <Box sx={{ my: 2 }}>
//                     <Typography variant="subtitle1" fontWeight="500">
//                         Minimum qualifications
//                     </Typography>
//                     <List dense sx={{ pl: 1 }}>
//                         {qualificationsPreview.map((item, index) => (
//                             <ListItem key={index} disableGutters sx={{ py: 0.25 }}>
//                                 <ListItemIcon sx={{ minWidth: '20px' }}>
//                                     <FiberManualRecordIcon sx={{ fontSize: '8px' }} />
//                                 </ListItemIcon>
//                                 <ListItemText primary={item} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//             )}

//             <Box sx={{ mt: 2 }}>
//                 <Button 
//                     variant="outlined" 
//                     onClick={handleViewDetails}
//                 >
//                     Learn more
//                 </Button>
//             </Box>
//         </Card>
//     );
// };

// PublicJobCard.propTypes = {
//     job: PropTypes.object.isRequired,
// };

// export default PublicJobCard;


// // src/components/applicant/PublicJobCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './PublicJobCard.css'; // Import the new CSS

// // Assuming you have a company icon. If not, you can remove it.
// import CompanyIcon from '../../assets/logo-icon.svg'; 

// const PublicJobCard = ({ job }) => {
//   return (
//     <div className="job-card">
//       <div className="card-header">
//         <h3 className="job-title">{job.title}</h3>
//         {/* Icons for share/bookmark can be added here later */}
//       </div>
      
//       <div className="card-details">
//         <span className="detail-item">
//             <img src={CompanyIcon} alt="company" className="detail-icon" /> Simplify Inc.
//         </span>
//         <span className="detail-item">{job.location}</span>
//         <span className="detail-item">{job.experience}</span>
//       </div>
      
//       {/* You can optionally add "Minimum qualifications" here */}

//       <div className="card-footer">
//         <Link to={`/jobs/${job.id}`} className="learn-more-btn">
//           Learn more
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PublicJobCard;

// src/components/applicant/PublicJobCard.jsx











// temporary code fix 
// src/pages/applicant/PublicJobListPage.jsx
// src/components/applicant/PublicJobCard.jsx

import PropTypes from 'prop-types';
import { Card, Box, Typography, Button, Stack, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BarChartIcon from '@mui/icons-material/BarChart';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PublicJobCard = ({ job }) => {
    const navigate = useNavigate();

    // This component is "dumb". It does not fetch data.
    // It only receives the 'job' object and displays it.

    const handleViewDetails = () => {
        navigate(`/jobs/${job.id}`);
    };

    // Safely get the first 3 qualifications for a preview.
    // The 'job.jd_content' object is provided by the parent component.
    const qualificationsPreview = job.jd_content?.required_qualifications?.slice(0, 3) || [];

    return (
        <Card 
            variant="outlined" 
            sx={{ 
                p: { xs: 2, md: 3 }, // Add some responsive padding
                transition: 'box-shadow 0.3s',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
                },
                // Add a marginBottom to be handled by the parent Stack component
            }}
        >
            <Typography variant="h5" component="h2" fontWeight="600">
                {job.job_title}
            </Typography>

            {/* Metadata Section - using placeholders for now */}
            <Stack direction="row" spacing={2} sx={{ my: 2 }} alignItems="center">
                <Chip icon={<BusinessIcon />} label="Simplify Inc." variant="outlined" size="small" />
                <Chip icon={<LocationOnIcon />} label="Remote" variant="outlined" size="small" />
                <Chip icon={<BarChartIcon />} label="Mid-Senior Level" variant="outlined" size="small" />
            </Stack>

            {/* Qualifications Preview Section */}
            {qualificationsPreview.length > 0 && (
                <Box sx={{ my: 2 }}>
                    <Typography variant="subtitle1" fontWeight="500">
                        Minimum qualifications
                    </Typography>
                    <List dense sx={{ pl: 1 }}>
                        {qualificationsPreview.map((item, index) => (
                            <ListItem key={index} disableGutters sx={{ py: 0.25 }}>
                                <ListItemIcon sx={{ minWidth: '20px' }}>
                                    <FiberManualRecordIcon sx={{ fontSize: '8px', color: 'text.secondary' }} />
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                <Button 
                    variant="outlined" 
                    onClick={handleViewDetails}
                >
                    Learn more
                </Button>
            </Box>
        </Card>
    );
};

PublicJobCard.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.number.isRequired,
        job_title: PropTypes.string.isRequired,
        jd_content: PropTypes.shape({
            required_qualifications: PropTypes.arrayOf(PropTypes.string),
        }),
    }).isRequired,
};

export default PublicJobCard;














// will use in future 
// import { Box, Typography, Link as MuiLink, Button } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// const PublicJobCard = ({ job }) => {
//   return (
//     <Box 
//       sx={{
//         p: 3,
//         mb: 2,
//         bgcolor: 'background.paper', // USES THE NEW #1E1E1E COLOR
//         border: '1px solid',
//         borderColor: 'divider', // USES THE NEW SUBTLE DIVIDER COLOR
//         borderRadius: 2,
//         transition: 'border-color 0.3s ease',
//         '&:hover': {
//           borderColor: 'primary.main', // Highlight with blue on hover
//         }
//       }}
//     >
//       <MuiLink component={RouterLink} to={`/jobs/${job.id}`} variant="h5" fontWeight="bold" underline="hover" color="primary">
//         {job.title}
//       </MuiLink>
//       <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
//         Simplify Inc.  •  {job.location}  •  {job.experience}
//       </Typography>
//       <Button component={RouterLink} to={`/jobs/${job.id}`} variant="outlined" color="primary" sx={{ mt: 1 }}>
//         Learn more
//       </Button>
//     </Box>
//   );
// };

// export default PublicJobCard;