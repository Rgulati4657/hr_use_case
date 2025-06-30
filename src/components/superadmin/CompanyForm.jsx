// src/components/superadmin/CompanyForm.jsx
import React from 'react';
import { Box, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CompanyForm = ({ handleSubmit, initialData = {} }) => {
  const isEditMode = Boolean(initialData.id);
  
  // Use state for the select input
  const [status, setStatus] = React.useState(initialData.status || 'Active');

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ pt: 1 }}>
      <Stack spacing={2.5}>
        <TextField
          required
          fullWidth
          id="name"
          label="Company Name"
          name="name"
          defaultValue={initialData.name || ''}
          autoFocus
        />
        <TextField
          required
          fullWidth
          id="adminEmail"
          label="Primary Admin Email"
          name="adminEmail"
          type="email"
          defaultValue={initialData.admin || ''}
        />
        {/* Only show status dropdown in edit mode for simplicity */}
        {isEditMode && (
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status"
              name="status"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, py: 1.5, fontSize: '1rem' }}
      >
        {isEditMode ? 'Save Changes' : 'Create Company'}
      </Button>
    </Box>
  );
};

export default CompanyForm;