import companiesData from './companies.json' assert { type: 'json' };

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
  categories?: Array<{ id: string; name: string; slug: string }>;
  integrations?: Array<{ id: string; name: string; slug: string }>;
  certifications?: Array<{ id: string; name: string; slug: string; category?: string }>;
  badges?: Array<{ id: string; name: string; slug: string; color: string }>;
  pricing_plans?: Array<{
    id?: string;
    plan_name: string;
    price: number;
    frequency: string;
    features_list?: string[];
    is_active?: boolean;
    trial_days?: number;
  }>;
  screenshot_urls?: string[] | null;
  created_at: string;
  updated_at: string;
}

// Mock timestamps (since no DB)
const now = new Date().toISOString();

// Convert string arrays to expected object shape
const normalizeCompany = (c: any): Company => {
  const toObjArray = (arr: string[] | undefined) =>
    arr?.map((name, idx) => ({
      id: `${c.id}-${idx}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    })) || [];

  return {
    ...c,
    categories: toObjArray(c.categories),
    integrations: toObjArray(c.integrations),
    certifications: toObjArray(c.certifications),
    badges: toObjArray(c.badges).map(b => ({ ...b, color: '#3B82F6' })),
    pricing_plans: c.pricing_plans?.map((p: any) => ({
      id: p.id || `${c.id}-${p.plan_name}`,
      plan_name: p.plan_name,
      price: p.price,
      frequency: p.frequency,
      features_list: p.features_list,
      is_active: p.is_active ?? true,
      trial_days: p.trial_days ?? 0,
    })) || [],
    screenshot_urls: c.screenshot_urls || [],
    created_at: now,
    updated_at: now,
  };
};

const companies: Company[] = companiesData.map(normalizeCompany);

export async function getAllCompaniesDB(): Promise<Company[]> {
  return companies;
}

export async function getCompanyBySlugDB(slug: string): Promise<Company | null> {
  return companies.find(c => c.slug === slug) || null;
}

export async function getCompaniesByCategoryDB(categorySlug: string): Promise<Company[]> {
  return companies.filter(c => c.categories?.some(cat => cat.slug === categorySlug));
}

export async function searchCompaniesDB(query: string): Promise<Company[]> {
  const lower = query.toLowerCase();
  return companies.filter(c => 
    c.name.toLowerCase().includes(lower) || 
    c.description.toLowerCase().includes(lower)
  );
}

export async function getAllCategoriesDB(): Promise<Array<{ id: string; name: string; slug: string }>> {
  const allCategories = new Set<string>();
  companies.forEach(c => {
    c.categories?.forEach(cat => allCategories.add(cat.name));
  });
  return Array.from(allCategories).map((name, idx) => ({
    id: String(idx),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function getAllCertificationsDB(): Promise<Array<{ id: string; name: string; slug: string; category?: string }>> {
  const allCerts = new Set<string>();
  companies.forEach(c => {
    c.certifications?.forEach(cert => allCerts.add(cert.name));
  });
  return Array.from(allCerts).map((name, idx) => ({
    id: String(idx),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function getUniqueEmployeeSizesDB(): Promise<string[]> {
  const sizes = new Set<string>();
  companies.forEach(c => {
    if (c.employees) sizes.add(c.employees);
  });
  return Array.from(sizes).sort();
}
