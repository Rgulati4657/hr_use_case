// // src/layouts/DashboardLayout.jsx

// import { useState } from 'react';
// import { Link as RouterLink, useLocation, Outlet } from 'react-router-dom';
// import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, CssBaseline, Divider } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// // Import all necessary icons and context hooks
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import WorkIcon from '@mui/icons-material/Work';
// import PeopleIcon from '@mui/icons-material/People'; 
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useColorMode } from '../context/ThemeContext.jsx';
// import simplifyLogo from '../assets/logo.png';
// import { useAuth } from '../context/AuthContext'; 
// const drawerWidth = 240;

// const navItems = [
//   { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
//   { text: 'Job Management', icon: <WorkIcon />, path: '/admin/jobs' },
// ];

// // DrawerContent component for cleanliness
// const DrawerContent = ({ handleDrawerToggle }) => {
//    const { user } = useAuth(); 
//   const location = useLocation();
//   const baseNavItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', roles: ['admin', 'hr'] },
//     { text: 'Job Management', icon: <WorkIcon />, path: '/admin/jobs', roles: ['admin', 'hr'] },
//   ];

//   const adminNavItems = [
//     { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users', roles: ['admin'] },
//   ];

//   // Filter the navigation items based on the user's role
//   const navItems = [...baseNavItems, ...adminNavItems].filter(item => 
//     item.roles.includes(user?.role)
//   );

//   return (
//     <div>
//       {/* LOGO AND CLOSE BUTTON AREA */}
//       <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '0 8px !important' }}>
//         <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
//           <img src={simplifyLogo} alt="Simplify Logo" style={{ width:'100%', height: 'auto' }} />
//         </Box>
//         <IconButton
//           onClick={handleDrawerToggle}
//           sx={{ display: { sm: 'none' } }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </Toolbar>
//       <Divider />

//       {/* NAVIGATION LIST */}
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               component={RouterLink}
//               to={item.path}
//               selected={location.pathname === item.path}
//               onClick={handleDrawerToggle}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// // Main Layout Component
// const DashboardLayout = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const theme = useTheme();
//   const colorMode = useColorMode();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             AI HR Dashboard
//           </Typography>

//           {/* THEME TOGGLE BUTTON */}
//           <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
//             {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           <DrawerContent handleDrawerToggle={handleDrawerToggle} />
//         </Drawer>

//         {/* Desktop Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           <DrawerContent handleDrawerToggle={() => {}} />
//         </Drawer>
//       </Box>

//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
//       >
//         <Toolbar /> {/* This spacer is important! */}
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;


// src/layouts/DashboardLayout.jsx




// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import {Toolbar, Box, Drawer, CssBaseline } from '@mui/material';
// import AppHeader from '../components/shared/AppHeader';
// import SideDrawer from '../components/shared/SideDrawer';
// import { useAuth } from '../context/AuthContext';

// // Icons
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import WorkIcon from '@mui/icons-material/Work';
// import PeopleIcon from '@mui/icons-material/People';

// const drawerWidth = 240;

// const DashboardLayout = (props) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { user } = useAuth();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const baseNavItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', roles: ['admin', 'hr'] },
//     { text: 'Job Management', icon: <WorkIcon />, path: '/admin/jobs', roles: ['admin', 'hr'] },
//   ];
//   const adminNavItems = [
//     { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users', roles: ['admin'] },
//   ];
//   const navItems = [...baseNavItems, ...adminNavItems].filter(item => item.roles.includes(user?.role));

//   const drawer = <SideDrawer navItems={navItems} />;

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppHeader handleDrawerToggle={handleDrawerToggle} title="Admin Dashboard" drawerWidth={drawerWidth} />
//       <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
//         <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}>
//           {drawer}
//         </Drawer>
//         <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}} open>
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

// src/layouts/DashboardLayout.jsx

// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material'; // Added Toolbar
// import AppHeader from '../components/shared/AppHeader';
// import SideDrawer from '../components/shared/SideDrawer';
// import { useAuth } from '../context/AuthContext';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import WorkIcon from '@mui/icons-material/Work';
// import PeopleIcon from '@mui/icons-material/People';

// const drawerWidth = 240;

// const DashboardLayout = (props) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { user } = useAuth();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navItems = [
//      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
//   { text: 'Job Management', icon: <WorkIcon />, path: '/admin/jobs' },
//  /* ... your nav items array ... */ ].filter(item => item.roles.includes(user?.role));
  
//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppHeader handleDrawerToggle={handleDrawerToggle} title="Admin Dashboard" drawerWidth={drawerWidth} />
//       <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
//         <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}>
//           {/* Mobile Drawer */}
//           <SideDrawer navItems={navItems} handleDrawerToggle={handleDrawerToggle} isMobile={true} />
//         </Drawer>
//         <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}} open>
//           {/* Desktop Drawer */}
//           <SideDrawer navItems={navItems} />
//         </Drawer>
//       </Box>
//       <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

// src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, CssBaseline, Toolbar, CircularProgress } from '@mui/material';
import AppHeader from '../components/shared/AppHeader';
import SideDrawer from '../components/shared/SideDrawer';
import { useAuth } from '../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const drawerWidth = 240;

const DashboardLayout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();


    const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  // --- BUG FIX ---
  // If the user object isn't loaded yet, show a loading spinner or nothing at all.
  // This prevents the '.filter' from crashing.
  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const baseNavItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', roles: ['admin', 'hr'] },
    { text: 'Job Management', icon: <WorkIcon />, path: '/admin/jobs', roles: ['admin', 'hr'] },
     { text: 'Applicant Management', icon: <SupervisedUserCircleIcon />, path: '/admin/applicants', roles: ['admin', 'hr'] },
  ];
  const adminNavItems = [
    { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users', roles: ['admin'] },
  ];
  const navItems = [...baseNavItems, ...adminNavItems].filter(item => item.roles.includes(user.role));
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader handleDrawerToggle={handleDrawerToggle} title="Admin Dashboard" drawerWidth={drawerWidth} />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}>
          <SideDrawer navItems={navItems} handleDrawerToggle={handleDrawerToggle} isMobile={true} onRefreshClick={handleRefresh} />
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}} open>
          <SideDrawer navItems={navItems} isMobile={false} onRefreshClick={handleRefresh}/>
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet context={{ refreshKey }} />
      </Box>
    </Box>
  );
};

export default DashboardLayout;