// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider , createTheme} from '@mui/material/styles'; // Import the ThemeProvider
import CssBaseline from '@mui/material/CssBaseline';   // Import CssBaseline
import { Box, AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../context/ThemeContext.jsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import simplifyLogo from '../assets/logo.png'; // Make sure this path to your logo is correct
// import publicTheme from '../styles/publicTheme'; 
// import { useColorMode } from '../context/ThemeContext.jsx';         // <-- CRUCIAL IMPORT
import { getPublicDesignTokens } from '../styles/publicTheme.js'; // <-- Import our new function

const PublicLayout = () => {
  const theme = useTheme();
  const colorMode = useColorMode();
const publicTheme = React.useMemo(
    () => createTheme(getPublicDesignTokens('light')),
    [colorMode.mode],
  );
  return (
     <ThemeProvider theme={publicTheme}>
        <CssBaseline /> 
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <img src={simplifyLogo} alt="Company Logo" style={{ height: '32px', marginRight: '16px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Careers
            </Typography>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Outlet /> {/* This will render PublicJobListPage */}
        </Container>
      </Box>

      {/* Optional Footer */}
      <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: 'background.paper' }}>
         <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Simplify Inc. All rights reserved.
            </Typography>
        </Container>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default PublicLayout;