import { sql } from './neon';

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  founded_year: number | null;
  headquarters: string;
  employees: string;
  funding: string;
  website: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Feature {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
}

// Fetch all companies from database (without relationships for now)
export async function getAllCompaniesDB(): Promise<Company[]> {
  const result = await sql`
    SELECT id, name, slug, description, founded_year, headquarters, employees, funding, website, logo_url, created_at, updated_at
    FROM companies
    ORDER BY name
  `;
  return result as Company[];
}

// Get company by slug with basic info
export async function getCompanyBySlugDB(slug: string): Promise<Company | null> {
  const result = await sql`
    SELECT * FROM companies WHERE slug = ${slug} LIMIT 1
  `;
  return result.length > 0 ? (result[0] as Company) : null;
}

// Get all categories (lookup table)
export async function getAllCategoriesDB(): Promise<Category[]> {
  const result = await sql`
    SELECT id, name, slug, description FROM categories ORDER BY name
  `;
  return result as Category[];
}

// Get all certifications (lookup table)
export async function getAllCertificationsDB(): Promise<Certification[]> {
  const result = await sql`
    SELECT id, name, slug, description, category FROM certifications ORDER BY name
  `;
  return result as Certification[];
}

// Get unique employee sizes from companies
export async function getUniqueEmployeeSizesDB(): Promise<string[]> {
  const result = await sql`
    SELECT DISTINCT employees FROM companies WHERE employees IS NOT NULL AND employees != '' ORDER BY employees
  `;
  return result.map(r => r.employees);
}

// Search companies by name/description
export async function searchCompaniesDB(query: string): Promise<Company[]> {
  const lowerQuery = `%${query.toLowerCase()}%`;
  const result = await sql`
    SELECT id, name, slug, description, founded_year, headquarters, employees, funding, website, logo_url, created_at, updated_at
    FROM companies
    WHERE LOWER(name) LIKE ${lowerQuery} OR LOWER(description) LIKE ${lowerQuery}
    ORDER BY name
  `;
  return result as Company[];
}

// Filter companies by category (requires relationships - will return empty for now)
export async function getCompaniesByCategoryDB(categorySlug: string): Promise<Company[]> {
  // This will work after relationships are added
  return [];
}

// Filter companies by certification (requires relationships)
export async function filterCompaniesByCertificationDB(certSlug: string): Promise<Company[]> {
  return [];
}
