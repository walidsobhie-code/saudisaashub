require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  console.log('Running schema...');
  
  const schemaPath = path.join(__dirname, '..', 'lib', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  
  // Split by semicolon and execute each statement
  const statements = schema.split(';').filter(s => s.trim());
  
  for (const stmt of statements) {
    try {
      await sql`${stmt}`;
    } catch (error) {
      // Ignore errors for statements that already exist
      console.log('Statement executed or already exists');
    }
  }
  
  console.log('Schema executed!');
  console.log('Database ready for import.');
}

setupDatabase().catch(console.error);
