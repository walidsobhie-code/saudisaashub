const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function checkProgress() {
  try {
    const counts = await Promise.all([
      sql`SELECT COUNT(*) as count FROM companies`,
      sql`SELECT COUNT(*) as count FROM categories`,
      sql`SELECT COUNT(*) as count FROM features`,
      sql`SELECT COUNT(*) as count FROM integrations`,
      sql`SELECT COUNT(*) as count FROM certifications`,
      sql`SELECT COUNT(*) as count FROM badges`,
      sql`SELECT COUNT(*) as count FROM company_categories`,
      sql`SELECT COUNT(*) as count FROM company_features`,
      sql`SELECT COUNT(*) as count FROM company_integrations`,
      sql`SELECT COUNT(*) as count FROM company_certifications`,
      sql`SELECT COUNT(*) as count FROM company_badges`
    ]);
    
    console.log('Database state:');
    console.log(`  Companies: ${counts[0][0].count}`);
    console.log(`  Categories: ${counts[1][0].count}`);
    console.log(`  Features: ${counts[2][0].count}`);
    console.log(`  Integrations: ${counts[3][0].count}`);
    console.log(`  Certifications: ${counts[4][0].count}`);
    console.log(`  Badges: ${counts[5][0].count}`);
    console.log(`  Company-Category relations: ${counts[6][0].count}`);
    console.log(`  Company-Feature relations: ${counts[7][0].count}`);
    console.log(`  Company-Integration relations: ${counts[8][0].count}`);
    console.log(`  Company-Certification relations: ${counts[9][0].count}`);
    console.log(`  Company-Badge relations: ${counts[10][0].count}`);
    
  } catch (error) {
    console.error('Error checking progress:', error.message);
  }
}

checkProgress().catch(console.error);
