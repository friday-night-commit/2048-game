const API_ROOT = 'ya-praktikum.tech';
import https from 'node:https';

export class YandexAPIRepository {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrent(): Promise<any> {
    return new Promise(resolve => {
      https.get(
        {
          hostname: API_ROOT,
          port: 443,
          path: '/api/v2/auth/user',
          agent: false, // Создаем нового агента только для этого запроса
          headers: {
            cookie: this._cookieHeader,
          },
        },
        res => {
          let body = '';
          res.on('data', chunk => {
            body += chunk.toString();
          });
          res.on('end', () => {
            resolve({
              data: body,
              xss: '</script><script>alert("pwned")</script><!--',
            });
          });
        }
      );
    });
  }
}
