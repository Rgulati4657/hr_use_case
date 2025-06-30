// // src/layouts/SuperAdminLayout.jsx
// import React from 'react';
// import { Outlet, useLocation, NavLink } from 'react-router-dom';
// import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import BusinessIcon from '@mui/icons-material/Business'; // Icon for Company Management
// import { useAuth } from '../context/AuthContext'; // We'll need this for the user name

// const drawerWidth = 240;

// const SuperAdminLayout = () => {
//   const { user } = useAuth(); // Get user info to display name

//   const navItems = [
//     { text: 'Company Management', icon: <BusinessIcon />, path: '/superadmin' },
//     // Add more superadmin links here in the future
//   ];

//   const drawerContent = (
//     <div>
//       <Toolbar>
//         <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
//           Simplify Platform
//         </Typography>
//       </Toolbar>
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               component={NavLink}
//               to={item.path}
//               // Style the active link with our brand color
//               sx={{
//                 '&.active': {
//                   backgroundColor: 'rgba(211, 47, 47, 0.1)', // Light red background
//                   borderRight: '4px solid #d32f2f', // Red accent bar
//                   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//                     color: '#d32f2f', // Red icon and text
//                   },
//                 },
//               }}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* Top App Bar */}
//       <AppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#ffffff', color: 'text.primary' }}
//         elevation={1}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//             SuperAdmin Dashboard
//           </Typography>
//           <Typography>Welcome, {user?.name || 'SuperAdmin'}</Typography>
//           {/* We will add a Logout button here later */}
//         </Toolbar>
//       </AppBar>

//       {/* Side Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         <Toolbar />
//         {drawerContent}
//       </Drawer>

//       {/* Main Content Area */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
//         <Toolbar />
//         <Outlet /> {/* This is where the page content will be rendered */}
//       </Box>
//     </Box>
//   );
// };

// export default SuperAdminLayout;
// src/layouts/SuperAdminLayout.jsx 
// // src/layouts/SuperAdminLayout.jsx
// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material';
// import AppHeader from '../components/shared/AppHeader';
// import SideDrawer from '../components/shared/SideDrawer';
// import BusinessIcon from '@mui/icons-material/Business';

// const drawerWidth = 240;

// const SuperAdminLayout = (props) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navItems = [{ text: 'Company Management', icon: <BusinessIcon />, path: '/superadmin' }];
  
//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppHeader handleDrawerToggle={handleDrawerToggle} title="SuperAdmin Dashboard" drawerWidth={drawerWidth} />
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

// export default SuperAdminLayout;




// src/layouts/SuperAdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material';
import AppHeader from '../components/shared/AppHeader';
import SideDrawer from '../components/shared/SideDrawer';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../context/AuthContext';
const drawerWidth = 240;

const SuperAdminLayout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // --- BUG FIX (applied here for consistency) ---
  // We don't have role filtering here, but it's good practice to ensure layouts
  // handle loading states uniformly.
  const { user } = useAuth();
  if (!user) {
    return null; // Or a loading spinner
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [{ text: 'Company Management', icon: <BusinessIcon />, path: '/superadmin' }];
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader handleDrawerToggle={handleDrawerToggle} title="SuperAdmin Dashboard" drawerWidth={drawerWidth} />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}>
          <SideDrawer navItems={navItems} handleDrawerToggle={handleDrawerToggle} isMobile={true} />
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}} open>
          <SideDrawer navItems={navItems} isMobile={false} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;