import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ForumController from '../../Controllers/ForumController';
import { ForumPost } from '../../pages/Forum/stubs';

interface IState {
  postContent: string | undefined;
  posts: ForumPost[] | [];
  tags: string[];
  postsStatus: STATE_STATUS;
  tagsStatus: STATE_STATUS;
}

export enum STATE_STATUS {
  LOADED = 'loaded',
  LOADING = 'loading',
  Error = 'error',
}

const initialState: IState = {
  postContent: undefined,
  tags: [],
  posts: [],
  postsStatus: STATE_STATUS.LOADING,
  tagsStatus: STATE_STATUS.LOADING,
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

export const createPost = createAsyncThunk('createPost', async (post: ForumPost) => {
  return await ForumController.createPost(post);
});

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    updatePostContent(state, action: PayloadAction<string>) {
      state.postContent = action.payload;
    },
    clearPostContent(state) {
      state.postContent = '';
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
    // Create Post
    build.addCase(createPost.pending, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(createPost.fulfilled, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADED;
      if(action.payload){
        state.posts = [ ...state.posts, action.payload ];
      }
    });
    build.addCase(createPost.rejected, (state) => {
      state.postsStatus = STATE_STATUS.Error;
    });
  },
});

export const { updatePostContent, clearPostContent } = forumSlice.actions;

export default forumSlice.reducer;
