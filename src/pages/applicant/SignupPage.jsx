// src/pages/applicant/SignupPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Divider, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import simplifyLogo from '../../assets/logo.png'; 

const SignupPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <img src={simplifyLogo} alt="Simplify Logo" style={{ width: '60px', marginBottom: '1rem' }} />
        <Typography component="h1" variant="h5" fontWeight="bold">
          Create an Account
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Join us and find your dream job today.
        </Typography>
      </Box>

      {/* <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{ mb: 2, textTransform: 'none', color: 'text.primary', borderColor: 'grey.400' }}
      >
        Sign up with Google
      </Button> */}

      <Divider sx={{ my: 2 }}></Divider>

      <Box component="form" noValidate>
        <TextField margin="normal" required fullWidth id="fullName" label="Full Name" name="fullName" autoComplete="name" />
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
        <Divider sx={{ my: 2 }}></Divider>
        <Button
          type="submit" fullWidth variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
        >
          Create Account
        </Button>
        <Typography variant="body2" textAlign="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" fontWeight="bold">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;