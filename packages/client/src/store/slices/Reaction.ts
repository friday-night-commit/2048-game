import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATE_STATUS } from './Forum';
import ReactionController from '../../Controllers/ReactionController';
import { Reaction } from '../../pages/Forum/forum.interfaces';
import { REACTION_TYPE } from '../../Components/ReactionBlock';

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
  async ({ id, reactionType }: { id: number; reactionType: REACTION_TYPE }) => {
    return await ReactionController.createReactionByPostId(id, reactionType);
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
    build.addCase(getReactionsByPostId.pending, (state, action) => {
      state.reactionStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getReactionsByPostId.fulfilled, (state, action) => {
      state.reactions = action.payload;
      state.reactionStatus = STATE_STATUS.LOADED;
    });
    build.addCase(getReactionsByPostId.rejected, (state, action) => {
      state.reactions = [];
      state.reactionStatus = STATE_STATUS.Error;
    });
    // Create Reactions
    build.addCase(createReactionByPostId.pending, (state, action) => {
      state.reactionStatus = STATE_STATUS.LOADING;
    });
    build.addCase(createReactionByPostId.fulfilled, (state, action) => {
      state.reactionStatus = STATE_STATUS.LOADED;
      if (action.payload) {
        state.reactions = [...state.reactions, action.payload];
      }
    });
    build.addCase(createReactionByPostId.rejected, (state, action) => {
      state.reactionStatus = STATE_STATUS.Error;
    });
  },
});

export default reactionSlice.reducer;
