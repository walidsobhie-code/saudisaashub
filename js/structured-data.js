/**
 * SaudiSaaSHub - Structured Data Generator
 * Dynamically generates and injects schema.org markup for SEO
 */

const StructuredData = (() => {
  'use strict';

  // ============================================
  // UTILITIES
  // ============================================
  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const jsonLdScript = (data) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    return script;
  };

  const injectSchema = (data) => {
    // Remove existing schema with same @id if present
    const existing = document.querySelectorAll('script[type="application/ld+json"]');
    existing.forEach(el => {
      try {
        const parsed = JSON.parse(el.textContent);
        if (parsed['@id'] === data['@id']) {
          el.remove();
        }
      } catch (e) { /* ignore */ }
    });

    document.head.appendChild(jsonLdScript(data));
  };

  // ============================================
  // SCHEMA: Organization (Site-wide)
  // ============================================
  const generateOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://saudisaashub.com/#organization',
    'name': 'سعودي ساس هب',
    'alternateName': 'SaudiSaaSHub',
    'url': 'https://saudisaashub.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://saudisaashub.com/assets/logo.png',
      'width': 512,
      'height': 512
    },
    'description': 'الدليل الشامل لأفضل حلول SaaS في السوق السعودي. اكتشف، قارن، وقيّم أكثر من 500+ أداة سحابية.',
    'foundingDate': '2024-01-01',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'المنطقة المالية',
      'addressLocality': 'الرياض',
      'addressRegion': 'الرياض',
      'addressCountry': 'SA'
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Saudi Arabia'
    },
    'sameAs': [
      'https://twitter.com/saudisaashub',
      'https://linkedin.com/company/saudisaashub',
      'https://facebook.com/saudisaashub'
    ],
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+966-XX-XXX-XXXX',
        'contactType': 'customer service',
        'availableLanguage': ['Arabic', 'English']
      }
    ]
  });

  // ============================================
  // SCHEMA: WebSite + SearchAction
  // ============================================
  const generateWebSiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://saudisaashub.com/#website',
    'url': 'https://saudisaashub.com',
    'name': 'سعودي ساس هب',
    'description': 'الدليل الشامل لأفضل حلول SaaS في السعودية',
    'publisher': { '@id': 'https://saudisaashub.com/#organization' },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://saudisaashub.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    'inLanguage': ['ar-SA', 'en'],
    'copyrightHolder': { '@id': 'https://saudisaashub.com/#organization' }
  });

  // ============================================
  // SCHEMA: Software (Company Page)
  // ============================================
  const generateSoftwareSchema = (company) => {
    const baseUrl = `https://saudisaashub.com/company/${company.slug}`;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}#software`,
      'name': company.name,
      'version': company.version || '1.0',
      'url': baseUrl,
      'applicationCategory': company.categorySlug,
      'operatingSystem': company.platforms?.join(', ') || 'Web',
      'offers': {
        '@type': 'Offer',
        'price': company.pricing?.startingPrice || '0',
        'priceCurrency': company.pricing?.currency || 'SAR',
        'availability': company.pricing?.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      },
      'aggregateRating': company.rating ? {
        '@type': 'AggregateRating',
        'ratingValue': company.rating,
        'reviewCount': company.reviewCount || 0,
        'bestRating': 5,
        'worstRating': 1
      } : undefined,
      'description': company.description || company.shortDescription,
      'author': { '@id': 'https://saudisaashub.com/#organization' },
      'publisher': { '@id': 'https://saudisaashub.com/#organization' },
      'datePublished': company.createdAt,
      'dateModified': company.updatedAt,
      'image': company.logo || `${baseUrl}/logo.png`,
      'screenshot': company.screenshot || `${baseUrl}/preview.png`
    };

    // Remove undefined properties
    Object.keys(schema).forEach(key => schema[key] === undefined && delete schema[key]);

    return schema;
  };

  // ============================================
  // SCHEMA: CollectionPage (Category Page)
  // ============================================
  const generateCategorySchema = (category, companies) => {
    const baseUrl = `https://saudisaashub.com/category/${category.slug}`;
    const avgRating = companies.length > 0
      ? companies.reduce((sum, c) => sum + (c.rating || 0), 0) / companies.length
      : 0;

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${baseUrl}#collection`,
      'url': baseUrl,
      'name': category.name,
      'description': category.description || `تصفح أفضل أدوات ${category.name} في السعودية. أكثر من ${companies.length} أداة متاحة.`,
      'isPartOf': { '@id': 'https://saudisaashub.com/#website' },
      'about': { '@id': 'https://saudisaashub.com/#organization' },
      'hasPart': companies.slice(0, 20).map(company => ({
        '@type': 'SoftwareApplication',
        'name': company.name,
        'url': `https://saudisaashub.com/company/${company.slug}`,
        'description': company.shortDescription,
        'applicationCategory': category.slug
      })),
      'numberOfItems': companies.length,
      'averageRating': avgRating > 0 ? avgRating : undefined
    };
  };

  // ============================================
  // SCHEMA: Article (Blog Posts)
  // ============================================
  const generateArticleSchema = (article) => {
    const baseUrl = `https://saudisaashub.com/article/${article.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${baseUrl}#article`,
      'headline': article.title,
      'url': baseUrl,
      'image': article.featuredImage || 'https://saudisaashub.com/assets/images/article-default.jpg',
      'datePublished': article.publishedAt,
      'dateModified': article.updatedAt,
      'author': {
        '@type': 'Person',
        'name': article.author?.name || 'فريق سعودي ساس هب',
        'jobTitle': article.author?.title || 'كاتب'
      },
      'publisher': { '@id': 'https://saudisaashub.com/#organization' },
      'description': article.excerpt,
      'articleSection': article.category,
      'keywords': article.tags?.join(', ') || 'SaaS, السعودية, تقنية',
      'wordCount': article.wordCount,
      'inLanguage': 'ar-SA'
    };
  };

  // ============================================
  // SCHEMA: Event (SaaS Events/Webinars)
  // ============================================
  const generateEventSchema = (event) => {
    const baseUrl = `https://saudisaashub.com/event/${event.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      '@id': `${baseUrl}#event`,
      'name': event.title,
      'url': baseUrl,
      'description': event.description,
      'startDate': event.startDate,
      'endDate': event.endDate,
      'eventAttendanceMode': 'https://schema.org/OnlineEventAttendanceMode',
      'eventStatus': 'https://schema.org/EventScheduled',
      'location': {
        '@type': 'VirtualLocation',
        'url': event.url || baseUrl
      },
      'organizer': {
        '@type': 'Organization',
        'name': event.organizer || 'سعودي ساس هب',
        'url': 'https://saudisaashub.com'
      },
      'offers': event.isFree ? {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'SAR',
        'availability': 'https://schema.org/InStock'
      } : undefined,
      'inLanguage': 'ar-SA',
      'performers': event.speakers?.map(s => ({
        '@type': 'Person',
        'name': s.name,
        'jobTitle': s.title
      }))
    };
  };

  // ============================================
  // SCHEMA: Pagination (for paginated lists)
  // ============================================
  const generatePaginationSchema = (baseUrl, currentPage, totalPages, type = 'WebPage') => {
    const schemas = [];

    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': type === 'CollectionPage' ? 'CollectionPage' : 'WebPage',
        '@id': `${baseUrl}/${i === 1 ? '' : 'page/' + i}#${type}`,
        'url': i === 1 ? baseUrl : `${baseUrl}/page/${i}`,
        'name': i === 1 ? `قائمة ${type === 'CollectionPage' ? 'التصنيفات' : 'الشركات'}` : `صفحة ${i}`,
        'isPartOf': { '@id': 'https://saudisaashub.com/#website' },
        'pagination': {
          '@type': 'WebPageElement',
          'pagingMode': ' NextPage' in window && window.NextPage ? 'NextPage' : 'Page'
        }
      });
    }

    // Add rel=prev/next links in HTML head (for search engines that still use them)
    const head = document.head;
    if (currentPage > 1) {
      const prevLink = document.createElement('link');
      prevLink.rel = 'prev';
      prevLink.href = currentPage === 2 ? baseUrl : `${baseUrl}/page/${currentPage - 1}`;
      head.appendChild(prevLink);
    }
    if (currentPage < totalPages) {
      const nextLink = document.createElement('link');
      nextLink.rel = 'next';
      nextLink.href = `${baseUrl}/page/${currentPage + 1}`;
      head.appendChild(nextLink);
    }

    return schemas;
  };

  // ============================================
  // SCHEMA: BreadcrumbList
  // ============================================
  const generateBreadcrumbSchema = (items) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
  };

  // ============================================
  // INIT: Auto-generate based on page type
  // ============================================
  const init = () => {
    const body = document.body;
    const pageType = body.dataset.pageType || 'home';
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, '');

    // Always inject site-wide schemas
    injectSchema(generateOrganizationSchema());
    injectSchema(generateWebSiteSchema());

    // Page-specific schemas
    switch (pageType) {
      case 'company':
        const companyData = window.__COMPANY_DATA__;
        if (companyData) {
          injectSchema(generateSoftwareSchema(companyData));
          const breadcrumbs = [
            { name: 'الرئيسية', url: 'https://saudisaashub.com' },
            { name: 'الشركات', url: 'https://saudisaashub.com/companies' },
            { name: companyData.categoryName, url: `https://saudisaashub.com/category/${companyData.categorySlug}` },
            { name: companyData.name, url: baseUrl }
          ];
          injectSchema(generateBreadcrumbSchema(breadcrumbs));
        }
        break;

      case 'category':
        const categoryData = window.__CATEGORY_DATA__;
        const companies = window.__CATEGORY_COMPANIES__ || [];
        if (categoryData) {
          injectSchema(generateCategorySchema(categoryData, companies));
          const paginationSchemas = generatePaginationSchema(
            `https://saudisaashub.com/category/${categoryData.slug}`,
            categoryData.currentPage || 1,
            categoryData.totalPages || 1,
            'CollectionPage'
          );
          paginationSchemas.forEach(schema => injectSchema(schema));
        }
        break;

      case 'article':
        const articleData = window.__ARTICLE_DATA__;
        if (articleData) {
          injectSchema(generateArticleSchema(articleData));
        }
        break;

      case 'event':
        const eventData = window.__EVENT_DATA__;
        if (eventData) {
          injectSchema(generateEventSchema(eventData));
        }
        break;

      case 'search':
        // Search results page gets pagination schema
        const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
        const paginationSchemas = generatePaginationSchema(
          'https://saudisaashub.com/search',
          currentPage,
          100, // Max limit
          'WebPage'
        );
        paginationSchemas.forEach(schema => injectSchema(schema));
        break;

      default:
        // Home page
        const homeBreadcrumbs = [
          { name: 'الرئيسية', url: 'https://saudisaashub.com' }
        ];
        injectSchema(generateBreadcrumbSchema(homeBreadcrumbs));
    }

    console.log('✅ Structured data injected');
  };

  // Export for manual use in templates
  return {
    init,
    generateSoftwareSchema,
    generateCategorySchema,
    generateArticleSchema,
    generateEventSchema,
    generateBreadcrumbSchema,
    injectSchema
  };
})();

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', StructuredData.init);
} else {
  StructuredData.init();
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StructuredData;
}
