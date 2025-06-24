// // src/layouts/MainLayout.jsx
// import { Outlet } from 'react-router-dom';
// import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// // Import our custom context hook and icons
// import { useColorMode } from '../context/ThemeContext.jsx';
// import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
// import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon

// const MainLayout = () => {
//   const theme = useTheme();
//   const colorMode = useColorMode();

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             AI HR Dashboard
//           </Typography>

//           <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
//             {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar /> {/* This is a spacer to push content below the fixed AppBar */}
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default MainLayout;

// src/layouts/MainLayout.jsx

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Import our custom context hook and icons
import { useColorMode } from '../context/ThemeContext.jsx';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MainLayout = () => {
  const theme = useTheme();
  const colorMode = useColorMode();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL

  // Define the path for the "Create New JD" page
  const createJobPath = '/admin/jobs/new'; // We will create this route in App.jsx

  const handleCreateNew = () => {
    navigate(createJobPath);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            AI HR Dashboard
          </Typography>

          {/* --- CONDITIONAL "CREATE NEW JD" BUTTON --- */}
          {/* This button will only render if the current path is NOT the create page */}
          {location.pathname !== createJobPath && (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleCreateNew}
              sx={{
                // A nice contrasting style for the button
                backgroundColor: 'white',
                color: 'primary.main',
                mr: 2, // Add some margin to the right
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Create New JD
            </Button>
          )}

          {/* --- THEME TOGGLE BUTTON --- */}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Toolbar /> {/* Spacer to push content below the fixed AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;