import 'dotenv/config';

import dotenv from 'dotenv';
import { app } from './app';
import http from 'node:http';

dotenv.config();

const port = Number(process.env.SERVER_PORT) || 3001;
app.set('port', port);

const server: http.Server = http.createServer(app);

server.on('error', e => {
  // eslint-disable-next-line no-console
  console.log('Error Server', e);
});

server.on('listening', () => {
  // eslint-disable-next-line no-console
  console.log(`2048 Game server listening at port: ${port}`);
});

server.listen(port);
