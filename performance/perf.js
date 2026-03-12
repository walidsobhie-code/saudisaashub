/**
 * SaudiSaaSHub - Performance Monitoring Script
 * Measures Core Web Vitals: FCP, LCP, CLS, TTI, TBT
 * Reports to console in dev mode, optionally sends to analytics
 */

class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      sendToAnalytics: true,
      analyticsEndpoint: '/api/analytics/performance',
      debug: false,
      ...options
    };

    this.metrics = {
      fcp: null,
      lcp: null,
      cls: null,
     tti: null,
      tbt: null
    };

    this.clsEntries = [];
    this.clsScore = 0;
    this.tbtTotal = 0;
    this.ttiMarkers = {};

    this.init();
  }

  init() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    this.observeFCP();
    this.observeLCP();
    this.observeCLS();
    this.observeTTI();
    this.observeTBT();

    // Log metrics on page hide
    window.addEventListener('pagehide', () => {
      this.report();
    });
  }

  // First Contentful Paint - when first text/image is rendered
  observeFCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries[0];
        this.metrics.fcp = fcpEntry.startTime;
        this.log('FCP', this.metrics.fcp);
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      if (this.options.debug) console.warn('FCP not supported:', e);
    }
  }

  // Largest Contentful Paint - when largest content element is rendered
  observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1];
        this.metrics.lcp = lcpEntry.startTime;
        this.log('LCP', this.metrics.lcp);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      if (this.options.debug) console.warn('LCP not supported:', e);
    }
  }

  // Cumulative Layout Shift - visual stability score
  observeCLS() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            this.clsEntries.push(entry);
            this.clsScore += entry.value;
          }
        }
        this.metrics.cls = this.clsScore;
        this.log('CLS', this.metrics.cls);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      if (this.options.debug) console.warn('CLS not supported:', e);
    }
  }

  // Time to Interactive - when page becomes fully interactive
  observeTTI() {
    // TTI estimation using Performance Timeline
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input' && !this.ttiMarkers.firstInput) {
            this.ttiMarkers.firstInput = entry.startTime;
          }
        }
      });
      observer.observe({ entryTypes: ['first-input', 'longtask'] });

      // Estimate TTI as when last long task before first input ends
      // Simplified: use a heuristic based on network and CPU
      this.estimateTTI();
    } catch (e) {
      if (this.options.debug) console.warn('TTI estimation limited:', e);
    }
  }

  estimateTTI() {
    // Heuristic: TTI ≈ when FCP occurs + 1s buffer for interactivity
    // For more accurate, would need to analyze long tasks
    if (this.metrics.fcp !== null) {
      this.metrics.tti = Math.round(this.metrics.fcp + 1000);
      this.log('TTI (estimated)', this.metrics.tti);
    }
  }

  // Total Blocking Time - sum of main thread blocking time
  observeTBT() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            this.tbtTotal += entry.duration - 50;
          }
        }
        this.metrics.tbt = this.tbtTotal;
        this.log('TBT', this.metrics.tbt);
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      if (this.options.debug) console.warn('TBT not supported:', e);
    }
  }

  log(metricName, value) {
    if (this.options.debug) {
      console.log(`[Performance] ${metricName}: ${value.toFixed(2)}ms`);
    }
  }

  // Get metrics formatted for reporting
  getMetrics() {
    return {
      ...this.metrics,
      fcp: this.metrics.fcp ? Math.round(this.metrics.fcp) : null,
      lcp: this.metrics.lcp ? Math.round(this.metrics.lcp) : null,
      cls: this.metrics.cls ? parseFloat(this.metrics.cls.toFixed(4)) : null,
      tti: this.metrics.tti ? Math.round(this.metrics.tti) : null,
      tbt: this.metrics.tbt ? Math.round(this.metrics.tbt) : null,
      timestamp: Date.now(),
      url: window.location.href
    };
  }

  // Send metrics to analytics endpoint
  async sendToAnalytics() {
    if (!this.options.sendToAnalytics) return;

    const metrics = this.getMetrics();
    try {
      if (navigator.sendBeacon) {
        const payload = JSON.stringify(metrics);
        navigator.sendBeacon(this.options.analyticsEndpoint, payload);
      } else {
        await fetch(this.options.analyticsEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metrics),
          keepalive: true
        });
      }
      if (this.options.debug) console.log('[Performance] Metrics sent to analytics');
    } catch (e) {
      if (this.options.debug) console.warn('[Performance] Failed to send metrics:', e);
    }
  }

  // Generate a comprehensive performance report
  generateReport() {
    const metrics = this.getMetrics();

    const getRating = (metric, value) => {
      const thresholds = {
        fcp: { good: 1800, needsImprovement: 3000 },
        lcp: { good: 2500, needsImprovement: 4000 },
        cls: { good: 0.1, needsImprovement: 0.25 },
        tti: { good: 3800, needsImprovement: 7300 },
        tbt: { good: 200, needsImprovement: 600 }
      };

      if (value === null) return 'unknown';
      const t = thresholds[metric];
      if (value <= t.good) return 'good';
      if (value <= t.needsImprovement) return 'needs-improvement';
      return 'poor';
    };

    const ratings = {};
    for (const [metric, value] of Object.entries(metrics)) {
      if (metric !== 'timestamp' && metric !== 'url') {
        ratings[metric] = getRating(metric, value);
      }
    }

    return {
      metrics,
      ratings,
      summary: this.generateSummary(metrics, ratings)
    };
  }

  generateSummary(metrics, ratings) {
    const goodCount = Object.values(ratings).filter(r => r === 'good').length;
    const total = Object.keys(ratings).length;
    const percentage = (goodCount / total) * 100;

    let overall = 'poor';
    if (percentage >= 80) overall = 'good';
    else if (percentage >= 50) overall = 'needs-improvement';

    return {
      overall,
      score: Math.round(percentage),
      goodCount,
      total,
      message: this.getOverallMessage(percentage)
    };
  }

  getOverallMessage(percentage) {
    if (percentage >= 100) return '🌟澎湃成绩！所有指标都很好。';
    if (percentage >= 80) return '✅ 优秀！大部分指标良好。';
    if (percentage >= 50) return '⚠️  需要改进。有两个以上的指标需要优化。';
    return '❌ 性能较差。需要紧急优化。';
  }

  // Full report to console
  report() {
    const report = this.generateReport();

    console.group('📊 Web Vitals Report');
    console.log('Timestamp:', new Date(report.metrics.timestamp).toISOString());
    console.log('');

    for (const [metric, value] of Object.entries(report.metrics)) {
      if (metric !== 'timestamp' && metric !== 'url') {
        const rating = report.ratings[metric];
        const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
        console.log(`${emoji} ${metric.toUpperCase()}: ${value ?? 'N/A'} (${rating})`);
      }
    }

    console.log('');
    console.log(`总体评分: ${report.summary.score}/100`);
    console.log(`状态: ${report.summary.message}`);
    console.groupEnd();

    // Send to analytics if enabled
    if (this.options.sendToAnalytics) {
      this.sendToAnalytics();
    }

    return report;
  }

  // Get metrics for manual reporting
  static async getMetrics() {
    return new Promise((resolve) => {
      const monitor = new PerformanceMonitor({ debug: false });
      // Wait a bit for metrics to collect
      setTimeout(() => {
        resolve(monitor.getMetrics());
      }, 1000);
    });
  }
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  // Initialize after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.performanceMonitor = new PerformanceMonitor({
        debug: true, // Set to false in production
        sendToAnalytics: true
      });
    });
  } else {
    window.performanceMonitor = new PerformanceMonitor({
      debug: true,
      sendToAnalytics: true
    });
  }
}

// Export for Node.js environments (for Lighthouse CI)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}
