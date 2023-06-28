import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATE_STATUS } from './Forum';
import CommentController from '../../Controllers/CommentController';
import { Comment, LastComment } from '../../pages/Forum/forum.interfaces';

interface IState {
  commentContent: string | undefined;
  comments: Comment[];
  lastComments: LastComment[];
  commentsStatus: STATE_STATUS;
  lastCommentsStatus: STATE_STATUS;
}

const initialState: IState = {
  commentContent: undefined,
  comments: [],
  lastComments: [],
  commentsStatus: STATE_STATUS.LOADING,
  lastCommentsStatus: STATE_STATUS.LOADING,
};

export const createCommentByPostId = createAsyncThunk(
  'createCommentByPostId',
  async ({ id, comment }: { id: number; comment: Comment }) => {
    return await CommentController.createCommentByPostId(id, comment);
  }
);

export const getCommentsByPostId = createAsyncThunk(
  'getCommentsByPostId',
  async (id: number) => {
    return await CommentController.getCommentsByPostId(id);
  }
);

export const getLastComments = createAsyncThunk(
  'getLastComments',
  async (limit: number) => {
    return await CommentController.getLastComments(limit);
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    updateCommentContent(state, action: PayloadAction<string>) {
      state.commentContent = action.payload;
    },
    clearCommentContent(state) {
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
    build.addCase(getCommentsByPostId.rejected, state => {
      state.commentsStatus = STATE_STATUS.Error;
      state.comments = [];
    });
    // Last Comments
    build.addCase(getLastComments.pending, (state, action) => {
      state.lastCommentsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getLastComments.fulfilled, (state, action) => {
      state.lastComments = action.payload;
      state.lastCommentsStatus = STATE_STATUS.LOADED;
    });
    build.addCase(getLastComments.rejected, state => {
      state.lastCommentsStatus = STATE_STATUS.Error;
      state.comments = [];
    });
  },
});
export const { clearCommentContent, updateCommentContent } =
  commentSlice.actions;
export default commentSlice.reducer;
