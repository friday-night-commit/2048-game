import { createSlice } from '@reduxjs/toolkit';

type modalState = {
  isOpenSuccess: boolean;
  isOpenFailure: boolean;
  isNewMatrix: boolean;
  isContinuePlay: boolean;
};

const initialState: modalState = {
  isOpenSuccess: false,
  isOpenFailure: false,
  isNewMatrix: false,
  isContinuePlay: false,
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
    continuePlay(state) {
      state.isContinuePlay= true;
      state.isOpenSuccess = false;
      state.isOpenFailure = false;

    },
    stopPlay(state) {
      state.isContinuePlay = false;
    },
  }
});

export const {
  openModalSuccess,
  closeModalSuccess,
  openModalFailure,
  closeModalFailure,
  renewMatrix,
  wasRenewedMatrix,
  continuePlay,
  stopPlay
} = modalSlice.actions;

export default modalSlice.reducer;
