// // src/layouts/SuperAdminDashboard.jsx
// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { Box, AppBar, Toolbar, Typography, Button, Paper } from '@mui/material';
// import { useAuth } from '../context/AuthContext';

// const SuperAdminDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'grey.100' }}>
//       <AppBar position="static" color="error">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Simplify - SuperAdmin Portal
//           </Typography>
//           <Typography sx={{ mr: 2 }}>
//             Welcome, {user?.name || 'SuperAdmin'}!
//           </Typography>
//           <Button color="inherit" onClick={logout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         {/* The child route (e.g., CompanyManagementPage) will be rendered here */}
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default SuperAdminDashboard;

import React from 'react';
import { Outlet } from 'react-router-dom';

const SuperAdminDashboard = () => {
  return (
    <div>
      <h1>SuperAdmin Dashboard</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminDashboard;