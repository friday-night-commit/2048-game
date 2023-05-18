import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/User';

const reducers = combineReducers({
  userSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
