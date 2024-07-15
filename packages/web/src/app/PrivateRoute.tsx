import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log(`PrivateRoute Location`, location.pathname);
    console.log('PrivateRoute isAuthenticated:', isAuthenticated);
  });

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
