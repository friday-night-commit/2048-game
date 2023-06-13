import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthAPI from '../api/AuthAPI';
import { useAppSelector, useAppDispatch } from './redux';
import { setUser, clearUser } from '../store/slices/User';
import routes from '../routes';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(store => store.userSlice.user);

  const [loginError, setLoginError] = useState<string>('');

  const getUserData = async (): Promise<User | undefined> => {
    try {
      const user = await AuthAPI.fetchUser();
      dispatch(setUser(user));
      return user;
    } catch (_e: unknown) {
      navigate(`/${routes.authPage}`);
    }
  };

  const login = async (data: SigninData) => {
    setLoginError('');
    try {
      await AuthAPI.login(data);
      const user = await getUserData();
      if (user) navigate(`/${routes.mainPage}`);
    } catch (e: unknown) {
      setLoginError((e as Error).message);
    }
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
      // eslint-disable-next-line no-empty
    } catch (ignore) {}
    dispatch(clearUser());
    navigate(`/${routes.authPage}`);
  };

  const signup = async (data: SignupData) => {
    setLoginError('');
    try {
      await AuthAPI.signup(data);
      const user = await getUserData();
      if (user) navigate(`/${routes.mainPage}`);
    } catch (e: unknown) {
      setLoginError((e as Error).message);
    }
  };

  return {
    user,
    loginError,
    getUserData,
    login,
    logout,
    signup,
  };
};

export default useAuth;
