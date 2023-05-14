import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  // Заменить на импорт из ветки FRI-31
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role?: string;
}

type userState = {
  user: undefined | User;
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
    }
  },
});

// В дальнейшем при нужде изменить пользователя в store, необходимо импортнуть { userSlice } и вызвать dispatch(userSlice.actions.setUser(userData)\clearUser())

export default userSlice.reducer;
