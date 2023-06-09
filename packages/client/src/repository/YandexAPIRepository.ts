const REDIRECT_URI = 'http://localhost:5000';
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
