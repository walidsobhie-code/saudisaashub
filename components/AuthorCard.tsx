'use client';

interface AuthorCardProps {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
}

const authors: Record<string, { name: string; role: string; bio: string }> = {
  'default': {
    name: 'فريق SaudiSaaSHub',
    role: 'فريق التحرير',
    bio: 'فريق متخصص في تغطية آخر مستجدات SaaS والتحول الرقمي في المملكة العربية السعودية',
  },
  'team': {
    name: 'Saudi SaaS Hub Team',
    role: 'Editorial Team',
    bio: 'Specialized team covering the latest in SaaS and digital transformation in Saudi Arabia',
  },
};

export function AuthorCard({ name }: AuthorCardProps) {
  const authorKey = name?.toLowerCase() || 'default';
  const author = authors[authorKey] || authors['default'];
  
  return (
    <div className="bg-card border border-white/10 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center text-white text-xl font-bold">
          {author.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-semibold">{author.name}</h4>
          <p className="text-accent-green text-sm">{author.role}</p>
          <p className="text-text-muted text-sm mt-2">{author.bio}</p>
        </div>
      </div>
    </div>
  );
}

export function AuthorBio() {
  return (
    <div className="bg-card/50 border border-white/5 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center text-white font-bold">
          S
        </div>
        <div>
          <p className="text-white font-medium">SaudiSaaSHub</p>
          <p className="text-text-muted text-sm">المصدرك الأول لـ SaaS في السعودية</p>
        </div>
      </div>
    </div>
  );
}
