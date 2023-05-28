import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Game {
  maxValue: number;
  newMatrix?: boolean;
}

type modalState = {
  isOpenSuccess: boolean;
  isOpenFailure: boolean;
  maxValue: Game;
};

const initialState: modalState = {
  isOpenSuccess: false,
  isOpenFailure: false,
  maxValue: { maxValue: 0, newMatrix: false },
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
    setRecord(state, action: PayloadAction<Game>) {
      state.maxValue = action.payload;
    },
    cleanRecord(state) {
      state.maxValue.maxValue = 0;
    },
    renewMatrix(state) {
      state.maxValue.newMatrix = true;
    },
    wasRenewedMatrix(state) {
      state.maxValue.newMatrix = false;
    },
  }
});

export const { openModalSuccess, closeModalSuccess, openModalFailure, closeModalFailure, setRecord, cleanRecord, renewMatrix, wasRenewedMatrix } = modalSlice.actions;

export default modalSlice.reducer;
