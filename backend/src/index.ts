import { config } from 'dotenv';

config();

import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './db/schema';

// You can specify any property from the libsql connection options
export const db = drizzle({ connection: { url: `file:${process.env.DB_FILE_NAME!}` }, schema });

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import cors from 'cors';

createHTTPServer({
  basePath: '/api',
  middleware: cors(),
  router: appRouter,
}).listen(Number(process.env.TRPC_PORT));