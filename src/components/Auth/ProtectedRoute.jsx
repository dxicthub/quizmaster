import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import DeactivatedAccount from './DeactivatedAccount.jsx';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, student, checkAuth } = useAuth();

  // Check authentication and account status
  if (!checkAuth()) {
    return <Navigate to="/login" replace />;
  }

  // Double-check account is active
  if (student && student.isActive === false) {
    return <DeactivatedAccount />;
  }

  return children;
}