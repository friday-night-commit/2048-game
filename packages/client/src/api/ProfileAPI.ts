import { API_URL } from './consts';

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

class UserAPI {
  private endpoint = `${API_URL}/api/v2/user`;

  async changeUser(data: Partial<User>): Promise<User | never> {
    const response = await fetch(`${this.endpoint}/profile`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }

    return json;
  }

  async changeAvatar(data: FormData): Promise<User | never> {
    const response = await fetch(`${this.endpoint}/profile/avatar`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }

    return json;
  }

  async changePassword(data: passwordFetchData): Promise<boolean | never> {
    const response = await fetch(`${this.endpoint}/password`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.reason);
    }

    return true;
  }
}

export default new UserAPI();
