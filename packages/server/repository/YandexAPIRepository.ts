import axios from 'axios';
const API_ROOT = 'https://ya-praktikum.tech/api/v2/';

export class YandexAPIRepository {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrent(): Promise<any> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      headers: {
        cookie: this._cookieHeader,
      },
    });

    if(data) {
      try {
        const theme = await axios.get (`http://localhost:5000/api/theme/getThemeByUser/${data.id}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          }
        });
        data.theme = theme.data.name;
      } catch (e) {
        data.theme = 'light';
      }
    }

    return {
      ...data,
      xss: '</script><script>alert(`pwned`)</script><!--',
    };
  }
}
