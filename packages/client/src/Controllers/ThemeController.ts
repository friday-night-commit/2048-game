import ThemeAPI from '../api/ThemeApi';
import { Theme, ThemeUser } from '../Components/ThemeToggler/theme.interfaces';


class ThemeController {
  async getThemeByName(name: string): Promise<Theme[] | []> {
    try {
      return await ThemeAPI.getThemeByName(name);
    } catch (err) {
      return [];
    }
  }

  async getUserTheme(userId: string): Promise<Theme[] | []> {
    try {
      return await ThemeAPI.getUserTheme(userId);
    } catch (err) {
      return [];
    }
  }

  async updateUserTheme(data: ThemeUser): Promise<Theme[] | []> {
    try {
      return await ThemeAPI.updateUserTheme(data);
    } catch (err) {
      return [];
    }
  }
}

export default new ThemeController();