
// // src/pages/admin/AdminLoginPage.jsx
// import React from 'react';
// import { Box, Typography, TextField, Button, Paper } from '@mui/material';

// // We know these imports are correct.
// import simplifyLogo from '../../assets/logo.png'; 
// import adminDashboardView from '../../assets/images/img1.png';
// import publicCareersView from '../../assets/images/img2.png';

// const AdminLoginPage = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({ email: data.get('email') });
//     // TODO: Add authentication logic here
//   };

//   return (
//     // The main Flexbox container for the whole screen.
//     <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>

//       {/* =================================================================
//           LEFT COLUMN: THE FORM 
//           ================================================================= */}
//       <Box
//         component={Paper}
//         elevation={6}
//         square
//         sx={{
//           // --- CHANGE 1: ADJUSTED WIDTH ---
//           // It's wider on medium (md) and large (lg) screens now.
//           width: { xs: '100%', sm: '60%', md: '50%', lg: '40%' }, 
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           p: 4,
//           zIndex: 10
//         }}
//       >
//         <Box sx={{ minWidth: '100%',maxWidth:'450px', width: '300px' }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
//             <img src={simplifyLogo} alt="Simplify Logo" style={{ width: '80px', marginBottom: '1rem' }} />
//             <Typography component="h1" variant="h4" fontWeight="bold">
//               Admin Portal
//             </Typography>
//             <Typography color="text.secondary">
//               Welcome back! Please sign in.
//             </Typography>
//           </Box>
//           <Box component="form" noValidate onSubmit={handleSubmit}>
//             <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
//             <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
//             >
//               Sign In
//             </Button>
//             <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', textAlign: 'center', '&:hover': { textDecoration: 'underline' } }}>
//               Forgot password?
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* =================================================================
//           RIGHT COLUMN: THE DECORATIVE SHOWCASE
//           ================================================================= */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: { xs: 'none', sm: 'flex' },
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           overflow: 'hidden',
//           // background: 'linear-gradient(45deg, #ffebee 30%, #ffcdd2 90%)',
//           backgroundImage: url('../assets/images/bg.jpeg'),
//         }}
//       >
//         {/* --- Image 1: Admin Dashboard (in the back) --- */}
//         <Box
//           component="img"
//           src={publicCareersView}
//           sx={{
//             width: '65%',
//             borderRadius: '12px',
//             boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.4)',
//             // --- CHANGE 2: REFINED TRANSFORM ---
//             transform: 'rotate(-10deg) translateX(10%) translateY(5%)',
//             zIndex: 1,
//           }}
//         />
//         {/* --- Image 2: Public Careers Page (in the front) --- */}
//         <Box
//           component="img"
//           src={adminDashboardView}
//           sx={{
//             width: '65%',
//             borderRadius: '12px',
//             boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.4)',
//             marginLeft: '-55%',
//             // --- CHANGE 3: REFINED TRANSFORM ---
//             transform: 'rotate(5deg) translate(10%,30%)',
//             zIndex: 2,
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AdminLoginPage;


// src/pages/admin/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import {Stack, Box, Typography, TextField, Button, Paper ,Divider} from '@mui/material';

// --- IMPORTS ---
import simplifyLogo from '../../assets/logo.png'; 
import adminDashboardView from '../../assets/images/img1.png';
import publicCareersView from '../../assets/images/img2.png';

// 1. IMPORT YOUR NEW BACKGROUND IMAGE
//    IMPORTANT: You must provide your own image and ensure this path is correct.
import loginBackgroundImage from '../../assets/images/bg.jpeg';




import { useAuth } from '../../context/AuthContext';




// --- Style Definitions for the Animation (No changes here) ---
const baseImageStyles = {
  position: 'absolute',
  width: { sm: '80%', md: '65%' },
  borderRadius: '12px',
  boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.4)',
  transition: 'transform 0.8s ease-in-out, z-index 0s 0.4s', 
};

const frontImageStyles = {
  transform: 'rotate(5deg) scale(1)',
  zIndex: 2,
};

const backImageStyles = {
  transform: 'rotate(-10deg) scale(0.9)',
  zIndex: 1,
};


const AdminLoginPage = () => {

  const { login } = useAuth();

   const handleLoginAsSuperAdmin = () => {
    login({ name: 'Super Admin', role: 'superadmin', companyId: null });
  };

  const handleLoginAsAdmin = () => {
    login({ name: 'Alice Admin', role: 'admin', companyId: 'company-123' });
  };

  const handleLoginAsHr = () => {
    login({ name: 'Bob HR', role: 'hr', companyId: 'company-123' });
  };



  const [isPublicViewFront, setIsPublicViewFront] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPublicViewFront(prev => !prev);
    }, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // ... your form submission logic
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>

      {/* LEFT COLUMN: THE FORM (No changes here) */}
      <Box
        component={Paper}
        elevation={6}
        square
        sx={{
          width: { xs: '100%', sm: '60%', md: '50%', lg: '40%' }, 
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', p: 4, zIndex: 10
        }}
      >
         {/* ... Your entire form JSX goes here, no changes needed ... */}
         {/* <Box sx={{ maxWidth: '450px', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <img src={simplifyLogo} alt="Simplify Logo" style={{ width: '80px', marginBottom: '1rem' }} />
            <Typography component="h1" variant="h4" fontWeight="bold">
              Admin Portal
            </Typography>
            <Typography color="text.secondary">
              Welcome back! Please sign in.
            </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <Button
              type="submit" fullWidth variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
            >
              Sign In
            </Button>
            <Divider sx={{ my: 2 }}></Divider>
           
          </Box>
        </Box> */}  {/* this is commented for making mocks*/}
       <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Development Role Selector
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{mb: 2}}>
              (This is for development only and will be replaced by a real form)
            </Typography>

            <Stack spacing={2}>
              <Button variant="contained" color="error" onClick={handleLoginAsSuperAdmin}>
                Login as SuperAdmin
              </Button>
              <Button variant="contained" color="primary" onClick={handleLoginAsAdmin}>
                Login as Admin
              </Button>
              <Button variant="contained" color="secondary" onClick={handleLoginAsHr}>
                Login as HR
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>Or Use Real Form</Divider>
            
            {/* You can keep your real form below for styling purposes */}
            <Box component="form" noValidate>
              <TextField margin="normal" fullWidth label="Email Address (disabled)" disabled />
              <TextField margin="normal" fullWidth label="Password (disabled)" type="password" disabled />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled>
                Sign In
              </Button>
            </Box>
          </Box>

      </Box>

      {/* =================================================================
          RIGHT COLUMN: THE DECORATIVE SHOWCASE WITH BACKGROUND IMAGE
          ================================================================= */}
      <Box
        sx={{
          flexGrow: 1, display: { xs: 'none', sm: 'flex' },
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          
          // 2. SET THE BACKGROUND IMAGE
          backgroundImage: `url(${loginBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          // This pseudo-element creates the color overlay
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            // A semi-transparent light red. You can adjust the color and opacity (0.7).
            backgroundColor: 'rgba(255, 235, 238, 0.7)', 
            zIndex: 0,
          }
        }}
      >
        {/* --- The animated images will now appear ON TOP of the overlay --- */}

        {/* Image 1: Admin Dashboard */}
        <Box
          component="img"
          src={adminDashboardView}
          sx={{ ...baseImageStyles, ...(isPublicViewFront ? backImageStyles : frontImageStyles) }}
        />
        
        {/* Image 2: Public Careers Page */}
        <Box
          component="img"
          src={publicCareersView}
          sx={{ ...baseImageStyles, ...(isPublicViewFront ? frontImageStyles : backImageStyles) }}
        />
      </Box>
    </Box>
  );
};

export default AdminLoginPage;