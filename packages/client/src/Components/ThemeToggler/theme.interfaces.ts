export interface Theme {
  id?: number;
  name?: string;
}

export interface ThemeUser {
  themeId?: number;
  userId?: number;
}

export const INITIAL_THEME = 'light';