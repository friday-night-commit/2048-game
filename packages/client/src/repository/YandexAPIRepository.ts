import { API_URL as REDIRECT_URI } from '../api/consts';
const API_ROOT = `${REDIRECT_URI}/api/v2`;

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<User | undefined> {
    const response = await fetch(`${API_ROOT}/auth/user`, {
      credentials: 'include',
    });
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    return data;
  }
}
