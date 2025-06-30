// // src/components/shared/SideDrawer.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Box, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
// import simplifyLogo from '../../assets/logo.png';

// // --- NEW ---
// // We now accept 'handleDrawerToggle' and a flag 'isMobile'
// const SideDrawer = ({ navItems, handleDrawerToggle, isMobile }) => {
//   return (
//     <div>
//       <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
//         {/* --- LOGIC CHANGE --- */}
//         {/* If it's mobile view, show a close button. Otherwise, show the logo and title. */}
//         {isMobile ? (
//           <>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
//               Menu
//             </Typography>
//             <IconButton onClick={handleDrawerToggle}>
//               <CloseIcon />
//             </IconButton>
//           </>
//         ) : (
//           <>
//             <img src={simplifyLogo} alt="Simplify Logo" style={{ height: '40px', marginRight: '12px' }}/>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//               Simplify
//             </Typography>
//           </>
//         )}
//       </Toolbar>
//       <Divider />
//       <List>
//         {/* The rest of the component remains the same */}
//         {navItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               component={NavLink}
//               to={item.path}
//               onClick={isMobile ? handleDrawerToggle : null} // Close drawer on link click in mobile
//               sx={{
//                 '&.active': {
//                   backgroundColor: 'rgba(211, 47, 47, 0.08)',
//                   borderRight: '4px solid #d32f2f',
//                   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//                     color: '#d32f2f',
//                     fontWeight: '500',
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
// };

// export default SideDrawer;



import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Box, Toolbar, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider, Typography, IconButton, Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import simplifyLogo from '../../assets/logo.png';

const SideDrawer = ({ navItems, handleDrawerToggle, isMobile, onRefreshClick }) => {
  // This is the main content of the drawer, which we'll call 'drawerContent'.
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 1, sm: 2 } }}>
        {isMobile ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <img src={simplifyLogo} alt="Simplify Logo" style={{ height: '40px', marginRight: '12px', borderRadius: '50%'}}/>
          </>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                '&.active': {
                  bgcolor: (theme) => `${theme.palette.primary.main}14`,
                  borderRight: (theme) => `4px solid ${theme.palette.primary.main}`,
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'primary.main',
                    fontWeight: '500',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {/* Refresh Button at the bottom */}
      <Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Tooltip title="Refresh Page Data" placement="right">
              <ListItemButton onClick={onRefreshClick}>
                <ListItemIcon>
                  <RefreshIcon />
                </ListItemIcon>
                <ListItemText primary="Refresh" />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  // The return statement is simple: just return the content.
  // The error was caused by having an extra opening <div> here.
  return drawerContent;
};

SideDrawer.propTypes = {
  navItems: PropTypes.array.isRequired,
  handleDrawerToggle: PropTypes.func,
  isMobile: PropTypes.bool,
  onRefreshClick: PropTypes.func.isRequired,
};

export default SideDrawer;


// // src/components/shared/SideDrawer.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Box, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import simplifyLogo from '../../assets/logo.png';
// import RefreshIcon from '@mui/icons-material/Refresh';

// const SideDrawer = ({ navItems, handleDrawerToggle, isMobile ,onRefreshClick}) => {
//   return (
//     <div>
//       <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 1, sm: 2 } }}>
//         {isMobile ? (
//           <>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
//               Menu
//             </Typography>
//             <IconButton onClick={handleDrawerToggle}>
//               <CloseIcon />
//             </IconButton>
//           </>
//         ) : (
//           <>
//             <img src={simplifyLogo} alt="Simplify Logo" style={{ height: '40px', marginRight: '12px', borderRadius: '50%'}}/>
//             {/* <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
//               Simplify
//             </Typography> */}
//           </>
//         )}
//       </Toolbar>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               component={NavLink}
//               to={item.path}
//               onClick={isMobile ? handleDrawerToggle : undefined} // Close on click for mobile
//               sx={{
//                 '&.active': {
//                   bgcolor: (theme) => `${theme.palette.primary.main}14`, // primary color with ~8% opacity
//                   borderRight: (theme) => `4px solid ${theme.palette.primary.main}`,
//                   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//                     color: 'primary.main',
//                     fontWeight: '500',
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

//        {/* --- 3. ADD THE REFRESH BUTTON AT THE BOTTOM --- */}
//       <Box>
//         <Divider />
//         <List>
//           <ListItem disablePadding>
//             <Tooltip title="Refresh Page Data" placement="right">
//               <ListItemButton onClick={onRefreshClick}>
//                 <ListItemIcon>
//                   <RefreshIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Refresh" />
//               </ListItemButton>
//             </Tooltip>
//           </ListItem>
//         </List>
//       </Box>
//     </Box>
//   );
// };

// // --- 4. ADD THE PROP TYPE ---
// SideDrawer.propTypes = {
//   navItems: PropTypes.array.isRequired,
//   handleDrawerToggle: PropTypes.func,
//   isMobile: PropTypes.bool.isRequired,
//   onRefreshClick: PropTypes.func.isRequired,
// };
// export default SideDrawer;