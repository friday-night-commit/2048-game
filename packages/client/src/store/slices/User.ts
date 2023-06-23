import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { doLoginWithCode, logoutUser } from '../../Controllers/YandexController';

const initialState: userState = {
  user: undefined,
  isLoaded: false,
};

const loadMe = createAsyncThunk<User | undefined>(
  'root/loadGreeting',
  async (_, thunkApi) => {
    const service: IUserService = thunkApi.extra as IUserService;
    return service.getCurrentUser();
  }
);

const logout = createAsyncThunk('root/logout', async () => {
  try {
    return await logoutUser();
  } catch (e) {
    return null;
  }
});

const authByCode = createAsyncThunk<void, string>(
  'root/authByCode',
  async (code, { dispatch }) => {
    await doLoginWithCode(code);
    setTimeout(() => {
      dispatch(loadMe());
    }, 500);
  }
);

const selectUserSlice = (store: StoreState) => store.userSlice;
const selectIsAuthCompleted = createSelector(
  selectUserSlice,
  user => user.isLoaded
);
const selectIsAuthenticated = createSelector(
  selectUserSlice,
  selectIsAuthCompleted,
  (userSlice, authCompleted) => [
    authCompleted,
    authCompleted && userSlice.user !== undefined && userSlice.user !== null,
  ]
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Пример reducer
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, store => {
      store.user = undefined;
      store.isLoaded = true;
    });
    builder.addCase(loadMe.pending, store => {
      store.isLoaded = false;
    });
    builder.addCase(loadMe.rejected, store => {
      store.isLoaded = true;
      store.user = undefined;
    });
    builder.addCase(loadMe.fulfilled, (store, action) => {
      const { payload } = action;
      store.user = payload;
      store.isLoaded = true;
    });
  },
});


export const { setUser, clearUser } = userSlice.actions;

export {
  loadMe,
  logout,
  authByCode,
  selectUserSlice,
  selectIsAuthenticated,
  selectIsAuthCompleted,
};

export default userSlice.reducer;
