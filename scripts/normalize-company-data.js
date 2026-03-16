const fs = require('fs');
const path = require('path');

const companies = JSON.parse(fs.readFileSync('./lib/companies.json', 'utf8'));

interface Company {
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
  categories?: any[];
  integrations?: any[];
  certifications?: any[];
  pricing_plans?: any[];
  // ... other fields
}

// Normalize integrations: if array of strings, convert to objects
function normalizeIntegrations(integrations: any[]): any[] {
  if (!integrations || integrations.length === 0) return [];
  // If already objects with name/slug, keep
  if (typeof integrations[0] === 'object' && integrations[0] !== null) {
    return integrations.map((int, idx) => ({
      id: int.id || String(idx),
      name: int.name,
      slug: int.slug || int.name?.toLowerCase().replace(/\s+/g, '-') || `integration-${idx}`
    }));
  }
  // If strings, convert
  return integrations.map((name, idx) => ({
    id: `int-${idx}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }));
}

// Normalize certifications: similar
function normalizeCertifications(certs: any[]): any[] {
  if (!certs || certs.length === 0) return [];
  if (typeof certs[0] === 'object' && certs[0] !== null) {
    return certs.map((cert, idx) => ({
      id: cert.id || String(idx),
      name: cert.name,
      slug: cert.slug || cert.name?.toLowerCase().replace(/\s+/g, '-') || `cert-${idx}`,
      category: cert.category
    }));
  }
  return certs.map((name, idx) => ({
    id: `cert-${idx}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }));
}

// Normalize pricing_plans to expected shape
function normalizePricingPlans(plans: any[]): any[] {
  if (!plans || plans.length === 0) return [];
  return plans.map((plan, idx) => {
    // If already in correct shape, keep
    if (plan.plan_name !== undefined) {
      return {
        id: plan.id || `plan-${idx}`,
        plan_name: plan.plan_name,
        price: typeof plan.price === 'number' ? plan.price : 0,
        frequency: plan.frequency || 'monthly',
        features_list: plan.features_list || plan.features || [],
        is_active: plan.is_active !== undefined ? plan.is_active : true,
        trial_days: plan.trial_days || 0
      };
    }
    // Convert from agent format (tier, price, currency, billing_cycle, features, limits)
    let priceNum = 0;
    if (typeof plan.price === 'number') priceNum = plan.price;
    else if (typeof plan.price === 'string') {
      const extracted = plan.price.replace(/[^0-9]/g, '');
      priceNum = extracted ? parseInt(extracted) : 0;
    }
    
    const frequencyMap: Record<string, string> = {
      'monthly': 'monthly',
      'annual': 'annual',
      'yearly': 'annual',
      'custom': 'annual',
      'once': 'one-time'
    };
    const frequency = frequencyMap[plan.billing_cycle?.toLowerCase()] || 'monthly';
    
    return {
      id: `plan-${idx}`,
      plan_name: plan.tier || `Plan ${idx + 1}`,
      price: priceNum,
      frequency,
      features_list: plan.features || plan.features_list || [],
      is_active: true,
      trial_days: 0
    };
  });
}

// Normalize categories if needed
function normalizeCategories(categories: any[]): any[] {
  if (!categories || categories.length === 0) return [];
  if (typeof categories[0] === 'object' && categories[0] !== null) {
    return categories.map((cat, idx) => ({
      id: cat.id || String(idx),
      name: cat.name,
      slug: cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-') || `cat-${idx}`
    }));
  }
  return categories.map((name, idx) => ({
    id: `cat-${idx}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }));
}

// Process all companies
let changed = 0;
for (const company of companies) {
  let companyChanged = false;

  if (company.integrations) {
    const normalized = normalizeIntegrations(company.integrations);
    if (JSON.stringify(normalized) !== JSON.stringify(company.integrations)) {
      company.integrations = normalized;
      companyChanged = true;
    }
  }

  if (company.certifications) {
    const normalized = normalizeCertifications(company.certifications);
    if (JSON.stringify(normalized) !== JSON.stringify(company.certifications)) {
      company.certifications = normalized;
      companyChanged = true;
    }
  }

  if (company.pricing_plans) {
    const normalized = normalizePricingPlans(company.pricing_plans);
    if (JSON.stringify(normalized) !== JSON.stringify(company.pricing_plans)) {
      company.pricing_plans = normalized;
      companyChanged = true;
    }
  }

  if (company.categories) {
    const normalized = normalizeCategories(company.categories);
    if (JSON.stringify(normalized) !== JSON.stringify(company.categories)) {
      company.categories = normalized;
      companyChanged = true;
    }
  }

  if (companyChanged) changed++;
}

console.log(`Normalized ${changed} companies`);

// Write back
import { writeFileSync } from 'fs';
writeFileSync('./lib/companies.json', JSON.stringify(companies, null, 2));
console.log('File updated');
