// src/context/ThemeContext.jsx
import { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '../styles/theme';

// Create the context
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Create the provider component
export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Default to light mode

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // Create the theme based on the current mode. useMemo prevents recalculating on every render.
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Create a custom hook for easy access to the toggle function
export const useColorMode = () => useContext(ColorModeContext);