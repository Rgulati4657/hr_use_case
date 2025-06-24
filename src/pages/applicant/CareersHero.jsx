// src/components/applicant/CareersHero.jsx
import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CareersHero = ({ onSearch }) => {
  return (
    <Box 
      sx={{ 
        p: 6, 
        bgcolor: 'grey.200', // A light grey background
        textAlign: 'center',
        borderBottom: '1px solid',
        borderColor: 'grey.300'
      }}
    >
      <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
        Find your future with us
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Search for your next opportunity at Simplify Inc.
      </Typography>
      <Box 
        component="form" 
        onSubmit={(e) => { e.preventDefault(); onSearch(e.target.elements.search.value); }}
        sx={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <TextField
          name="search"
          fullWidth
          variant="outlined"
          placeholder="Search by job title, keyword, or team"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: '50px', bgcolor: 'background.paper' } // Rounded and white
          }}
        />
      </Box>
    </Box>
  );
};

export default CareersHero;