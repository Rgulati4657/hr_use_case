// src/components/admin/UserForm.jsx
import React from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';

const UserForm = ({ handleSubmit, initialData = {} }) => {
  const isEditMode = Boolean(initialData.id);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ pt: 1 }}> {/* Add padding top */}
      <Stack spacing={2.5}> {/* Increase spacing */}
        <TextField
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          defaultValue={initialData.name || ''}
          autoFocus
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          defaultValue={initialData.email || ''}
        />
        {!isEditMode && (
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
        )}
      </Stack>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ 
          mt: 3, 
          py: 1.5,
          fontSize: '1rem',
          bgcolor: '#d32f2f', 
          '&:hover': { bgcolor: '#b71c1c' } 
        }}
      >
        {isEditMode ? 'Save Changes' : 'Create User'}
      </Button>
    </Box>
  );
};

export default UserForm;