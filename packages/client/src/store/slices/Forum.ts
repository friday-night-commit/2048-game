import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  content: string | undefined;
}

const initialState: IState = {
  content: undefined,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    updateContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    clearContent(state) {
      state.content = '';
    },
  },
});

export const { updateContent, clearContent } = forumSlice.actions;

export default forumSlice.reducer;
