// src/pages/applicant/LoginPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Divider, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import simplifyLogo from '../../assets/logo.png'; 

const LoginPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <img src={simplifyLogo} alt="Simplify Logo" style={{ width: '60px', marginBottom: '1rem' }} />
        <Typography component="h1" variant="h5" fontWeight="bold">
          Welcome Back!
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Sign in to continue your journey with Simplify.
        </Typography>
      </Box>

      {/* <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{ mb: 2, textTransform: 'none', color: 'text.primary', borderColor: 'grey.400' }}
      >
        Sign in with Google
      </Button> */}

      <Divider sx={{ my: 2 }}></Divider>

      <Box component="form" noValidate>
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
        <Divider sx={{ my: 2 }}></Divider>
        <Button
          type="submit" fullWidth variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
        >
          Sign In
        </Button>
        <Typography variant="body2" textAlign="center">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/signup" fontWeight="bold">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
