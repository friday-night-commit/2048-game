import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
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

export type UserState = {
  user: undefined | User;
};

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
});

export const initialUserState: UserState = {
  user: {
    id: 111,
    first_name: 'Ivan',
    second_name: 'Ivanov',
    display_name: 'Ivi',
    login: 'Ivan',
    email: 'ivan@mail.ru',
    phone: '85544667',
    avatar: '',
    role: 'user',
  },
};
