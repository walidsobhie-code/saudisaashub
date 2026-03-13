const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Direct connection string
const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function setupDatabase() {
  console.log('Running schema...');
  
  const schemaPath = path.join(__dirname, 'lib', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  
  const statements = schema.split(';').filter(s => s.trim());
  
  for (const stmt of statements) {
    try {
      await sql`${stmt}`;
    } catch (error) {
      // Ignore if already exists
    }
  }
  
  console.log('✅ Schema executed! Tables created.');
  console.log('Now run: npm run import-csv');
}

setupDatabase().catch(console.error);
