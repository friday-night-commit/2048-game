import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { useCookies } from 'react-cookie';
import { CSRF_TOKEN_NAME } from '../api/consts';
import { setCSRFToken } from '../store/slices/Csrf';

export const useCSRFToken = () => {
  const [cookies] = useCookies([CSRF_TOKEN_NAME]);
  let token = '';
  if(CSRF_TOKEN_NAME in cookies) {
    token = cookies[CSRF_TOKEN_NAME].toString();
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCSRFToken(token));
  }, [token]);

  return token;
};
