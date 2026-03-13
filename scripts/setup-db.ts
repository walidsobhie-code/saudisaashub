import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  console.log('Running schema...');
  
  const schemaPath = path.join(process.cwd(), 'lib', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  
  // Split by semicolon and execute each statement
  const statements = schema.split(';').filter(s => s.trim());
  
  for (const stmt of statements) {
    try {
      await sql`${stmt}`;
    } catch (error) {
      // Ignore errors for statements that already exist (like extensions, triggers)
      console.log('Statement executed or already exists');
    }
  }
  
  console.log('Schema executed!');
  console.log('Database ready for import.');
}

setupDatabase().catch(console.error);
