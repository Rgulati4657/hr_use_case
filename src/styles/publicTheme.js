// // src/styles/publicTheme.js
// import { createTheme } from '@mui/material/styles';

// // This function now generates a theme based on the provided mode
// export const getPublicDesignTokens = (mode) => ({
//   palette: {
//     mode, // Set the mode to 'light' or 'dark'
//     ...(mode === 'light'
//       ? {
//           // --- PUBLIC LIGHT MODE VALUES ---
//           primary: {
//             main: '#1976d2', // Professional blue
//           },
//           background: {
//             default: '#f7f9fa', // Light grey page background
//             paper: '#ffffff',   // White cards
//           },
//           text: {
//             primary: '#202124',
//             secondary: '#5f6368',
//           },
//         }
//       : {
//           // --- PUBLIC DARK MODE VALUES ---
//           primary: {
//             main: '#64b5f6', // A softer, more readable blue for dark mode
//           },
//           background: {
//             default: '#121212', // Not pure black
//             paper: '#1E1E1E',   // Slightly lighter cards for depth
//           },
//           text: {
//             primary: '#e0e0e0',
//             secondary: '#a0a0a0',
//           },
//         }),
//   },
//   typography: {
//     fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
//     h5: { fontWeight: 600 },
//     h6: { fontWeight: 600 },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: 'none',
//         },
//       },
//     },
//   },
// });

// src/styles/publicTheme.js
import { createTheme } from '@mui/material/styles';

export const getPublicDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // --- YOUR LIGHT MODE VALUES (NO CHANGES NEEDED HERE) ---
          primary: { main: '#1976d2' },
          background: { default: '#f7f9fa', paper: '#ffffff' },
          text: { primary: '#202124', secondary: '#5f6368' },
        }
      : {
          // ================== NEW & IMPROVED DARK MODE PALETTE ==================
          primary: {
            // A softer, more readable blue for dark mode.
            main: '#64b5f6',
          },
          background: {
            // A very dark grey, not pure black. Easier on the eyes.
            default: '#121212',
            // Cards and surfaces are slightly lighter to create depth.
            paper: '#1E1E1E',
          },
          text: {
            // Primary text is a bright, clean off-white.
            primary: '#f5f5f5',
            // Secondary text is a clear but less prominent grey.
            secondary: '#bdbdbd',
          },
          divider: 'rgba(255, 255, 255, 0.12)', // Subtle dividers
          // ======================================================================
        }),
  },
  // ... your typography and components objects remain the same
   typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});