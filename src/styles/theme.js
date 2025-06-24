// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

// This function defines the palette for either 'light' or 'dark' mode.
export const getDesignTokens = (mode) => ({
  palette: {
    mode, // This sets the mode to 'light' or 'dark'
    ...(mode === 'light'
      ? {
          // --- LIGHT MODE VALUES ---
          primary: {
            main: '#B712EB', // NOTE: This is the purple from your text. I'll use a red below.
            // Let's use a nice red that fits your design better for the primary color.
            main: '#C62828', // A strong, primary red
            light: '#E53935', // A slightly lighter version for some elements
            dark: '#B71C1C',  // A darker version for hover states
          },
          secondary: {
            main: '#FAD4DB', // The pink "Accent" color
          },
          text: {
            primary: '#141A11', // Your "Text" color
            secondary: '#444444', // Your "Secondary Text" color
          },
          divider: '#E0E0E0', // A standard light border color
          background: {
            default: '#F5F5F5', // A slightly off-white background
            paper: '#FFFFFF', // Paper elements like Cards will be pure white
          },
        }
      : {
          // --- DARK MODE VALUES ---
          primary: {
            main: '#D72638', // Your "Primary Hover" red for dark mode
            light: '#E57373',
            dark: '#C62828',
          },
          secondary: {
            main: '#7A121C', // Your dark "Accent" color
          },
          text: {
            primary: '#FFFFFF', // Your "Text" color
            secondary: '#CCCCCC', // Your "Secondary Text" color
          },
          divider: 'rgba(255, 255, 255, 0.12)', // A standard dark border color
          background: {
            default: '#121212', // A standard dark background
            paper: '#1E1E1E',   // Paper elements will be slightly lighter
          },
        }),
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
});

// Create a default theme to export
const theme = createTheme(getDesignTokens('light'));
export default theme;