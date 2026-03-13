const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function checkData() {
  try {
    const count = await sql`SELECT COUNT(*) as count FROM companies`;
    console.log('Total companies:', count[0].count);
    
    const sample = await sql`SELECT name, slug FROM companies LIMIT 5`;
    console.log('Sample companies:', sample);
  } catch (error) {
    console.error('Error:', error);
  }
}

checkData();
