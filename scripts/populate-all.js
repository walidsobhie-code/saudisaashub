const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const csv = require('csv-parser');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function populateLookupAndRelations() {
  console.log('Populating lookup tables and relationships...');
  
  const csvPath = '/Users/walidsobhi/Projects/saudisaashub/data/saudi-saas-companies.csv';
  
  // Collect unique values for lookup tables
  const categoriesSet = new Set();
  const featuresSet = new Set();
  const integrationsSet = new Set();
  const certificationsSet = new Set();
  const badgesSet = new Set();
  
  // Store relationships for bulk insert
  const companyCategories = [];
  const companyFeatures = [];
  const companyIntegrations = [];
  const companyCertifications = [];
  const companyBadges = [];
  
  // First pass: collect all unique values and relationships
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const companySlug = row.slug?.trim();
        if (!companySlug) return;
        
        // Collect categories
        if (row.categories) {
          for (const cat of row.categories.split(',').map(c => c.trim()).filter(Boolean)) {
            categoriesSet.add(cat);
            companyCategories.push({ companySlug, value: cat });
          }
        }
        
        // Collect features
        if (row.features) {
          for (const feat of row.features.split(',').map(f => f.trim()).filter(Boolean)) {
            featuresSet.add(feat);
            companyFeatures.push({ companySlug, value: feat });
          }
        }
        
        // Collect integrations
        if (row.integrations) {
          for (const int of row.integrations.split(',').map(i => i.trim()).filter(Boolean)) {
            integrationsSet.add(int);
            companyIntegrations.push({ companySlug, value: int });
          }
        }
        
        // Collect certifications
        if (row.certifications) {
          for (const cert of row.certifications.split(',').map(c => c.trim()).filter(Boolean)) {
            certificationsSet.add(cert);
            companyCertifications.push({ companySlug, value: cert });
          }
        }
        
        // Collect badges
        if (row.badges) {
          for (const badge of row.badges.split(',').map(b => b.trim()).filter(Boolean)) {
            badgesSet.add(badge);
            companyBadges.push({ companySlug, value: badge });
          }
        }
      })
      .on('end', () => {
        console.log('CSV analysis complete:');
        console.log(`  Categories: ${categoriesSet.size} unique`);
        console.log(`  Features: ${featuresSet.size} unique`);
        console.log(`  Integrations: ${integrationsSet.size} unique`);
        console.log(`  Certifications: ${certificationsSet.size} unique`);
        console.log(`  Badges: ${badgesSet.size} unique`);
        console.log(`  Company relationships collected: ${companyCategories.length + companyFeatures.length + companyIntegrations.length + companyCertifications.length + companyBadges.length}`);
        resolve();
      })
      .on('error', reject);
  });
  
  // Insert lookup values
  console.log('\nInserting lookup values...');
  
  const insertLookup = async (table, values) => {
    for (const value of values) {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const safeValue = value.replace(/'/g, "''");
      try {
        await sql.unsafe(`
          INSERT INTO ${table} (name, slug) 
          VALUES ('${safeValue}', '${slug}')
          ON CONFLICT (slug) DO NOTHING
        `);
      } catch (error) {
        console.error(`Error inserting ${table} ${value}:`, error.message);
      }
    }
    console.log(`  Inserted ${values.size} ${table}`);
  };
  
  await insertLookup('categories', categoriesSet);
  await insertLookup('features', featuresSet);
  await insertLookup('integrations', integrationsSet);
  await insertLookup('certifications', certificationsSet);
  
  // Badges with color
  for (const badge of badgesSet) {
    const slug = badge.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const safeBadge = badge.replace(/'/g, "''");
    try {
      await sql.unsafe(`
        INSERT INTO badges (name, slug, color) 
        VALUES ('${safeBadge}', '${slug}', '#3B82F6')
        ON CONFLICT (slug) DO NOTHING
      `);
    } catch (error) {
      console.error(`Error inserting badge ${badge}:`, error.message);
    }
  }
  console.log(`  Inserted ${badgesSet.size} badges`);
  
  // Now get all lookup IDs into maps
  console.log('\nCaching lookup IDs...');
  
  const [categoriesMap, featuresMap, integrationsMap, certificationsMap, badgesMap] = await Promise.all([
    Promise.all(
      Array.from(categoriesSet).map(async (cat) => {
        const slug = cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const result = await sql`SELECT id FROM categories WHERE slug = ${slug}`;
        return { name: cat, id: result[0]?.id };
      })
    ),
    Promise.all(
      Array.from(featuresSet).map(async (feat) => {
        const slug = feat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const result = await sql`SELECT id FROM features WHERE slug = ${slug}`;
        return { name: feat, id: result[0]?.id };
      })
    ),
    Promise.all(
      Array.from(integrationsSet).map(async (int) => {
        const slug = int.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const result = await sql`SELECT id FROM integrations WHERE slug = ${slug}`;
        return { name: int, id: result[0]?.id };
      })
    ),
    Promise.all(
      Array.from(certificationsSet).map(async (cert) => {
        const slug = cert.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const result = await sql`SELECT id FROM certifications WHERE slug = ${slug}`;
        return { name: cert, id: result[0]?.id };
      })
    ),
    Promise.all(
      Array.from(badgesSet).map(async (badge) => {
        const slug = badge.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const result = await sql`SELECT id FROM badges WHERE slug = ${slug}`;
        return { name: badge, id: result[0]?.id };
      })
    )
  ]);
  
  const catMap = new Map(categoriesMap.map(m => [m.name, m.id]));
  const featMap = new Map(featuresMap.map(m => [m.name, m.id]));
  const intMap = new Map(integrationsMap.map(m => [m.name, m.id]));
  const certMap = new Map(certificationsMap.map(m => [m.name, m.id]));
  const badgeMap = new Map(badgesMap.map(m => [m.name, m.id]));
  
  // Get all company IDs
  const allCompanies = await sql`SELECT id, slug FROM companies`;
  const companyIdMap = new Map(allCompanies.map(c => [c.slug, c.id]));
  
  console.log('Lookup IDs cached, inserting relationships...');
  
  // Bulk insert relationships using raw queries (faster)
  const batchInsert = async (sqlText, values) => {
    if (values.length === 0) return;
    try {
      await sql.unsafe(sqlText + ' ' + values.join(','));
    } catch (error) {
      console.error('Batch insert error:', error.message);
    }
  };
  
  // Build value arrays for each junction table
  const catVals = [];
  const featVals = [];
  const intVals = [];
  const certVals = [];
  const badgeVals = [];
  
  for (const rel of companyCategories) {
    const companyId = companyIdMap.get(rel.companySlug);
    const catId = catMap.get(rel.value);
    if (companyId && catId) {
      catVals.push(`('${companyId}', '${catId}')`);
    }
  }
  
  for (const rel of companyFeatures) {
    const companyId = companyIdMap.get(rel.companySlug);
    const featId = featMap.get(rel.value);
    if (companyId && featId) {
      featVals.push(`('${companyId}', '${featId}')`);
    }
  }
  
  for (const rel of companyIntegrations) {
    const companyId = companyIdMap.get(rel.companySlug);
    const intId = intMap.get(rel.value);
    if (companyId && intId) {
      intVals.push(`('${companyId}', '${intId}')`);
    }
  }
  
  for (const rel of companyCertifications) {
    const companyId = companyIdMap.get(rel.companySlug);
    const certId = certMap.get(rel.value);
    if (companyId && certId) {
      certVals.push(`('${companyId}', '${certId}')`);
    }
  }
  
  for (const rel of companyBadges) {
    const companyId = companyIdMap.get(rel.companySlug);
    const badgeId = badgeMap.get(rel.value);
    if (companyId && badgeId) {
      badgeVals.push(`('${companyId}', '${badgeId}')`);
    }
  }
  
  // Batch insert in chunks of 100
  const chunkSize = 100;
  
  const batchExecute = async (table, values, chunkSize) => {
    for (let i = 0; i < values.length; i += chunkSize) {
      const chunk = values.slice(i, i + chunkSize);
      const sqlText = `INSERT INTO ${table} (company_id, ${table.split('_')[1]}_id) VALUES ${chunk.join(',')} ON CONFLICT DO NOTHING`;
      try {
        await sql.unsafe(sqlText);
      } catch (error) {
        console.error(`Error batch inserting ${table}:`, error.message);
      }
      if ((i / chunkSize + 1) % 10 === 0) {
        console.log(`  Inserted ${Math.min(i + chunkSize, values.length)}/${values.length} ${table} relations...`);
      }
    }
  };
  
  console.log('\nInserting relationships in batches...');
  
  await batchExecute('company_categories', catVals, chunkSize);
  await batchExecute('company_features', featVals, chunkSize);
  await batchExecute('company_integrations', intVals, chunkSize);
  await batchExecute('company_certifications', certVals, chunkSize);
  await batchExecute('company_badges', badgeVals, chunkSize);
  
  console.log('\n✅ All relationships inserted!');
  
  // Final verification
  const finalCounts = await Promise.all([
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
  
  console.log('\nFinal database state:');
  console.log(`  Categories: ${finalCounts[0][0].count} (unique)`);
  console.log(`  Features: ${finalCounts[1][0].count}`);
  console.log(`  Integrations: ${finalCounts[2][0].count}`);
  console.log(`  Certifications: ${finalCounts[3][0].count}`);
  console.log(`  Badges: ${finalCounts[4][0].count}`);
  console.log(`  Company-Category relations: ${finalCounts[5][0].count}`);
  console.log(`  Company-Feature relations: ${finalCounts[6][0].count}`);
  console.log(`  Company-Integration relations: ${finalCounts[7][0].count}`);
  console.log(`  Company-Certification relations: ${finalCounts[8][0].count}`);
  console.log(`  Company-Badge relations: ${finalCounts[9][0].count}`);
}

populateLookupAndRelations().catch(console.error);
