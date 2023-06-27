import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATE_STATUS } from './Forum';
import CommentController from '../../Controllers/CommentController';
import { Comment } from '../../pages/Forum/stubs';

interface IState {
  commentContent: string | undefined;
  comments: Comment[];
  commentsStatus: STATE_STATUS;
}

const initialState: IState = {
  commentContent: undefined,
  comments: [],
  commentsStatus: STATE_STATUS.LOADING,
};

export const createCommentByPostId = createAsyncThunk(
  'createCommentByPostId',
  async ({ id, comment }: { id: number; comment: Comment }) => {
    return await CommentController.createCommentByPostId(id, comment);
  }
);

export const getCommentsByPostId = createAsyncThunk(
  'getCommentsByPostId', async ( id: number) => {
    return await CommentController.getCommentsByPostId(id);
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    updateContent(state, action: PayloadAction<string>) {
      state.commentContent = action.payload;
    },
    clearContent(state) {
      state.commentContent = '';
    },
  },
  extraReducers: build => {
    // Comments
    build.addCase(getCommentsByPostId.pending, (state, action) => {
      state.commentsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getCommentsByPostId.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.commentsStatus = STATE_STATUS.LOADED;
    });
    build.addCase(getCommentsByPostId.rejected, (state) => {
      state.commentsStatus = STATE_STATUS.Error;
      state.comments =[];
    });
  },
});

export default commentSlice.reducer;
