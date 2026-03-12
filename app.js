// SaudiSaaSHub Frontend - Static Rendering (no API needed)

document.addEventListener('DOMContentLoaded', () => {
  // Render categories
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (categoriesGrid && window.SAUDISAASHUB?.CATEGORIES) {
    categoriesGrid.innerHTML = window.SAUDISAASHUB.CATEGORIES.map(cat => `
      <div class="card">
        <h3>${cat.name}</h3>
        <p>${cat.nameAr}</p>
        <small>${cat.count} أداة</small>
      </div>
    `).join('');
  }

  // Render companies (first 8 featured)
  const companiesGrid = document.getElementById('companiesGrid');
  if (companiesGrid && window.SAUDISAASHUB?.COMPANIES) {
    const featured = window.SAUDISAASHUB.COMPANIES.filter(c => c.featured).slice(0, 8);
    companiesGrid.innerHTML = featured.map(company => `
      <div class="card company-card">
        <img src="${company.logo}" alt="${company.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzhiNWNmNiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0xIDE4bC01LTUgMS40MS0xLjQxTDEwIDE0LjE3bDYuNTkgNi41OUwxOCAxMGwtOCA4eiIvPjwvc3ZnPg=='">
        <h3>${company.nameAr || company.name}</h3>
        <p>${company.description}</p>
        <div class="rating">
          <span class="stars">★ ${company.rating}</span>
          <span>(${company.reviewsCount} مراجعة)</span>
        </div>
      </div>
    `).join('');
  }

  // Render articles
  const articlesGrid = document.getElementById('articlesGrid');
  if (articlesGrid && window.SAUDISAASHUB?.ARTICLES) {
    articlesGrid.innerHTML = window.SAUDISAASHUB.ARTICLES.map(article => `
      <div class="card article-card">
        <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}" loading="lazy">
        <div class="article-meta">
          <span>${article.category}</span>
          <span>•</span>
          <span>${article.readTime}</span>
        </div>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <a href="/article/${article.slug}" class="read-more">اقرأ المزيد →</a>
      </div>
    `).join('');
  }

  // Render events
  const eventsGrid = document.getElementById('eventsGrid');
  if (eventsGrid && window.SAUDISAASHUB?.EVENTS) {
    eventsGrid.innerHTML = window.SAUDISAASHUB.EVENTS.map(event => `
      <div class="card">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <small>📅 ${event.date} | 📍 ${event.location}</small>
      </div>
    `).join('');
  }

  // Language toggle
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  });

  // Mobile menu toggle (simplified)
  const navLinks = document.querySelector('.nav-links');
  document.querySelector('.logo')?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
  });

  // Starfield animation
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          alpha: Math.random()
        });
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${star.alpha})`;
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
      });
      requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
  }

  // Simple search (filter companies)
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  if (searchInput && searchBtn && window.SAUDISAASHUB?.COMPANIES) {
    const performSearch = () => {
      const query = searchInput.value.toLowerCase();
      const filtered = window.SAUDISAASHUB.COMPANIES.filter(c => 
        c.name.toLowerCase().includes(query) || 
        (c.nameAr && c.nameAr.toLowerCase().includes(query)) ||
        c.category.toLowerCase().includes(query)
      );
      // For demo: just show count
      alert(`تم العثور على ${filtered.length} شركة تطابق "${query}"`);
    };
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }

  console.log('✅ SaudiSaaSHub Ready');
});