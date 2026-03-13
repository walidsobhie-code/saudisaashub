# Phase 1 Implementation Tasks

## 1.1 Fix Fake Trust Signals ✅ DONE
- [x] Replace TrustedCompanies with platform stats (already done)
- [x] Fix inflated stats: 200+ → 29+, remove 5000+ users
- [x] Remove placeholder logos – component now shows honest metrics

## 1.2 Complete English Translation
- [ ] Translate all company card UI text (CompanyCard.tsx)
- [ ] Ensure Arabic/English toggle works correctly
- [ ] Verify `/en` page is fully English (check for Arabic remnants)
- [ ] Translate article cards metadata (categories, dates)
- [ ] Translation for search, filters, and empty states

## 1.3 Fix Comparison Tool ✅ PARTIALLY DONE
- [x] Fix `founded_year` → `founded` in comparer
- [ ] Add more comparison criteria: ARR, compliance status
- [ ] Improve empty state messaging
- [ ] Test with 29 companies data (some fields may be N/A)
- [ ] Add loading state during comparison

## 1.4 Fix Broken Links
- [ ] Audit all external links in companies/certifications
- [ ] Update event website URLs (leap.sa, saassummit.com, etc.)
- [ ] Add link validation CI check (optional)
- [ ] Mark placeholder links with `#TODO` or remove

## 1.5 Data Completeness Check
- [ ] Ensure all 29 companies have complete data:
  - [ ] website
  - [ ] headquarters
  - [ ] employees
  - [ ] funding
  - [ ] description
- [ ] Add missing category/integration/certification data
- [ ] Add pricing plans where available

## 1.6 Accessibility & SEO Polish
- [ ] Add ARIA labels to all interactive elements
- [ ] Ensure English page has proper `hreflang` tags
- [ ] Add JSON-LD Organization on both Arabic/English
- [ ] Test keyboard navigation on company comparer

---

## Notes

**Priority Order:**
1. Broken links (user experience)
2. English translation completeness
3. Comparison tool data accuracy
4. Accessibility fixes

**Target Completion:** 4 weeks (March 13 - April 10, 2026)

**Verification:**
- Run `npm run build` – no TypeScript errors
- Test all pages locally (`npm run dev`)
- Check Cloudflare Pages build logs for warnings
