import { API_URL, options } from './consts';
import { Theme, ThemeUser } from '../Components/ThemeToggler/theme.interfaces';


export class ThemeAPI {
  private endpoint = `${API_URL}/api/theme`;

  async getThemeByName(name: string) : Promise<Theme[]>{
    const response = await fetch(`${this.endpoint}/getThemeByName/${name}`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getUserTheme(userId: string) : Promise<Theme[]>{
    const response = await fetch(`/getThemeByUser/${userId}`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async updateUserTheme(data: ThemeUser, tokenValue: string) : Promise<Theme[]>{
    options.headers['X-CSRF-Token'] = tokenValue;

    const response = await fetch(`api/theme/changeTheme/${data.themeId}/${data.userId}`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }
}

export default new ThemeAPI();
