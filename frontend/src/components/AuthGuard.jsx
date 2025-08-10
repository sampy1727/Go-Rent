import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthGuard.css';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="auth-required">
        <div className="auth-card">
          <h2>Welcome to Go-Rent</h2>
          <p>Please sign in to access our car rental services</p>
          
          <div className="auth-options">
            <Link to="/login" className="auth-btn login-btn">
              Sign In
            </Link>
            <Link to="/register" className="auth-btn register-btn">
              Create Account
            </Link>
          </div>
          
          <div className="features">
            <h3>Why Choose Go-Rent?</h3>
            <ul>
              <li>✓ Wide selection of premium cars</li>
              <li>✓ Competitive pricing</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Easy booking process</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
