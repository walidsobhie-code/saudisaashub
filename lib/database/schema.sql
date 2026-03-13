-- Saudi SaaS Directory Database Schema
-- Compatible with PostgreSQL (Neon)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    founded_year INTEGER,
    headquarters VARCHAR(255),
    employees VARCHAR(50), -- e.g., "1-10", "11-50", "100+"
    funding VARCHAR(100), -- e.g., "Seed", "Series A", "Bootstrapped"
    website VARCHAR(500),
    logo_url TEXT,
    screenshots TEXT[], -- Array of screenshot URLs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for companies
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_headquarters ON companies(headquarters);
CREATE INDEX idx_companies_founded_year ON companies(founded_year);

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for categories
CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Create company_categories junction table
CREATE TABLE company_categories (
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (company_id, category_id)
);

-- Indexes for junction table
CREATE INDEX idx_company_categories_company ON company_categories(company_id);
CREATE INDEX idx_company_categories_category ON company_categories(category_id);

-- Create features table
CREATE TABLE features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for features
CREATE INDEX idx_features_name ON features(name);
CREATE INDEX idx_features_slug ON features(slug);

-- Create company_features junction table
CREATE TABLE company_features (
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (company_id, feature_id)
);

-- Indexes for junction table
CREATE INDEX idx_company_features_company ON company_features(company_id);
CREATE INDEX idx_company_features_feature ON company_features(feature_id);

-- Create integrations table
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100), -- e.g., "CRM", "E-commerce", "Payment"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for integrations
CREATE INDEX idx_integrations_name ON integrations(name);
CREATE INDEX idx_integrations_slug ON integrations(slug);
CREATE INDEX idx_integrations_category ON integrations(category);

-- Create company_integrations junction table
CREATE TABLE company_integrations (
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (company_id, integration_id)
);

-- Indexes for junction table
CREATE INDEX idx_company_integrations_company ON company_integrations(company_id);
CREATE INDEX idx_company_integrations_integration ON company_integrations(integration_id);

-- Create certifications table
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100), -- e.g., "Security", "Privacy", "Quality"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for certifications
CREATE INDEX idx_certifications_name ON certifications(name);
CREATE INDEX idx_certifications_slug ON certifications(slug);
CREATE INDEX idx_certifications_category ON certifications(category);

-- Create company_certifications junction table
CREATE TABLE company_certifications (
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
    issued_date DATE,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (company_id, certification_id)
);

-- Indexes for junction table
CREATE INDEX idx_company_certifications_company ON company_certifications(company_id);
CREATE INDEX idx_company_certifications_certification ON company_certifications(certification_id);

-- Create badges table
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color code
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for badges
CREATE INDEX idx_badges_name ON badges(name);
CREATE INDEX idx_badges_slug ON badges(slug);

-- Create company_badges junction table
CREATE TABLE company_badges (
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    awarded_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (company_id, badge_id)
);

-- Indexes for junction table
CREATE INDEX idx_company_badges_company ON company_badges(company_id);
CREATE INDEX idx_company_badges_badge ON company_badges(badge_id);

-- Create pricing_plans table
CREATE TABLE pricing_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('monthly', 'yearly', 'one-time', 'custom')),
    features_list TEXT[], -- Array of feature descriptions or references
    billing_cycle INTEGER, -- Number of months for billing cycle (null for one-time)
    trial_days INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for pricing_plans
CREATE INDEX idx_pricing_plans_company ON pricing_plans(company_id);
CREATE INDEX idx_pricing_plans_price ON pricing_plans(price);
CREATE INDEX idx_pricing_plans_frequency ON pricing_plans(frequency);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at on all tables
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_badges_updated_at BEFORE UPDATE ON badges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
