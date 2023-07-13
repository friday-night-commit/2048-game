import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { useCookies } from 'react-cookie';
import { CSRF_TOKEN_NAME } from '../api/consts';
import { setCSRFToken } from '../store/slices/Csrf';

export const useCSRFToken = () => {
   const [cookies] = useCookies([CSRF_TOKEN_NAME]);
  // const token = useAppSelector((state) => state.csrfSlice.token);
  // eslint-disable-next-line no-console
  const token = cookies[CSRF_TOKEN_NAME] || useAppSelector((state) => state.csrfSlice.token);
  const [csrfToken, setCsrfToken] = useState(token);

  const dispatch = useAppDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('csrfToken', csrfToken);
    dispatch(setCSRFToken(token));
    setCsrfToken(token);
  }, [token]);

  return token;
};
