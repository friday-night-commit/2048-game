import { API_URL, options } from './consts';

export class AuthAPI {
  private endpoint = `${API_URL}/api/v2/auth`;

  async signup(data: SignupData) {
    const response = await fetch(`${this.endpoint}/signup`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.reason);
    }
  }

  async login(data: SigninData) {
    const response = await fetch(`${this.endpoint}/signin`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.reason);
    }
  }

  async logout() {
    const response = await fetch(`${this.endpoint}/logout`, {
      ...options,
      method: 'POST',
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.reason);
    }
  }

  async fetchUser() {
    const response = await fetch(`${this.endpoint}/user`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.reason);
    }
  }
}

export default new AuthAPI();
