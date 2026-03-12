/**
 * SaudiSaaSHub - Install Banner Component
 * Shows "Add to Home Screen" banner after threshold
 */

const InstallBanner = (() => {
  'use strict';

  const bannerId = 'pwa-install-banner';
  const storageKey = 'saudisaashub_pwa_install_dismissed';
  const visitsKey = 'saudisaashub_visit_count';
  const timeKey = 'saudisaashub_first_visit_time';

  // Configuration
  const config = {
    visitsThreshold: 3,
    timeThresholdMs: 30 * 1000, // 30 seconds
    storageExpiryDays: 7
  };

  // ============================================
  // INITIALIZE
  // ============================================
  const init = () => {
    // Check if PWA is installable
    if (!('serviceWorker' in navigator) || !('BeforeInstallPromptEvent' in window)) {
      return;
    }

    // Check if dismissed recently
    if (isDismissed()) {
      return;
    }

    // Check thresholds
    if (hasMetThreshold()) {
      showBanner();
    } else {
      setupTracking();
    }
  };

  // ============================================
  // TRACKING
  // ============================================
  const setupTracking = () => {
    // Increment visit count
    const visits = parseInt(localStorage.getItem(visitsKey) || '0', 10);
    localStorage.setItem(visitsKey, (visits + 1).toString());

    // Set first visit time if not set
    if (!localStorage.getItem(timeKey)) {
      localStorage.setItem(timeKey, Date.now().toString());
    }
  };

  const hasMetThreshold = () => {
    const visits = parseInt(localStorage.getItem(visitsKey) || '0', 10);
    const firstVisit = parseInt(localStorage.getItem(timeKey) || '0', 10);
    const elapsedTime = Date.now() - firstVisit;

    return visits >= config.visitsThreshold || elapsedTime >= config.timeThresholdMs;
  };

  // ============================================
  // DISMISSAL CHECK
  // ============================================
  const isDismissed = () => {
    const dismissed = localStorage.getItem(storageKey);
    if (!dismissed) return false;

    try {
      const { timestamp } = JSON.parse(dismissed);
      const expiry = config.storageExpiryDays * 24 * 60 * 60 * 1000;
      return Date.now() - timestamp < expiry;
    } catch {
      return false;
    }
  };

  const markDismissed = () => {
    localStorage.setItem(storageKey, JSON.stringify({
      timestamp: Date.now(),
      dismissed: true
    }));
    hideBanner();
  };

  // ============================================
  // BANNER UI
  // ============================================
  const showBanner = () => {
    if (document.getElementById(bannerId)) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = bannerId;
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: linear-gradient(135deg, #0A0A0F, #1a1a2e);
      border: 1px solid rgba(245, 197, 66, 0.3);
      border-radius: 16px;
      padding: 16px 20px;
      max-width: 90%;
      width: 400px;
      z-index: 10000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 197, 66, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      font-family: 'Noto Sans Arabic', system-ui, sans-serif;
      color: #fff;
      direction: rtl;
      animation: slideUp 0.4s ease-out forwards;
      transition: all 0.3s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from { transform: translateX(-50%) translateY(100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      @keyframes slideDown {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(100px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        #${bannerId} { animation: none; }
      }
    `;
    document.head.appendChild(style);

    banner.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <!-- App Icon -->
        <img src="/assets/icons/icon-96x96.svg" alt="" style="
          width: 48px;
          height: 48px;
          border-radius: 10px;
          flex-shrink: 0;
        " />

        <!-- Text Content -->
        <div style="flex: 1; min-width: 0;">
          <h3 style="
            margin: 0 0 4px 0;
            font-size: 1rem;
            color: #F5C542;
            font-weight: 600;
          ">تثبيت سعودي ساس هب</h3>
          <p style="
            margin: 0;
            font-size: 0.875rem;
            color: #9ca3af;
            line-height: 1.5;
          ">أضف التطبيق إلى الشاشة الرئيسية للوصول السريع وتجربة تشبه التطبيق الأصلي</p>
        </div>

        <!-- Close Button -->
        <button id="${bannerId}-close" style="
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 1.25rem;
          padding: 4px;
          margin: -4px -4px -4px 0;
          line-height: 1;
          border-radius: 4px;
          min-width: auto;
          min-height: auto;
          transition: color 0.2s;
        " aria-label="إغلاق">×</button>
      </div>

      <!-- Actions -->
      <div style="
        display: flex;
        gap: 10px;
        margin-top: 12px;
        justify-content: flex-end;
      ">
        <button id="${bannerId}-install" style="
          background: #F5C542;
          color: #0A0A0F;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          min-height: 36px;
          min-width: 44px;
          font-family: inherit;
          transition: background 0.2s;
        ">تثبيت</button>
        <button id="${bannerId}-qr" style="
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          min-height: 36px;
          min-width: 44px;
          font-family: inherit;
          transition: border-color 0.2s;
        ">عرض QR</button>
        <button id="${bannerId}-later" style="
          background: transparent;
          color: #9ca3af;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          min-height: 36px;
          min-width: 44px;
          font-family: inherit;
          transition: color 0.2s;
        ">لاحقاً</button>
      </div>
    `;

    // Append to body
    document.body.appendChild(banner);

    // Safe area inset for notched devices
    if (CSS.supports('padding: env(safe-area-inset-bottom)')) {
      const computed = getComputedStyle(document.documentElement);
      if (computed.getPropertyValue('--sat-bottom')) {
        banner.style.paddingBottom = `calc(16px + env(safe-area-inset-bottom))`;
      }
    }

    // Event listeners
    document.getElementById(`${bannerId}-close`).addEventListener('click', () => {
      markDismissed();
    });

    document.getElementById(`${bannerId}-install`).addEventListener('click', async () => {
      const installed = await triggerInstall();
      if (installed) {
        hideBanner();
      }
    });

    document.getElementById(`${bannerId}-qr`).addEventListener('click', () => {
      QRModal.show();
      hideBanner();
    });

    document.getElementById(`${bannerId}-later`).addEventListener('click', () => {
      // Dismiss for this session only (not stored)
      hideBanner();
    });

    console.log('📱 Install banner shown');
  };

  // ============================================
  // HIDE BANNER
  // ============================================
  const hideBanner = () => {
    const banner = document.getElementById(bannerId);
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease-out forwards';
      setTimeout(() => {
        if (banner.parentNode) {
          banner.remove();
        }
      }, 300);
    }
  };

  // ============================================
  // NATIVE PROMPT (deferred)
  // ============================================
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    console.log('📱 beforeinstallprompt captured');
  });

  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully');
    deferredPrompt = null;
    hideBanner();
    markDismissed();
  });

  const triggerInstall = async () => {
    if (!deferredPrompt) {
      // No native prompt available, show QR code instead
      console.log('📱 No native prompt available, showing QR modal');
      QRModal.show();
      return false;
    }

    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`📱 User response: ${outcome}`);

    // Clear the deferredPrompt variable, it can only be used once
    deferredPrompt = null;

    return outcome === 'accepted';
  };

  // ============================================
  // PUBLIC API
  // ============================================
  return {
    init,
    showBanner,
    hideBanner,
    triggerInstall
  };
})();
