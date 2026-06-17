/* ═══════════════════════════════════════
   PAWVARA — main.js
   Nav · FAQ · Filters · Wishlist · UI
═══════════════════════════════════════ */

/* ── NAV SCROLL BEHAVIOR ── */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── MOBILE DRAWER ── */
(function initDrawer() {
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  const overlay   = document.querySelector('.nav-overlay');
  const closeBtn  = document.querySelector('.drawer-close');
  if (!hamburger || !drawer) return;

  function open() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);

  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', close);
  });
})();

/* ── FAQ ACCORDION ── */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── PRODUCT FILTER ── */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('newArrivalsGrid');
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const items  = grid.querySelectorAll('.product-item');

      items.forEach(item => {
        const cat = item.dataset.cat;
        const match = filter === 'all' || cat === filter;

        if (match) {
          item.classList.remove('hidden', 'fade-out');
        } else {
          item.classList.add('fade-out');
          setTimeout(() => item.classList.add('hidden'), 400);
        }
      });
    });
  });
})();

/* ── STICKY MOBILE CTA ── */
(function initStickyCTA() {
  const cta = document.querySelector('.sticky-cta');
  if (!cta) return;

  let shown = false;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600 && !shown) {
      cta.classList.add('show');
      shown = true;
    } else if (window.scrollY <= 600 && shown) {
      cta.classList.remove('show');
      shown = false;
    }
  }, { passive: true });
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── WISHLIST PERSISTENCE ── */
(function initWishlist() {
  let wishlist = JSON.parse(localStorage.getItem('pawvara_wishlist') || '[]');

  function save() {
    localStorage.setItem('pawvara_wishlist', JSON.stringify(wishlist));
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    const card = btn.closest('[data-id]');
    if (!card) return;
    const id = parseInt(card.dataset.id);

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(x => x !== id);
      btn.textContent = '♡';
      btn.style.color = '';
    } else {
      wishlist.push(id);
      btn.textContent = '♥';
      btn.style.color = 'var(--clay)';
    }
    save();
  });

  // Restore on load
  window.addEventListener('DOMContentLoaded', () => {
    wishlist.forEach(id => {
      const btn = document.querySelector(`[data-id="${id}"] .wishlist-btn`);
      if (btn) {
        btn.textContent = '♥';
        btn.style.color = 'var(--clay)';
      }
    });
  });
})();

/* ── CART DRAWER (mini) ── */
(function initCartUI() {
  const cartBtn = document.getElementById('cartBtn');
  if (!cartBtn) return;

  cartBtn.addEventListener('click', () => {
    window.showToast?.('Cart coming soon — full shop in progress!');
  });
})();

/* ── QUICK VIEW MODAL (lightweight) ── */
(function initQuickView() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.quickview-btn');
    if (!btn) return;
    e.preventDefault();

    const card = btn.closest('[data-id]');
    if (!card) return;
    const id = parseInt(card.dataset.id);
    const product = window.PRODUCTS?.find(p => p.id === id);
    if (!product) return;

    // Build modal
    let modal = document.getElementById('quickviewModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quickviewModal';
      modal.className = 'qv-modal';
      modal.innerHTML = `
        <div class="qv-backdrop"></div>
        <div class="qv-panel">
          <button class="qv-close" aria-label="Close">✕</button>
          <div class="qv-img" id="qvImg"></div>
          <div class="qv-info">
            <div class="qv-cat" id="qvCat"></div>
            <h2 class="qv-title" id="qvTitle"></h2>
            <div class="qv-stars" id="qvStars"></div>
            <div class="qv-price" id="qvPrice"></div>
            <p class="qv-desc" id="qvDesc"></p>
            <button class="btn btn-primary btn-lg qv-add" id="qvAdd">Add to Cart</button>
          </div>
        </div>`;
      document.body.appendChild(modal);

      modal.querySelector('.qv-backdrop').addEventListener('click', closeQV);
      modal.querySelector('.qv-close').addEventListener('click', closeQV);
    }

    function closeQV() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    const discount = product.was ? Math.round((1 - product.price / product.was) * 100) : null;

    modal.querySelector('#qvImg').style.background = product.gradientA;
    modal.querySelector('#qvImg').textContent = product.emoji;
    modal.querySelector('#qvCat').textContent  = product.category;
    modal.querySelector('#qvTitle').textContent = product.name;
    modal.querySelector('#qvStars').innerHTML   = `<span class="stars">${window.renderStars?.(product.rating) || '★★★★★'}</span> <span>${product.rating} (${product.reviews.toLocaleString()} reviews)</span>`;
    modal.querySelector('#qvPrice').innerHTML   = `<span class="price-now">$${product.price}</span>${product.was ? `<span class="price-was">$${product.was}</span>` : ''}${discount ? `<span class="price-pct">-${discount}%</span>` : ''}`;
    modal.querySelector('#qvDesc').textContent  = `Premium quality ${product.name.toLowerCase()} crafted for style and durability. Trusted by thousands of dog owners.`;

    const addBtn = modal.querySelector('#qvAdd');
    addBtn.onclick = () => {
      window.Cart?.add(product.id);
      closeQV();
    };

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
})();

/* ── SEARCH BAR TOGGLE ── */
(function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    window.showToast?.('Search — coming soon!');
  });
})();

/* ── SECTION BG TRANSITIONS ── */
(function initBgTransition() {
  const sections = document.querySelectorAll('[data-bg-color]');
  if (!sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.style.transition = 'background 0.6s ease';
        document.body.style.background = entry.target.dataset.bgColor;
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => io.observe(s));
})();

/* ── TRUST BAR INIT (ensure marquee has content) ── */
(function initTrustBar() {
  const track = document.querySelector('.marquee-track');
  if (!track || track.children.length > 0) return;

  const items = [
    { icon: '🚚', text: 'Free Shipping Over $75' },
    { icon: '↩', text: '60-Day Returns' },
    { icon: '⭐', text: '50,000+ Happy Pups' },
    { icon: '🛡️', text: 'Lifetime Warranty' },
    { icon: '🌿', text: 'Eco-Friendly Materials' },
    { icon: '🐾', text: 'Vet Approved' },
    { icon: '💬', text: '24/7 Customer Support' },
    { icon: '🏆', text: 'Award-Winning Design' },
  ];

  track.innerHTML = items.map(i => `
    <div class="trust-item">
      <span class="trust-item-icon">${i.icon}</span>
      <span>${i.text}</span>
    </div>`).join('');
})();