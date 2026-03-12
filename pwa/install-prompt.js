/**
 * SaudiSaaSHub - QR Code Modal for PWA Install
 * Shows QR code for easy mobile install
 */

const QRModal = (() => {
  'use strict';

  const modalId = 'pwa-qr-modal';

  // ============================================
  // SHOW MODAL
  // ============================================
  const show = () => {
    if (document.getElementById(modalId)) {
      return; // Already shown
    }

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'qr-modal-title');
    modal.setAttribute('aria-modal', 'true');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
      padding: 20px;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      animation: fadeIn 0.3s ease-out;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        #${modalId} { animation: none; }
        #${modalId} .qr-content { animation: none; }
      }
    `;
    document.head.appendChild(style);

    // Current URL for QR code
    const currentUrl = window.location.origin + window.location.pathname;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&bgcolor=0A0A0F&color=F5C542&margin=1`;

    modal.innerHTML = `
      <div class="qr-content" style="
        background: #0A0A0F;
        border: 1px solid rgba(245, 197, 66, 0.3);
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 100%;
        text-align: center;
        position: relative;
        animation: scaleIn 0.3s ease-out;
        direction: rtl;
        font-family: 'Noto Sans Arabic', system-ui, sans-serif;
        color: #fff;
      ">
        <button id="qr-modal-close" style="
          position: absolute;
          top: 10px;
          left: 10px;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          min-width: auto;
          min-height: auto;
        " aria-label="إغلاق">×</button>

        <h2 id="qr-modal-title" style="
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          color: #F5C542;
        ">تثبيت التطبيق</h2>

        <p style="
          margin: 0 0 1.5rem 0;
          color: #9ca3af;
          font-size: 0.9rem;
          line-height: 1.6;
        ">
          امسح رمز QR بالكاميرا أو تطبيق المسح للوصول السريع إلى التطبيق:
        </p>

        <div style="
          background: #fff;
          padding: 10px;
          border-radius: 12px;
          display: inline-block;
          margin-bottom: 1rem;
        ">
          <img src="${qrCodeUrl}" alt="QR Code" style="
            display: block;
            width: 180px;
            height: 180px;
          " />
        </div>

        <p style="
          margin: 0;
          color: #9ca3af;
          font-size: 0.875rem;
          line-height: 1.6;
        ">
          <strong>للأندرويد:</strong> امسح الرمز واتبع التعليمات<br>
          <strong>لـ iOS:</strong> استخدم كاميرا iPhone للمسح
        </p>

        <div style="
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        ">
          <p style="
            margin: 0;
            font-size: 0.8rem;
            color: #6b7280;
          ">
            أو استخدم خيار "تثبيت" في المتصفح
          </p>
        </div>
      </div>
    `;

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        close();
      }
    });

    // Close button
    document.getElementById('qr-modal-close').addEventListener('click', close);

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    console.log('📱 QR modal shown');
  };

  // ============================================
  // CLOSE MODAL
  // ============================================
  const close = () => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
      console.log('📱 QR modal closed');
    }
  };

  return {
    show,
    close
  };
})();
