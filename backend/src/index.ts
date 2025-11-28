import { config } from 'dotenv';

config();

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';

createHTTPServer({
  basePath: '/api',
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(Number(process.env.TRPC_PORT));