import { createSlice } from '@reduxjs/toolkit';

type modalState = {
  isOpenSuccess: boolean;
  isOpenFailure: boolean;
  isNewMatrix: boolean;
};

const initialState: modalState = {
  isOpenSuccess: false,
  isOpenFailure: false,
  isNewMatrix: false,
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
    renewMatrix(state) {
      state.isNewMatrix= true;
    },
    wasRenewedMatrix(state) {
      state.isNewMatrix = false;
    },
  }
});

export const { openModalSuccess, closeModalSuccess, openModalFailure, closeModalFailure, renewMatrix, wasRenewedMatrix } = modalSlice.actions;

export default modalSlice.reducer;
