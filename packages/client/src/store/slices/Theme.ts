import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ThemeController from '../../Controllers/ThemeController';
import { ThemeUser, Theme, INITIAL_THEME } from '../../Components/ThemeToggler/theme.interfaces';

interface IState {
  userTheme: string;
  themes: Theme[];
}

const initialState: IState = {
  userTheme: INITIAL_THEME,
  themes: [],
};

export const getThemeByName = createAsyncThunk('getThemeByName', async (name: string) => {
  return await ThemeController.getThemeByName(name);
});

export const getUserTheme = createAsyncThunk(
  'getUserTheme',
  async (id: string) => {
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
  reducers: {},
  extraReducers: build => {
    // GET User theme
    build.addCase(getUserTheme.fulfilled, (state, action) => {
      state.themes = action.payload;
    });
    build.addCase(getThemeByName.fulfilled, (state, action) => {
      state.themes = action.payload;
    });
  },
});

export default themeSlice.reducer;