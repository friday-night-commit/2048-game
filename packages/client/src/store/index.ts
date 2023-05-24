import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/User';
import modalSlice from './slices/Modal';

export const reducers = combineReducers({
  userSlice,
  modalSlice
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
