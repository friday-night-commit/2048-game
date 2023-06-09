import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice, { userState } from './slices/User';
import modalSlice, { modalState } from './slices/Modal';

export type StoreState = {
  userSlice: userState;
  modalSlice: modalState;
};

const reducer = combineReducers({
  userSlice,
  modalSlice,
});

export const createStore = (preloadedState?: StoreState) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
