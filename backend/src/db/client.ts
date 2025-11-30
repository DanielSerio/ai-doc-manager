import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

config({ path: '.env' });
config({ path: '.env.local', override: true });

const dbFile = process.env.DB_FILE_NAME;

if (!dbFile) {
  throw new Error('DB_FILE_NAME is not set');
}

const connectionUrl = dbFile.startsWith('file:') ? dbFile : `file:${dbFile}`;

export const db = drizzle({ connection: { url: connectionUrl }, schema });
