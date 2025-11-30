import { config } from 'dotenv';
import './db/client';

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import cors from 'cors';

config({ path: '.env' });
config({ path: '.env.local', override: true });

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(Number(process.env.TRPC_PORT));

console.log(`Server listening on http://localhost:${process.env.TRPC_PORT}`);
