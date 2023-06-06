import 'dotenv/config';

import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = Number(process.env.SERVER_PORT) || 3001;
app.set('port', port);

app.on('error', e => {
  // eslint-disable-next-line no-console
  console.log('Error Server', e);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`2048 Game server listening at port: ${port}`);
});
