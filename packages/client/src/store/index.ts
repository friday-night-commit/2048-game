import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/User';
import modalSlice from './slices/Modal';

const reducer = combineReducers({
  userSlice,
  modalSlice,
});

export const createStore = (
  service: IUserService,
  preloadedState?: StoreState
) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      });
    },
  });
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
