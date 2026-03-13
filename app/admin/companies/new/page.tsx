'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getCategories, getFeatures, getIntegrations, getCertifications, getBadges, createCompanyAction } from '../../actions';

type Option = { id: string; name: string; slug: string };

export default function NewCompanyPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Option[]>([]);
  const [features, setFeatures] = useState<Option[]>([]);
  const [integrations, setIntegrations] = useState<Option[]>([]);
  const [certifications, setCertifications] = useState<Option[]>([]);
  const [badges, setBadges] = useState<Option[]>([]);

  // Example JSON for pricing plans
  const pricingExample = '[{"plan_name": "Basic", "price": 99, "frequency": "monthly", "features_list": ["Feature 1", "Feature 2"]}]';

  useEffect(() => {
    async function loadOptions() {
      try {
        const [cats, feats, ints, certs, badgs] = await Promise.all([
          getCategories(),
          getFeatures(),
          getIntegrations(),
          getCertifications(),
          getBadges(),
        ]);
        setCategories(cats);
        setFeatures(feats);
        setIntegrations(ints);
        setCertifications(certs);
        setBadges(badgs);
      } catch (error) {
        console.error('Failed to load options:', error);
        setError('Failed to load form options. Please refresh and try again.');
      }
    }
    loadOptions();
  }, []);

  async function handleSubmit(formData: FormData) {
    setError(null);

    try {
      const response = await fetch('/admin/actions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create company');
      }

      router.push('/admin/companies');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  if (error && categories.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Company</h1>
        <p className="text-gray-600 mt-1">
          Fill in the details below to add a new SaaS company.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form action={createCompanyAction} className="bg-white shadow rounded-lg p-6 space-y-6">
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Salla"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., salla"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the company..."
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/logo.png"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2015"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Riyadh, Saudi Arabia"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 100-500, 1000+"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Seed, Series A, Bootstrapped"
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
                      name="category_ids"
                      value={cat.id}
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
                      name="feature_ids"
                      value={feat.id}
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
                      name="integration_ids"
                      value={int.id}
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
                      name="certification_ids"
                      value={cert.id}
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
                      name="badge_ids"
                      value={badge.id}
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
            {isPending ? 'Creating...' : 'Create Company'}
          </button>
        </div>
      </form>
    </div>
  );
}
