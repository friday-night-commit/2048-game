import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type userState = {
  user: User | undefined;
};

const initialState: userState = {
  user: undefined,
};

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
});

// В дальнейшем при нужде изменить пользователя в store, необходимо:
// 1) const dispatch = useAppDispatch();
// 2) Импортнуть { setUser, clearUser }
// 3) Вызвать dispatch(setUser(userData)) \ dispatch(clearUser())

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
