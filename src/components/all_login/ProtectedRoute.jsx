import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, role, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  if (role !== 'admin') {
    return (
      <div className="unauthorized-container">
        <h1>403 - Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
        <a href="/" className="btn btn-primary">Go to Home</a>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
