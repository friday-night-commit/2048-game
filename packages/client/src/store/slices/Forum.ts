import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ForumController from '../../Controllers/ForumController';
import { ForumPost, TAB_TYPE } from '../../pages/Forum/forum.interfaces';
import { ALL_TAG_LABLE } from '../../pages/Forum/components/TagsBlock';

interface IState {
  tabName: TAB_TYPE;
  postContent: string | undefined;
  posts: ForumPost[] | [];
  tags: string[];
  selectedTag: string;
  postsStatus: STATE_STATUS;
  tagsStatus: STATE_STATUS;
}

export enum STATE_STATUS {
  LOADED = 'loaded',
  LOADING = 'loading',
  Error = 'error',
}

const initialState: IState = {
  tabName: TAB_TYPE.POSTS,
  postContent: undefined,
  tags: [],
  selectedTag: ALL_TAG_LABLE,
  posts: [],
  postsStatus: STATE_STATUS.LOADING,
  tagsStatus: STATE_STATUS.LOADING
};

export const getAllPosts = createAsyncThunk('getAllPosts', async () => {
  return await ForumController.getAllPosts();
});

export const getAllTags = createAsyncThunk('getAllTags', async () => {
  return await ForumController.getAllTags();
});

export const getPostById = createAsyncThunk(
  'getPostById',
  async (id: number) => {
    return await ForumController.getPostById(id);
  }
);
export const createPost = createAsyncThunk(
  'createPost',
  async ({ post, token }: { post: ForumPost; token: string }) => {
    return await ForumController.createPost(post, token);
  }
);

export const deletePost = createAsyncThunk(
  'deletePost',
  async ({ id, token }: { id: number; token: string }) => {
    return await ForumController.deletePostById(id, token);
  }
);

export const loadPostPreview = createAsyncThunk(
  'loadPostPreview',
  async (formData: FormData) => {
    return await ForumController.loadPostPreview(formData);
  }
);


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
    setForumTabName(state, action: PayloadAction<TAB_TYPE>) {
      state.tabName = action.payload;
    },
    setTagName(state, action: PayloadAction<string>){
      state.selectedTag = action.payload;
    }
  },
  extraReducers: build => {
    // Posts
    build.addCase(getAllPosts.pending, (state, _) => {
      state.postsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getAllPosts.fulfilled, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADED;
      state.posts = action.payload;
    });
    build.addCase(getAllPosts.rejected, state => {
      state.postsStatus = STATE_STATUS.Error;
      state.posts = [];
    });
    // Tags
    build.addCase(getAllTags.pending, (state, _) => {
      state.tagsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(getAllTags.fulfilled, (state, action) => {
      state.tagsStatus = STATE_STATUS.LOADED;
      state.tags = action.payload;
    });
    build.addCase(getAllTags.rejected, state => {
      state.tagsStatus = STATE_STATUS.Error;
      state.posts = [];
    });
    // Create Post
    build.addCase(createPost.pending, (state, _) => {
      state.postsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(createPost.fulfilled, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADED;
      if (action.payload) {
        state.posts = [...state.posts, action.payload];
        if(!state.tags.includes(action.payload.tag)){
          state.tags.push(action.payload.tag);
        }
      }
    });
    build.addCase(createPost.rejected, state => {
      state.postsStatus = STATE_STATUS.Error;
    });
    // Delete Post
    build.addCase(deletePost.pending, (state, _) => {
      state.postsStatus = STATE_STATUS.LOADING;
    });
    build.addCase(deletePost.fulfilled, (state, action) => {
      state.postsStatus = STATE_STATUS.LOADED;
      if (action.payload) {
        const matchPost = state.posts.find(p => p.id === action.payload);
        state.posts = state.posts.filter(p => p.id !== action.payload);
        if(matchPost){
          const tagMatches = state.posts.filter(p => p.tag === matchPost.tag);
          if(!tagMatches?.length) {
            state.tags = state.tags.filter(t => t !== matchPost.tag);
          }
        }
      }
    });
    build.addCase(deletePost.rejected, state => {
      state.postsStatus = STATE_STATUS.Error;
    });
  }
});

export const { updatePostContent, clearPostContent, setForumTabName, setTagName } =
  forumSlice.actions;

export default forumSlice.reducer;
