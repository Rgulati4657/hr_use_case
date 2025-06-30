// // src/components/applicant/FilterSidebar.jsx
// import React from 'react';
// import './FilterSidebar.css'; // We'll create this CSS file next

// const FilterSidebar = () => {
//   return (
//     <div className="filter-sidebar">
//       <div className="filter-group">
//         <input type="text" placeholder="What do you want to do?" className="search-input" />
//       </div>

//       {/* This is a placeholder for an accordion component */}
//       <div className="filter-group">
//         <h3>Locations</h3>
//         {/* In the future, you'll map over your locations here */}
//         <div className="filter-option">
//           <input type="checkbox" id="loc1" />
//           <label htmlFor="loc1">Mountain View, CA</label>
//         </div>
//         <div className="filter-option">
//           <input type="checkbox" id="loc2" />
//           <label htmlFor="loc2">New York, NY</label>
//         </div>
//       </div>
      
//       <div className="filter-group">
//         <h3>Experience</h3>
//         <div className="filter-option">
//           <input type="checkbox" id="exp1" />
//           <label htmlFor="exp1">Mid-Senior Level</label>
//         </div>
//         <div className="filter-option">
//           <input type="checkbox" id="exp2" />
//           <label htmlFor="exp2">Associate</label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

// src/components/applicant/FilterSidebar.jsx


// import React from 'react';
// import './FilterSidebar.css'; // We'll create this CSS file next
// import Accordion from '../shared/Accordion'; 
// const FilterSidebar = ({ onFilterChange }) => {

//       const locations = ['Mountain View, CA', 'New York, NY', 'Remote'];
//   const experiences = ['Mid-Senior Level', 'Associate', 'Senior Level'];

//  return (
//     <div className="filter-sidebar">
//       {/* Search Input (we can wire this up later) */}
//       <div className="filter-group">
//         <input type="text" placeholder="Search by title..." className="search-input" />
//       </div>

//       <Accordion title="Locations">
//         {locations.map(location => (
//           <div className="filter-option" key={location}>
//             <input 
//               type="checkbox" 
//               id={location} 
//               onChange={() => onFilterChange('location', location)} 
//             />
//             <label htmlFor={location}>{location}</label>
//           </div>
//         ))}
//       </Accordion>
      
//       <Accordion title="Experience">
//         {experiences.map(exp => (
//           <div className="filter-option" key={exp}>
//             <input 
//               type="checkbox" 
//               id={exp} 
//               onChange={() => onFilterChange('experience', exp)} 
//             />
//             <label htmlFor={exp}>{exp}</label>
//           </div>
//         ))}
//       </Accordion>
//     </div>
//   );
// };

// export default FilterSidebar;



// src/components/applicant/FilterSidebar.jsx

// import PropTypes from 'prop-types';
// import { 
//     Box, 
//     Paper, 
//     TextField, 
//     InputAdornment,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Typography,
//     FormGroup,
//     FormControlLabel,
//     Checkbox
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // NOTE: In a real app, these options would come from the API
// const locationOptions = ['Mountain View, CA', 'New York, NY', 'Remote'];
// const experienceOptions = ['Mid-Senior Level', 'Associate', 'Senior Level'];

// const FilterSidebar = ({ filters, onFilterChange }) => {
//     return (
//         <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: '24px' }}>
//             <TextField 
//                 fullWidth
//                 placeholder="Search by title..."
//                 variant="outlined"
//                 InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
//                 sx={{ mb: 2 }}
//             />

//             <Accordion defaultExpanded>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography fontWeight="600">Locations</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <FormGroup>
//                         {locationOptions.map(option => (
//                             <FormControlLabel 
//                                 key={option}
//                                 control={
//                                     <Checkbox 
//                                         checked={filters.location.includes(option)}
//                                         onChange={() => onFilterChange('location', option)}
//                                     />
//                                 } 
//                                 label={option} 
//                             />
//                         ))}
//                     </FormGroup>
//                 </AccordionDetails>
//             </Accordion>

//             <Accordion defaultExpanded>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Typography fontWeight="600">Experience</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <FormGroup>
//                         {experienceOptions.map(option => (
//                             <FormControlLabel 
//                                 key={option}
//                                 control={
//                                     <Checkbox 
//                                         checked={filters.experience.includes(option)}
//                                         onChange={() => onFilterChange('experience', option)}
//                                     />
//                                 } 
//                                 label={option} 
//                             />
//                         ))}
//                     </FormGroup>
//                 </AccordionDetails>
//             </Accordion>
//         </Paper>
//     );
// };

// FilterSidebar.propTypes = {
//     filters: PropTypes.object.isRequired,
//     onFilterChange: PropTypes.func.isRequired,
// };

// export default FilterSidebar;

// src/components/applicant/FilterSidebar.jsx

import PropTypes from 'prop-types';
import { 
    Box, Paper, TextField, InputAdornment, Accordion, AccordionSummary,
    AccordionDetails, Typography, FormGroup, FormControlLabel, Checkbox, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const locationOptions = ['Mountain View, CA', 'New York, NY', 'Remote'];
const experienceOptions = ['Mid-Senior Level', 'Associate', 'Senior Level'];

const FilterSidebar = ({ searchTerm, onSearchChange, filters, onFilterChange, onClearFilters }) => {
    const isFiltered = searchTerm || filters.location.length > 0 || filters.experience.length > 0;

    return (
        <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: '24px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Filters</Typography>
                {isFiltered && (
                    <Button size="small" onClick={onClearFilters}>Clear all</Button>
                )}
            </Box>

            <TextField 
                fullWidth
                placeholder="Search by title..."
                variant="outlined"
                value={searchTerm}
                onChange={onSearchChange}
                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
                sx={{ mb: 2 }}
            />
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="600">Locations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {locationOptions.map(option => (
                            <FormControlLabel 
                                key={option}
                                control={
                                    <Checkbox 
                                        checked={filters.location.includes(option)}
                                        onChange={() => onFilterChange('location', option)}
                                    />
                                } 
                                label={option} 
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="600">Experience</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {experienceOptions.map(option => (
                            <FormControlLabel 
                                key={option}
                                control={
                                    <Checkbox 
                                        checked={filters.experience.includes(option)}
                                        onChange={() => onFilterChange('experience', option)}
                                    />
                                } 
                                label={option} 
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

FilterSidebar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
};

export default FilterSidebar;











































// src/components/applicant/FilterSidebar.jsx

// import React from 'react';
// import Accordion from '../shared/Accordion'; // Your custom Accordion component

// // Import the necessary Material-UI components
// import { Box, TextField, InputAdornment, FormControlLabel, Checkbox, Divider } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const FilterSidebar = ({ onFilterChange }) => {
//   const locations = ['Mountain View, CA', 'New York, NY', 'Remote'];
//   const experiences = ['Mid-Senior Level', 'Associate', 'Senior Level'];

//   // This function will handle the text search in the future
//   const handleSearchChange = (event) => {
//     // Implement search logic here if needed
//     // For now, it does nothing
//   };

//   return (
//     // Use a Box component for easy styling with the `sx` prop
//     <Box>
//       {/* 1. Replaced the plain input with a themed TextField */}
//       <Box sx={{ p: 1, mb: 1 }}>
//         <TextField
//           fullWidth
//           size="small"
//           variant="outlined"
//           placeholder="Search by title..."
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* 2. Replaced the plain checkboxes with themed MUI components */}
//       <Accordion title="Locations">
//         {locations.map(location => (
//           <FormControlLabel
//             key={location}
//             sx={{ display: 'block', ml: 1 }} // Style to stack them nicely
//             control={
//               <Checkbox
//                 color="primary" // This will use your theme's primary color
//                 onChange={() => onFilterChange('location', location)}
//               />
//             }
//             label={location}
//           />
//         ))}
//       </Accordion>
      
//       <Divider sx={{ my: 1 }} /> {/* 3. Added a themed divider for spacing */}

//       <Accordion title="Experience">
//         {experiences.map(exp => (
//           <FormControlLabel
//             key={exp}
//             sx={{ display: 'block', ml: 1 }}
//             control={
//               <Checkbox
//                 color="primary"
//                 onChange={() => onFilterChange('experience', exp)}
//               />
//             }
//             label={exp}
//           />
//         ))}
//       </Accordion>
//     </Box>
//   );
// };

// export default FilterSidebar;