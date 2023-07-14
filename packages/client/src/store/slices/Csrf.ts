import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  token: string;
}

const initialState: IState = {
  token: ''
};

const csrfSlice = createSlice({
  name: 'csrf',
  initialState,
  reducers: {
    setCSRFToken(state, action: PayloadAction<IState['token']>) {
      state.token = action.payload;
    }
  }
});


export const { setCSRFToken } = csrfSlice.actions;
export default csrfSlice.reducer;
