// // src/components/shared/AppHeader.jsx
// import React ,{useContext} from 'react';
// // import { ThemeContext } from '../../context/ThemeContext'; 
// import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// // import { useThemeContext } from '../../context/ThemeContext'; // Assuming this is your theme context
// import { useColorMode } from '../../context/ThemeContext';
// const AppHeader = ({ handleDrawerToggle, title, drawerWidth }) => {
// //   const { mode, toggleColorMode } = useThemeContext();
// const { mode, toggleColorMode } = useColorMode();

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         width: { sm: `calc(100% - ${drawerWidth}px)` },
//         ml: { sm: `${drawerWidth}px` },
//         bgcolor: 'background.paper',
//         color: 'text.primary',
//         boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
//       }}
//       elevation={0}
//     >
//       <Toolbar>
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{ mr: 2, display: { sm: 'none' } }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//           {title}
//         </Typography>
//         <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
//           {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//         </IconButton>
//         {/* We can add the User Menu/Logout button here later */}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AppHeader;


// src/components/shared/AppHeader.jsx
import React from 'react';
import {Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../../context/ThemeContext'; // CORRECTED IMPORT
import { useTheme } from '@mui/material/styles'; // IMPORT useTheme
import UserMenu from './UserMenu';

const AppHeader = ({ handleDrawerToggle, title, drawerWidth }) => {
  const { toggleColorMode } = useColorMode(); // CORRECTED HOOK
  const theme = useTheme(); // Use the theme hook to get the current mode

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {title}
        </Typography>
          {/* --- ADDITIONS --- */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <UserMenu /> {/* <-- ADD THE USER MENU HERE */}
        </Box>

        
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;