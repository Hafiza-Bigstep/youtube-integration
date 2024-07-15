import React from 'react';
import { useAuth } from 'shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const LogoutPage: React.FC = () => {
  const navigator = useNavigate();
  const { emitLogout } = useAuth();
  emitLogout();

  navigator('/login');

  return (
    <div>
      <h1>Logout Page</h1>
      {/* Add your logout page content here */}
    </div>
  );
};

export default LogoutPage;
