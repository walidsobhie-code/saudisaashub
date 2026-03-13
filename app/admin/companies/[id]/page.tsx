'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCompany, getCategories, getFeatures, getIntegrations, getCertifications, getBadges } from '../../actions';

type Company = {
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
  created_at: Date;
  updated_at: Date;
};

type Option = { id: string; name: string; slug: string };

export default function EditCompanyPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.id as string;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  const [categories, setCategories] = useState<Option[]>([]);
  const [features, setFeatures] = useState<Option[]>([]);
  const [integrations, setIntegrations] = useState<Option[]>([]);
  const [certifications, setCertifications] = useState<Option[]>([]);
  const [badges, setBadges] = useState<Option[]>([]);

  // Example JSON for pricing plans
  const pricingExample = '[{"plan_name": "Basic", "price": 99, "frequency": "monthly", "features_list": ["Feature 1", "Feature 2"]}]';

  useEffect(() => {
    async function loadData() {
      try {
        const [companyData, cats, feats, ints, certs, badgs] = await Promise.all([
          getCompany(companyId),
          getCategories(),
          getFeatures(),
          getIntegrations(),
          getCertifications(),
          getBadges(),
        ]);

        if (!companyData) {
          setError('Company not found');
          setLoading(false);
          return;
        }

        setCompany(companyData);

        // Fetch current relationships
        const relations = await fetch(`/admin/companies/${companyId}/relations`).then((r) => r.json());

        setSelectedCategories(relations.categories || []);
        setSelectedFeatures(relations.features || []);
        setSelectedIntegrations(relations.integrations || []);
        setSelectedCertifications(relations.certifications || []);
        setSelectedBadges(relations.badges || []);

        setCategories(cats);
        setFeatures(feats);
        setIntegrations(ints);
        setCertifications(certs);
        setBadges(badgs);
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load company data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [companyId]);

  async function handleSubmit(formData: FormData) {
    setError(null);

    // Add selected IDs to form data
    selectedCategories.forEach((id) => formData.append('category_ids', id));
    selectedFeatures.forEach((id) => formData.append('feature_ids', id));
    selectedIntegrations.forEach((id) => formData.append('integration_ids', id));
    selectedCertifications.forEach((id) => formData.append('certification_ids', id));
    selectedBadges.forEach((id) => formData.append('badge_ids', id));

    try {
      const response = await fetch(`/admin/actions?action=update&id=${companyId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update company');
      }

      router.push('/admin/companies');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  const toggleSelection = (
    type: 'categories' | 'features' | 'integrations' | 'certifications' | 'badges',
    id: string
  ) => {
    const setters = {
      categories: setSelectedCategories,
      features: setSelectedFeatures,
      integrations: setSelectedIntegrations,
      certifications: setSelectedCertifications,
      badges: setSelectedBadges,
    };

    const setter = setters[type];
    setter((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading company data...</div>
      </div>
    );
  }

  if (error && !company) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-gray-500">Company not found.</div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Company</h1>
        <p className="text-gray-600 mt-1">
          Update details for {company.name}.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={company.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                defaultValue={company.slug}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={company.description || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                defaultValue={company.website || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                type="text"
                id="logo_url"
                name="logo_url"
                defaultValue={company.logo_url || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="founded_year" className="block text-sm font-medium text-gray-700 mb-1">
                Founded Year
              </label>
              <input
                type="number"
                id="founded_year"
                name="founded_year"
                min="1900"
                max="2100"
                defaultValue={company.founded_year || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="headquarters" className="block text-sm font-medium text-gray-700 mb-1">
                Headquarters
              </label>
              <input
                type="text"
                id="headquarters"
                name="headquarters"
                defaultValue={company.headquarters || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                Employees
              </label>
              <input
                type="text"
                id="employees"
                name="employees"
                defaultValue={company.employees || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="funding" className="block text-sm font-medium text-gray-700 mb-1">
                Funding
              </label>
              <input
                type="text"
                id="funding"
                name="funding"
                defaultValue={company.funding || ''}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Multi-select Fields */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Classifications</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleSelection('categories', cat.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-700">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {features.map((feat) => (
                  <label key={feat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feat.id)}
                      onChange={() => toggleSelection('features', feat.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-700">{feat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Integrations
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {integrations.map((int) => (
                  <label key={int.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIntegrations.includes(int.id)}
                      onChange={() => toggleSelection('integrations', int.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-700">{int.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {certifications.map((cert) => (
                  <label key={cert.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert.id)}
                      onChange={() => toggleSelection('certifications', cert.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-700">{cert.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badges
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {badges.map((badge) => (
                  <label key={badge.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBadges.includes(badge.id)}
                      onChange={() => toggleSelection('badges', badge.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-700">{badge.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing Plans</h2>
          <div>
            <label htmlFor="pricing_plans" className="block text-sm font-medium text-gray-700 mb-1">
              Pricing Plans (JSON)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Enter a JSON array of pricing plans. Example:
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs mr-1">
                {pricingExample}
              </code>
            </p>
            <textarea
              id="pricing_plans"
              name="pricing_plans"
              rows={4}
              defaultValue={company.pricing_plans ? JSON.stringify(company.pricing_plans, null, 2) : ''}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder='[{"plan_name": "Basic", "price": 99, "frequency": "monthly", "features_list": ["Feature 1", "Feature 2"]}]'
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3 space-x-reverse">
          <button
            type="button"
            onClick={() => router.push('/admin/companies')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
