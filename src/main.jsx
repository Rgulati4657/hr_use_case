// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App.jsx';
import { AppThemeProvider } from './context/ThemeContext.jsx'; // <-- IMPORT a
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Our custom provider now wraps the app */}
      <AppThemeProvider>
        <CssBaseline />
        <App />
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);