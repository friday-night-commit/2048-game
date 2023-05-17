import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/User';

const reducers = combineReducers({
  userSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootStore = ReturnType<typeof reducers>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
