import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import useAxios from './useAxios';
import APIs from '../config/apis';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useAuthInfo = () => {
  const { data, error, loading, fetchData } = useAxios();

  fetchData(APIs.AUTH.INFO);

  return { data, error, loading };
};

export default useAuthInfo;
