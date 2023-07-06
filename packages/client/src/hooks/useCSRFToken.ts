import { useEffect, useState } from 'react';
import { useAppSelector } from './redux';


export const useCSRFToken = () => {
  const token = useAppSelector((state) => state.csrfSlice.token);
  const [csrfToken, setCsrfToken] = useState(token);

  useEffect(() => {
    setCsrfToken(token);
  }, [token]);

  return csrfToken;
};
