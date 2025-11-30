import { config } from 'dotenv';
import { createClient } from '@libsql/client';

config({ path: '.env' });
config({ path: '.env.local', override: true });

const dbFile = process.env.DB_FILE_NAME;

if (!dbFile) {
  throw new Error('DB_FILE_NAME is not set');
}

const url = dbFile.startsWith('file:') ? dbFile : `file:${dbFile}`;

const client = createClient({ url });

const normalizeColumn = async (column: 'createdAt' | 'updatedAt') => {
  const statement = `
    UPDATE rules
    SET ${column} = CAST(strftime('%s', ${column}) AS INTEGER) * 1000
    WHERE typeof(${column}) = 'text'
      AND ${column} IS NOT NULL
      AND strftime('%s', ${column}) IS NOT NULL;
  `;

  const result = await client.execute(statement);
  console.log(`Updated ${result.rowsAffected ?? 0} rows for column ${column}.`);
};

const main = async () => {
  await normalizeColumn('createdAt');
  await normalizeColumn('updatedAt');

  const preview = await client.execute(
    'SELECT id, createdAt, updatedAt, typeof(createdAt) as createdType, typeof(updatedAt) as updatedType FROM rules LIMIT 5;',
  );

  console.log('Preview after normalization:', preview.rows);
  await client.close();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
