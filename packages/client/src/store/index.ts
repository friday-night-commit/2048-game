import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/User';
import modalSlice from './slices/Modal';

const reducer = combineReducers({
  userSlice,
  modalSlice,
});

export const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
