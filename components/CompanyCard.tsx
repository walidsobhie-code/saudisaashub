'use client';

import React from 'react';
import Image from 'next/image';
import { Company } from '@/lib/db-companies';

interface Props {
  company: Company;
}

export default function CompanyCard({ company }: Props) {
  // Safely extract values
  const name = company.name || 'Unknown';
  const slug = company.slug || '';
  const description = company.description || '';
  const logo_url = company.logo_url;
  const employees = company.employees || '';
  const funding = company.funding || '';
  const headquarters = company.headquarters || '';

  // Truncate description
  const shortDesc = description.length > 120
    ? description.substring(0, 120) + '...'
    : description;

  // Get first letter safely
  const firstLetter = name ? name.charAt(0) : '?';

  return (
    <div className="group card hover:scale-[1.02] transition-all duration-300 overflow-hidden h-full border border-[var(--color-border)] rounded-xl">
      <div className="p-6">
        {/* Logo and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-elevated border border-white/10">
            {logo_url ? (
              <Image
                src={logo_url}
                alt={`${name} logo`}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              // Saudi-themed placeholder: gradient with Arabic/flag colors
              <div className="w-full h-full bg-gradient-to-br from-accent-green/20 via-purple-500/20 to-accent-cyan/20 flex items-center justify-center">
                <span className="text-xl font-bold text-white/80">{firstLetter}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-accent-green transition-colors">
              {name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {shortDesc || 'لا يوجد وصف'}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
          {headquarters && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {headquarters}
            </span>
          )}
          {employees && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {employees}
            </span>
          )}
          {funding && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {funding}
            </span>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 via-transparent to-accent-cyan/5" />
      </div>
    </div>
  );
}
