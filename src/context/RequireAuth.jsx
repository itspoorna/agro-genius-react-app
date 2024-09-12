import React from 'react';
import { useAuth } from './Auth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const  [auth] = useAuth();
    const location = useLocation();
  
    return auth.token ? (
      children
    ) : (
      <Navigate to="/signin" replace state={{ path: location.pathname }} />
    );
}

export default RequireAuth;
