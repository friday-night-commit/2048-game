import { useEffect, useState } from 'react';
import { useAppSelector } from './redux';
import { useCookies } from 'react-cookie';
// import { CSRF_TOKEN_NAME } from '../api/consts';

export const useCSRFToken = () => {
  const [cookies] = useCookies();
  // eslint-disable-next-line no-console
  console.log('cookies', cookies);

  const token = useAppSelector((state) => state.csrfSlice.token);
  const [csrfToken, setCsrfToken] = useState(token);

  useEffect(() => {
    setCsrfToken(token);
  }, [token]);

  return csrfToken;
};
