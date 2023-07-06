import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATE_STATUS } from './Forum';
import ReactionController from '../../Controllers/ReactionController';
import { Reaction } from '../../pages/Forum/forum.interfaces';

interface IState {
  reactionStatus: string | undefined;
  reactions: Reaction[];
}

const initialState: IState = {
  reactions: [],
  reactionStatus: STATE_STATUS.LOADING,
};

export const createReactionByPostId = createAsyncThunk(
  'createReactionByPostId',
  async ({ id, data }: { id: number; data: Record<'type', string> }) => {
    return await ReactionController.createReactionByPostId(id, data);
  }
);

export const getReactionsByPostId = createAsyncThunk(
  'getReactionsByPostId',
  async (id: number) => {
    return await ReactionController.getReactionsByPostId(id);
  }
);

const reactionSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {},
  extraReducers: build => {
    // GET Reactions
    build.addCase(getReactionsByPostId.pending, (state) => {
      state.reactionStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getReactionsByPostId.fulfilled, (state, action) => {
      state.reactions = action.payload;
      state.reactionStatus = STATE_STATUS.LOADED;
    });
    build.addCase(getReactionsByPostId.rejected, (state) => {
      state.reactions = [];
      state.reactionStatus = STATE_STATUS.Error;
    });
    // Create Reactions
    build.addCase(createReactionByPostId.pending, (state) => {
      state.reactionStatus = STATE_STATUS.LOADING;
    });
    build.addCase(createReactionByPostId.fulfilled, (state, action) => {
      state.reactionStatus = STATE_STATUS.LOADED;
      if (action.payload) {
        state.reactions = [...state.reactions, action.payload];
      }
    });
    build.addCase(createReactionByPostId.rejected, (state) => {
      state.reactionStatus = STATE_STATUS.Error;
    });
  },
});

export default reactionSlice.reducer;
