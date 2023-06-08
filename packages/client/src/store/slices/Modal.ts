import { createSlice } from '@reduxjs/toolkit';

export type modalState = {
  isOpenSuccess: boolean;
  isOpenFailure: boolean;
};

const initialState: modalState = {
  isOpenSuccess: false,
  isOpenFailure: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalSuccess(state) {
      state.isOpenSuccess = true;
    },
    closeModalSuccess(state) {
      state.isOpenSuccess = false;
    },
    openModalFailure(state) {
      state.isOpenFailure = true;
    },
    closeModalFailure(state) {
      state.isOpenFailure = false;
    },
  },
});

// В дальнейшем при нужде изменить пользователя в store, необходимо:
// 1) const dispatch = useAppDispatch();
// 2) Импортнуть { setUser, clearUser }
// 3) Вызвать dispatch(setUser(userData)) \ dispatch(clearUser())

export const {
  openModalSuccess,
  closeModalSuccess,
  openModalFailure,
  closeModalFailure,
} = modalSlice.actions;

export default modalSlice.reducer;
