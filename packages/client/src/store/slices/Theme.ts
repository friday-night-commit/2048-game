import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThemeController from '../../Controllers/ThemeController';
import { ThemeUser } from '../../Components/ThemeToggler/theme.interfaces';

export enum STATE_STATUS {
  LOADED = 'loaded',
  LOADING = 'loading',
  Error = 'error',
}

interface IState {
  userTheme: string;
}

const initialState: IState = {
  userTheme: 'light',
};

export const getAllPosts = createAsyncThunk('createThemes', async () => {
  return await ThemeController.createThemesInDB();
});

export const getAllTags = createAsyncThunk('getThemeByName', async (name: string) => {
  return await ThemeController.getThemeByName(name);
});

export const getUserTheme = createAsyncThunk(
  'getUserTheme',
  async (id: number) => {
    return await ThemeController.getUserTheme(id);
  }
);

export const updateUserTheme = createAsyncThunk(
  'updateUserTheme',
  async (data: ThemeUser) => {
    return await ThemeController.updateUserTheme(data);
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateThemeForUser(state, action: PayloadAction<string>) {
      state.userTheme = action.payload;
    },
  },
});

export const { updateThemeForUser } = themeSlice.actions;

export default themeSlice.reducer;