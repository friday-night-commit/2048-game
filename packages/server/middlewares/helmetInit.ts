import helmet from 'helmet';

export default helmet({
  contentSecurityPolicy: {
    directives: {
      'default-src': helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      'script-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://mc.yandex.ru',
        'https://yastatic.net'
      ],
      'img-src': ['\'self\'', 'https: data:', 'data: blob:']
    }
  },
  crossOriginEmbedderPolicy: false
});
