const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_q2Xm4DSHyfaV@ep-small-moon-ak984ke6-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sql = neon(DATABASE_URL);

async function setupDatabase() {
  console.log('Creating tables...');
  
  // Enable UUID extension
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    console.log('✅ UUID extension enabled');
  } catch (e) {
    console.log('UUID extension may already exist');
  }
  
  // Create tables one by one
  const tables = [
    `CREATE TABLE IF NOT EXISTS categories (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE TABLE IF NOT EXISTS features (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE TABLE IF NOT EXISTS integrations (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      category VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE TABLE IF NOT EXISTS certifications (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      category VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE TABLE IF NOT EXISTS badges (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      color VARCHAR(7) DEFAULT '#3B82F6',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE TABLE IF NOT EXISTS companies (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      founded_year INTEGER,
      headquarters VARCHAR(255),
      employees VARCHAR(50),
      funding VARCHAR(100),
      website VARCHAR(500),
      logo_url TEXT,
      screenshots TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE TABLE IF NOT EXISTS company_categories (
      company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (company_id, category_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS company_features (
      company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (company_id, feature_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS company_integrations (
      company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (company_id, integration_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS company_certifications (
      company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      certification_id UUID NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
      issued_date DATE,
      expiry_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (company_id, certification_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS company_badges (
      company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
      awarded_date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (company_id, badge_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS pricing_plans (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      plan_name VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('monthly', 'yearly', 'one-time', 'custom')),
      features_list TEXT[],
      billing_cycle INTEGER,
      trial_days INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`
  ];
  
  for (const sqlCreate of tables) {
    try {
      await sql`${sqlCreate}`;
      console.log('✅ Table created/verified');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }
  
  console.log('✅ All tables ready!');
}

setupDatabase().catch(console.error);
