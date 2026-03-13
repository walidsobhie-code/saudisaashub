'use server';

import { redirect } from 'next/navigation';
import { query } from '@/lib/db';

// Types
export type Company = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  founded_year: number | null;
  headquarters: string | null;
  employees: string | null;
  funding: string | null;
  website: string | null;
  logo_url: string | null;
  pricing_plans: any[] | null;
  screenshot_urls: string[] | null;
  created_at: Date;
  updated_at: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Feature = {
  id: string;
  name: string;
  slug: string;
};

export type Integration = {
  id: string;
  name: string;
  slug: string;
};

export type Certification = {
  id: string;
  name: string;
  slug: string;
};

export type Badge = {
  id: string;
  name: string;
  slug: string;
};

// Get all companies
export async function getCompanies(): Promise<Company[]> {
  const res = await query(`
    SELECT c.* FROM companies c
    ORDER BY c.created_at DESC
  `);
  return res.rows;
}

// Get single company
export async function getCompany(id: string): Promise<Company | null> {
  const res = await query(
    'SELECT * FROM companies WHERE id = $1',
    [id]
  );
  return res.rows[0] || null;
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const res = await query('SELECT * FROM categories ORDER BY name');
  return res.rows;
}

// Get all features
export async function getFeatures(): Promise<Feature[]> {
  const res = await query('SELECT * FROM features ORDER BY name');
  return res.rows;
}

// Get all integrations
export async function getIntegrations(): Promise<Integration[]> {
  const res = await query('SELECT * FROM integrations ORDER BY name');
  return res.rows;
}

// Get all certifications
export async function getCertifications(): Promise<Certification[]> {
  const res = await query('SELECT * FROM certifications ORDER BY name');
  return res.rows;
}

// Get all badges
export async function getBadges(): Promise<Badge[]> {
  const res = await query('SELECT * FROM badges ORDER BY name');
  return res.rows;
}

// Create company server action
export async function createCompanyAction(formData: FormData): Promise<void> {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const founded_year = formData.get('founded_year') as string;
  const headquarters = formData.get('headquarters') as string;
  const employees = formData.get('employees') as string;
  const funding = formData.get('funding') as string;
  const website = formData.get('website') as string;
  const logo_url = formData.get('logo_url') as string;

  // Handle multi-select arrays
  const category_ids = formData.getAll('category_ids') as string[];
  const feature_ids = formData.getAll('feature_ids') as string[];
  const integration_ids = formData.getAll('integration_ids') as string[];
  const certification_ids = formData.getAll('certification_ids') as string[];
  const badge_ids = formData.getAll('badge_ids') as string[];

  // Handle pricing plans JSON
  const pricing_plans_raw = formData.get('pricing_plans') as string;
  let pricing_plans = null;
  if (pricing_plans_raw && pricing_plans_raw.trim() !== '') {
    try {
      pricing_plans = JSON.parse(pricing_plans_raw);
    } catch (e) {
      throw new Error('Invalid JSON for pricing_plans');
    }
  }

  await query(
    `INSERT INTO companies (
      name, slug, description, founded_year, headquarters,
      employees, funding, website, logo_url, pricing_plans
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      name,
      slug,
      description || null,
      founded_year ? parseInt(founded_year) : null,
      headquarters || null,
      employees || null,
      funding || null,
      website || null,
      logo_url || null,
      pricing_plans
    ]
  );

  redirect('/admin/companies');
}

// Update company server action - will be called from an API route with ID param
export async function updateCompanyAction(id: string, formData: FormData): Promise<void> {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const founded_year = formData.get('founded_year') as string;
  const headquarters = formData.get('headquarters') as string;
  const employees = formData.get('employees') as string;
  const funding = formData.get('funding') as string;
  const website = formData.get('website') as string;
  const logo_url = formData.get('logo_url') as string;

  // Handle multi-select arrays
  const category_ids = formData.getAll('category_ids') as string[];
  const feature_ids = formData.getAll('feature_ids') as string[];
  const integration_ids = formData.getAll('integration_ids') as string[];
  const certification_ids = formData.getAll('certification_ids') as string[];
  const badge_ids = formData.getAll('badge_ids') as string[];

  // Handle pricing plans JSON
  const pricing_plans_raw = formData.get('pricing_plans') as string;
  let pricing_plans = null;
  if (pricing_plans_raw && pricing_plans_raw.trim() !== '') {
    try {
      pricing_plans = JSON.parse(pricing_plans_raw);
    } catch (e) {
      throw new Error('Invalid JSON for pricing_plans');
    }
  }

  await query(
    `UPDATE companies SET
      name = $1, slug = $2, description = $3, founded_year = $4,
      headquarters = $5, employees = $6, funding = $7,
      website = $8, logo_url = $9, pricing_plans = $10,
      updated_at = NOW()
    WHERE id = $11`,
    [
      name,
      slug,
      description || null,
      founded_year ? parseInt(founded_year) : null,
      headquarters || null,
      employees || null,
      funding || null,
      website || null,
      logo_url || null,
      pricing_plans,
      id
    ]
  );

  // Update relationships
  await query('DELETE FROM company_categories WHERE company_id = $1', [id]);
  await query('DELETE FROM company_features WHERE company_id = $1', [id]);
  await query('DELETE FROM company_integrations WHERE company_id = $1', [id]);
  await query('DELETE FROM company_certifications WHERE company_id = $1', [id]);
  await query('DELETE FROM company_badges WHERE company_id = $1', [id]);

  for (const cat_id of category_ids) {
    await query(
      'INSERT INTO company_categories (company_id, category_id) VALUES ($1, $2)',
      [id, cat_id]
    );
  }

  for (const feat_id of feature_ids) {
    await query(
      'INSERT INTO company_features (company_id, feature_id) VALUES ($1, $2)',
      [id, feat_id]
    );
  }

  for (const int_id of integration_ids) {
    await query(
      'INSERT INTO company_integrations (company_id, integration_id) VALUES ($1, $2)',
      [id, int_id]
    );
  }

  for (const cert_id of certification_ids) {
    await query(
      'INSERT INTO company_certifications (company_id, certification_id) VALUES ($1, $2)',
      [id, cert_id]
    );
  }

  for (const badge_id of badge_ids) {
    await query(
      'INSERT INTO company_badges (company_id, badge_id) VALUES ($1, $2)',
      [id, badge_id]
    );
  }

  redirect('/admin/companies');
}

// Delete company server action
export async function deleteCompanyAction(id: string): Promise<void> {
  await query('DELETE FROM companies WHERE id = $1', [id]);
}
