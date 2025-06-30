// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   // In a real app, you'd initialize this from localStorage
//   const [user, setUser] = useState(null); 
//   // Example user object: { name: 'John Doe', role: 'admin', token: '...' }

//   const login = (userData) => {
//     // This would be called after a successful API login
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const value = { user, login, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // A handy custom hook to easily access the auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };








// BAsed on MOCK 

// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On initial load, try to get user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- THIS IS OUR MOCK LOGIN FUNCTION ---
  const login = (mockUserData) => {
    // In the real app, this data would come from the API.
    // Here, we create it on the fly.
    const userToSet = {
      ...mockUserData,
      token: `mock-token-for-${mockUserData.role}`, // Fake a token
    };

    localStorage.setItem('user', JSON.stringify(userToSet));
    setUser(userToSet);
    
    // Redirect based on role after login
    if (userToSet.role === 'superadmin') {
        navigate('/superadmin');
    } else {
        navigate('/admin');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/admin/login'); // Redirect to login page on logout
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};