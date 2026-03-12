# SaudiSaaSHub API Documentation

## Base URL

```
Production: https://saudisaashub.com/api
Staging:    https://staging.saudisaashub.com/api
Development: http://localhost:3000/api
```

## General Conventions

- **Response Format**: JSON
- ** Authentication**: Bearer token (optional for public endpoints)
- **Rate Limiting**: 100 requests per minute per IP
- **CORS**: Enabled for all origins (adjust for production)
- **Pagination**: `page` (default 1), `limit` (default 20)
- **Sorting**: `sort` parameter (e.g., `rating`, `name`, `created_at`)
- **Filtering**: `filter[field]=value` (multiple filters allowed)
- **Search**: `q` parameter for full-text search

---

## Endpoints

### 1. Categories

#### GET /categories
Get all categories with company counts.

**Query Parameters:**
- `lang` (optional): `ar` or `en` (default: `ar`)
- `include` (optional): Comma-separated fields to include (`companies`, `count`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "crm",
      "name": "إدارة relations مع العملاء",
      "name_en": "CRM",
      "slug": "crm",
      "description": "أدوات لإدارة علاقات العملاء والمبيعات",
      "icon": "<svg>...</svg>",
      "count": 45,
      "color": "#1e3a5f",
      "featured": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "count": 12
  }
}
```

---

### 2. Companies

#### GET /companies
List all companies with filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `category` (optional): Filter by category slug
- `q` (optional): Search query (searches name, description, tags)
- `sort` (optional): `rating`, `name`, `created_at`, `review_count` (default: `rating`)
- `order` (optional): `asc` or `desc` (default: `desc` for rating)
- `featured` (optional): `true` or `false`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "salesforce",
      "name": "Salesforce",
      "slug": "salesforce",
      "shortDescription": "أقوى منصة CRM في العالم",
      "description": "Salesforce هي منصة إدارة علاقات العملاء الرائدة عالمياً...",
      "category": "crm",
      "categoryName": "إدارة relations مع العملاء",
      "categorySlug": "crm",
      "logo": "https://saudisaashub.com/assets/logos/companies/salesforce.png",
      "rating": 4.8,
      "reviewCount": 1250,
      "pricing": {
        "startingPrice": "200",
        "currency": "SAR",
        "available": true,
        "model": "per_user_monthly"
      },
      "platforms": ["Web", "iOS", "Android"],
      "features": ["contact_management", "sales_automation", "analytics"],
      "url": "https://salesforce.com",
      "isFree": false,
      "freeTrial": true,
      "trialDays": 30,
      "featured": true,
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-03-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 542,
    "page": 1,
    "limit": 20,
    "totalPages": 28
  }
}
```

---

#### GET /companies/featured
Get featured companies (for homepage).

**Query Parameters:**
- `limit` (optional): Number of companies (default: 8)

**Response:**
```json
{
  "success": true,
  "data": [ /* array of company objects */ ]
}
```

---

#### GET /companies/:slug
Get single company details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "salesforce",
    "name": "Salesforce",
    "slug": "salesforce",
    "shortDescription": "...",
    "description": "...",
    "category": { /* full category object */ },
    "logo": "...",
    "screenshots": ["url1", "url2", "url3"],
    "video": "https://youtube.com/embed/...",
    "rating": 4.8,
    "reviewCount": 1250,
    "reviews": [
      {
        "id": "rev1",
        "author": "Ahmed Al-Saud",
        "company": "AlRiyadh Corp",
        "rating": 5,
        "title": "أفضل استثمار على الإطلاق",
        "content": "ساعدنا Salesforce على زيادة المبيعات بنسبة 40%...",
        "verified": true,
        "createdAt": "2024-02-15"
      }
    ],
    "pricing": { /* full pricing object */ },
    "comparisons": ["hubspot", "zoho", "pipedrive"],
    "features": [
      { "name": "إدارة الاتصالات", "available": true },
      { "name": "الأتمتة", "available": true },
      { "name": "تقارير متقدمة", "available": true }
    ],
    "integrations": ["slack", "teams", "gmail", "office365"],
    "alternatives": ["hubspot", "zoho"]
  }
}
```

---

#### POST /companies
Submit a new company (for "Add Your Company" form).

**Authentication Required**: Yes (API key or JWT)

**Request Body:**
```json
{
  "name": "ContaaS",
  "email": "info@contaa.sa",
  "category": "accounting",
  "shortDescription": "برنامج محاسبة متكامل للشركات السعودية",
  "description": "...",
  "logo": "https://uploaded-file-url.com/logo.png",
  "website": "https://contaa.sa",
  "pricing": {
    "startingPrice": 299,
    "currency": "SAR",
    "model": "monthly"
  },
  "isFree": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم استلام طلبك. سنقوم بمراجعته خلال 2-3 أيام عمل.",
  "data": {
    "id": "temp_123",
    "status": "pending_review"
  }
}
```

---

### 3. Search

#### GET /search
Full-text search across companies.

**Query Parameters:**
- `q` (required): Search query (min 2 characters)
- `page` (optional)
- `limit` (optional)
- `category` (optional): Filter by category
- `sort` (optional)

**Response:**
```json
{
  "success": true,
  "data": [ /* array of company objects */ ],
  "meta": {
    "total": 125,
    "query": "crm",
    "executionTimeMs": 45,
    "suggestions": ["CRM", "salesforce", "hubspot"]
  }
}
```

---

### 4. Articles

#### GET /articles
List articles with pagination.

**Query Parameters:**
- `page`, `limit`
- `category` (optional)
- `tag` (optional)
- `sort` (optional): `published_at`, `popular`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "best-crm-2024",
      "title": "أفضل 10 أدوات CRM للسعودية في 2024",
      "slug": "best-crm-saudi-arabia-2024",
      "excerpt": "دليل شامل لاختيار أفضل نظام إدارة relations مع العملاء...",
      "content": "Full HTML content here...",
      "featuredImage": "https://saudisaashub.com/assets/images/articles/crm-2024.jpg",
      "category": "crm",
      "tags": ["CRM", "SaaS", "2024", "مقارنة"],
      "author": {
        "name": "فريق سعودي ساس هب",
        "avatar": "...",
        "title": "محلل SaaS"
      },
      "publishedAt": "2024-03-01T00:00:00Z",
      "updatedAt": "2024-03-05T00:00:00Z",
      "wordCount": 2450,
      "readTime": 12,
      "viewCount": 5432
    }
  ],
  "meta": { /* pagination */ }
}
```

---

#### GET /articles/:slug
Get single article.

**Response:** Full article object with `content` (HTML) and related companies.

---

### 5. Events

#### GET /events
List upcoming events.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "saudi-saas-summit-2024",
      "title": "قمة SaaS السعودية 2024",
      "slug": "saudi-saas-summit-2024",
      "description": "...",
      "startDate": "2024-06-15T09:00:00+03:00",
      "endDate": "2024-06-15T17:00:00+03:00",
      "url": "https://saudisaashub.com/event/saudi-saas-summit-2024",
      "isFree": true,
      "location": {
        "type": "Virtual",
        "address": "Online - streaming"
      },
      "organizer": "سعودي ساس هب",
      "speakers": [
        { "name": "أحمد محمد", "title": "الرئيس التنفيذي، TechX" }
      ],
      "image": "https://..."
    }
  ]
}
```

---

### 6. Analytics

#### POST /analytics/event
Track custom events. This endpoint accepts Measurement Protocol format.

**Authentication**: None (rate-limited by IP)

**Request Body:**
```json
{
  "event": "company_click",
  "parameters": {
    "company_id": "salesforce",
    "company_name": "Salesforce",
    "result_position": 3
  },
  "url": "https://saudisaashub.com/search?q=crm",
  "timestamp": 1709876543210,
  "userAgent": "Mozilla/5.0...",
  "userId": "optional-user-id-if-logged-in"
}
```

**Response:**
```json
{
  "success": true,
  "queued": false
}
```

---

## Error Handling

All endpoints return consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid category slug",
    "details": {
      "field": "category",
      "allowed": ["crm", "erp", ...]
    }
  }
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (for protected endpoints)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## Rate Limiting

- **Public endpoints**: 100 requests/minute per IP
- **Analytics endpoint**: 1000 requests/minute per IP
- **Admin endpoints**: 1000 requests/minute with valid API key

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1709877000
Retry-After: 60 (when limit exceeded)
```

---

## Implementation Notes

### Database Schema (Suggested)

```sql
-- Categories
categories (id, slug, name_ar, name_en, description_ar, description_en, icon, color, order, created_at)

-- Companies
companies (id, slug, name, short_description, description, category_id, logo, screenshots, video_url,
          rating, review_count, pricing_json, platforms_json, features_json, integrations_json,
          website, is_free, free_trial_days, featured, status, created_at, updated_at)

-- Reviews
reviews (id, company_id, author_name, author_company, rating, title, content, verified, created_at)

-- Articles
articles (id, slug, title, excerpt, content_html, featured_image, category, tags_json,
         author_name, author_avatar, published_at, updated_at, word_count, view_count)

-- Events
events (id, slug, title, description, start_date, end_date, url, is_free,
       location_json, organizer, speakers_json, image, created_at)
```

### Search Implementation

Use **Elasticsearch** or **MeiliSearch** for fast Arabic search:
- Index: companies, articles, categories
- Fields: name, description, tags, category (with Arabic stemming)
- Real-time updates on company/article changes

### Caching Strategy

- **Redis** for API responses (TTL: 5 min for companies, 1 hour for categories)
- **CDN** for static assets (Cloudflare recommended)
- **Database query caching** for expensive aggregations

### SEO Enhancements (Backend)

1. **Dynamic meta tags** from database fields
2. **Sitemap generation** cron job (daily for articles, weekly for companies)
3. **Breadcrumb data** embedded in API
4. **Canonical URL** field for each content type
5. **Alternative hreflang** versions in API

---

## Webhook Events (Optional)

For real-time updates to service worker cache or CDN purge:

```json
{
  "event": "company.updated",
  "data": {
    "id": "salesforce",
    "updatedFields": ["rating", "review_count"]
  },
  "timestamp": "2024-03-12T10:30:00Z"
}
```

Send to: `https://saudisaashub.com/api/webhooks/receive`

---

## Testing

Use curl or Postman:

```bash
# Get categories
curl https://saudisaashub.com/api/categories

# Search companies
curl "https://saudisaashub.com/api/search?q=crm&limit=10"

# Get company details
curl https://saudisaashub.com/api/companies/salesforce

# Track event
curl -X POST https://saudisaashub.com/api/analytics/event \
  -H "Content-Type: application/json" \
  -d '{"event":"test","parameters":{}}'
```

---

## Support

For API issues or feature requests, contact: dev@saudisaashub.com
