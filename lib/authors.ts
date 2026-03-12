// Author data and types
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const authors: Author[] = [
  {
    id: 'saudi-saas-hub',
    name: 'Saudi SaaS Hub',
    bio: 'المصدر الأول لـ SaaS والأعمال التقنية في المملكة العربية السعودية. نقدم أحدث أخبار التقنية والشركات الناشئة والرؤى السوقية.',
    avatar: '/authors/saudi-saas-hub.png',
    role: 'فريق التحرير',
    social: {
      twitter: 'https://x.com/SaudiSaaSHub',
      linkedin: 'https://www.linkedin.com/company/saudisaashub/',
    },
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getDefaultAuthor(): Author {
  return authors[0];
}
