import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThemeController from '../../Controllers/ThemeController';
import { ThemeUser, Theme } from '../../Components/ThemeToggler/theme.interfaces';

interface IState {
  userTheme: string;
  theme: Theme[];
}

const initialState: IState = {
  userTheme: 'light',
  theme: [],
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
  reducers: {
    updateThemeForUser(state, action: PayloadAction<string>) {
      state.userTheme = action.payload;
    },
  },
  extraReducers: build => {
    // GET User theme
    build.addCase(getUserTheme.fulfilled, (state, action) => {
      state.theme = action.payload;
    });
    build.addCase(getThemeByName.fulfilled, (state, action) => {
      state.theme = action.payload;
    });
  },
});

export const { updateThemeForUser } = themeSlice.actions;

export default themeSlice.reducer;