import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ForumController from '../../Controllers/ForumController';
import { ForumPost } from '../../pages/Forum/stubs';

interface IState {
  content: string | undefined;
  posts: ForumPost[] | [];
  tags: string[];
  currentPost: ForumPost | undefined;
  postsStatus: STATE_STATUS;
  tagsStatus: STATE_STATUS;
  currentPostStatus: STATE_STATUS;
}

export enum STATE_STATUS {
  LOADED = 'loaded',
  LOADING = 'loading',
  Error = 'error',
}

const initialState: IState = {
  content: undefined,
  tags: [],
  posts: [],
  currentPost: undefined,
  postsStatus: STATE_STATUS.LOADING,
  tagsStatus: STATE_STATUS.LOADING,
  currentPostStatus: STATE_STATUS.LOADING,
};

export const getAllPosts = createAsyncThunk('getAllPosts', async () => {
  return await ForumController.getAllPosts();
});

export const getAllTags = createAsyncThunk('getAllTags', async () => {
  return await ForumController.getAllTags();
});

export const getPostById = createAsyncThunk('getPostById', async (id: number) => {
  return await ForumController.getPostById(id);
});


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
  extraReducers: build => {
    // Posts
    build.addCase(getAllPosts.pending, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getAllPosts.fulfilled, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADED;
      state.posts = action.payload;
    });
    build.addCase(getAllPosts.rejected, (state) => {
      state.postsStatus = STATE_STATUS.Error;
      state.posts =[];
    });
    // Tags
    build.addCase(getAllTags.pending, (state, action) => {
      state.tagsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getAllTags.fulfilled, (state, action) => {
      state.tagsStatus = STATE_STATUS.LOADED;
      state.tags = action.payload;
    });
    build.addCase(getAllTags.rejected, (state) => {
      state.tagsStatus = STATE_STATUS.Error;
      state.posts =[];
    });
    // CurrentPost
    build.addCase(getPostById.pending, (state, action) => {
      state.currentPostStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getPostById.fulfilled, (state, action) => {
      state.currentPostStatus = STATE_STATUS.LOADED;
      state.currentPost = action.payload;
    });
    build.addCase(getPostById.rejected, (state) => {
      state.currentPostStatus = STATE_STATUS.Error;
      state.currentPost = undefined;
    });
  },
});

export const { updateContent, clearContent } = forumSlice.actions;

export default forumSlice.reducer;
