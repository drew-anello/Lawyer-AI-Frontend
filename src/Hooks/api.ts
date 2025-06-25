import { useMemo } from 'react';

export const useApiUrl = () => {
  const apiUrl = useMemo(() => {
    return import.meta.env.VITE_API_URL 
  }, []);

  return apiUrl;
};
