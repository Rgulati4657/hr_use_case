// src/layouts/PublicAuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
// import FloatingCubes from '../components/shared/FloatingCubes'; // Import our new component
import FloatingShapes from '../components/shared/FloatingShapes'; // Import our new component


const PublicAuthLayout = () => {
  return (
    // The main container
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: '#D72638', // A very light, almost white background
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* The background component */}
      <FloatingShapes />

      {/* The form card, which sits on top of the background */}
      <Paper
        elevation={12}
        sx={{
          maxWidth: '450px',
          width: '100%',
          p: { xs: 3, sm: 4 },
          borderRadius: '16px',
          zIndex: 1, // Ensures the form is on top of the shapes
          // The "Frosted Glass" effect
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        }}
      >
        {/* The Login or Signup form will be rendered here */}
        <Outlet />
      </Paper>
    </Box>
  );
};

export default PublicAuthLayout;




// // Define the keyframes for our animated gradient
// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;
// const PublicAuthLayout = () => {
//   return (
//     // The main container
//     <Box
//       sx={{
//         minHeight: '100vh',
//         width: '100vw',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         p: 2,
//         backgroundColor: '#ffffff', // A clean white background
//         position: 'relative', // Needed for the z-index to work correctly
//         overflow: 'hidden', // Prevents any accidental scrollbars
//       }}
//     >
//       {/* The background component */}
//       <FloatingCubes />

//       {/* The form card, which sits on top of the background */}
//       <Paper
//         elevation={12}
//         sx={{
//           maxWidth: '450px',
//           width: '100%',
//           p: { xs: 3, sm: 4 },
//           borderRadius: '16px',
//           zIndex: 1, // Ensures the form is on top of the cubes
//           // Add a subtle backdrop filter for a "frosted glass" effect
//           backgroundColor: 'rgba(255, 255, 255, 0.8)',
//           backdropFilter: 'blur(10px)',
//           border: '1px solid rgba(255, 255, 255, 0.2)',
//         }}
//       >
//         {/* The Login or Signup form will be rendered here */}
//         <Outlet />
//       </Paper>
//     </Box>
//   );
// };

// export default PublicAuthLayout;