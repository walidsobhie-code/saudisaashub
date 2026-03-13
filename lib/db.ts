import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is required but not set');
    }
    pool = new Pool({ connectionString: dbUrl });
  }
  return pool;
}

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await getPool().query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
};

export const getClient = () => getPool().connect();

export default getPool;
