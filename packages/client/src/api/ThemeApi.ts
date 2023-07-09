import { API_URL } from './consts';
import { Theme, ThemeUser } from '../Components/ThemeToggler/theme.interfaces';

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

export class ThemeAPI {
  private endpoint = `${API_URL}/api/theme`;

  async createThemes(
  ): Promise<Theme | never> {
    const response = await fetch(`${this.endpoint}/`, {
      ...options,
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

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

  async updateUserTheme(data: ThemeUser) : Promise<Theme[]>{
    console.log(data)
    const response = await fetch(`/changeTheme/${data.themeId}/${data.userId}`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include',
    });
    console.log(response)
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }
}



export default new ThemeAPI();