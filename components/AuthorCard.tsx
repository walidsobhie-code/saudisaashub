// Author Card Component
import Link from 'next/link';
import { Author } from '@/lib/authors';

interface AuthorCardProps {
  author: Author;
  size?: 'sm' | 'md' | 'lg';
}

export function AuthorCard({ author, size = 'md' }: AuthorCardProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-lg',
  };

  const nameSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-accent-green/20 to-purple-500/20 flex items-center justify-center text-accent-green font-bold`}
      >
        {author.name ? author.name.charAt(0) : '?'}
      </div>
      <div>
        <h4 className={`${nameSize[size]} font-semibold text-white`}>
          {author.name}
        </h4>
        <p className="text-text-muted text-sm">{author.role}</p>
      </div>
    </div>
  );
}

// Author Bio Box for Article Pages
interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="flex items-start gap-4 p-6 bg-card/50 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-green/20 to-purple-500/20 flex items-center justify-center text-accent-green text-xl font-bold flex-shrink-0">
          {author.name ? author.name.charAt(0) : '?'}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{author.name}</h4>
          <p className="text-text-secondary text-sm mb-3">{author.bio}</p>
          <div className="flex items-center gap-4">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-green transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-green transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
