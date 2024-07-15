import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export const BASE_URL = `${process.env.PUBLIC_API || 'http://localhost:3001'}`;

interface UseAxiosProps {
  url: string;
  method: HttpMethod;
  data?: any;
}

const useAxios = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (props: UseAxiosProps) => {
    const inputData = props.data ? { data: props.data } : {};
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios({
        url: `${BASE_URL}/${props.url}`,
        method: props.method,
        ...inputData,
      });
      setData(response.data);
    } catch (error: Error | any) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useAxios;
