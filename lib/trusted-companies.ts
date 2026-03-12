// Trusted companies that use/are featured on Saudi SaaS Hub
// These would be real companies - placeholder names for now
export interface TrustedCompany {
  name: string;
  logo: string; // URL to logo image (use placeholder or actual logo)
  website: string;
  industry: string;
}

export const trustedCompanies: TrustedCompany[] = [
  {
    name: 'Saudi Tech Ventures',
    logo: 'https://placehold.co/120x40?text=Saudi+Tech+Ventures',
    website: 'https://example.com',
    industry: 'Venture Capital'
  },
  {
    name: 'Riyadh Innovation',
    logo: 'https://placehold.co/120x40?text=Riyadh+Innovation',
    website: 'https://example.com',
    industry: 'Incubator'
  },
  {
    name: 'NEOM Tech',
    logo: 'https://placehold.co/120x40?text=NEOM+Tech',
    website: 'https://example.com',
    industry: 'Technology'
  },
  {
    name: 'STV',
    logo: 'https://placehold.co/120x40?text=STV',
    website: 'https://example.com',
    industry: 'Investor'
  },
  {
    name: 'Saudi Payments',
    logo: 'https://placehold.co/120x40?text=Saudi+Payments',
    website: 'https://example.com',
    industry: 'Fintech'
  },
  {
    name: 'ZATCA',
    logo: 'https://placehold.co/120x40?text=ZATCA',
    website: 'https://example.com',
    industry: 'Government'
  }
];
