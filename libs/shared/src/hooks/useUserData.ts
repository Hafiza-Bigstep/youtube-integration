import useAxios from './useAxios';
import APIs from '../config/apis';

const useUserData = () => {
  const { data, error, loading, fetchData } = useAxios();

  fetchData(APIs.AUTH.INFO);

  return { data, error, loading };
};

export default useUserData;
