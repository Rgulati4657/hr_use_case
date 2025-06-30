// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // 1. Check if user is logged in
  if (!user) {
    // Redirect to a relevant login page. We can improve this later.
    return <Navigate to="/admin/login" replace />;
  }

  // 2. Check if the user's role is in the list of allowed roles
  const isAuthorized = allowedRoles.includes(user.role);

  if (!isAuthorized) {
    // Redirect to an "Unauthorized" page or the dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. If everything is fine, render the child component
  return <Outlet />;
};

export default ProtectedRoute;