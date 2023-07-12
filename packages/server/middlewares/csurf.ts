import csurf from 'csurf';

export default csurf({
  cookie: {
    key: '_csrf-token',
    path: '/',
    httpOnly: false, // true, // Поменять в проде
    secure: process.env.NODE_ENV === 'development',
    maxAge: 3600,
  },
});
