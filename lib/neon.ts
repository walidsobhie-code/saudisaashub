import { neon } from '@neondatabase/serverless';

let sql: any = null;

export function getSql() {
  if (!sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is required but not set');
    }
    sql = neon(dbUrl);
  }
  return sql;
}
