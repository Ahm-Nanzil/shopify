/* ═══════════════════════════════════════
   PAWVARA — products.js
   Product data & rendering
═══════════════════════════════════════ */

const PRODUCTS = [
  // ── Collars ──
  {
    id: 1, category: 'collars',
    name: 'Heritage Leather Collar',
    price: 89, was: 129,
    rating: 4.9, reviews: 2341,
    badge: 'Bestseller', badgeType: 'clay',
    emoji: '🐕', emoji2: '🏷️',
    gradientA: 'linear-gradient(135deg,#2d1f0e,#4a3808)',
    gradientB: 'linear-gradient(135deg,#4a3808,#2d1f0e)',
    isNew: false,
    isSale: true,
  },
  {
    id: 2, category: 'collars',
    name: 'Martingale Safety Collar',
    price: 74, was: null,
    rating: 4.8, reviews: 892,
    badge: 'New', badgeType: 'sage',
    emoji: '🐾', emoji2: '⚙️',
    gradientA: 'linear-gradient(135deg,#1a1a2e,#2a2a4a)',
    gradientB: 'linear-gradient(135deg,#2a2a4a,#3a3a5a)',
    isNew: true,
    isSale: false,
  },
  {
    id: 3, category: 'collars',
    name: 'Waxed Canvas Collar',
    price: 58, was: null,
    rating: 4.7, reviews: 456,
    badge: null, badgeType: null,
    emoji: '🌿', emoji2: '🐕',
    gradientA: 'linear-gradient(135deg,#1a2e1a,#2a4a2a)',
    gradientB: 'linear-gradient(135deg,#2a4a2a,#1a2e1a)',
    isNew: false,
    isSale: false,
  },
  {
    id: 4, category: 'collars',
    name: 'Padded Comfort Collar',
    price: 65, was: 85,
    rating: 4.9, reviews: 1203,
    badge: 'Sale', badgeType: 'clay',
    emoji: '💎', emoji2: '🐕',
    gradientA: 'linear-gradient(135deg,#2e2020,#4a3030)',
    gradientB: 'linear-gradient(135deg,#4a3030,#5a4040)',
    isNew: false,
    isSale: true,
  },
  // ── Harnesses ──
  {
    id: 5, category: 'harnesses',
    name: 'Atlas Step-In Harness',
    price: 128, was: null,
    rating: 4.9, reviews: 3102,
    badge: 'Top Rated', badgeType: 'gold',
    emoji: '🦺', emoji2: '⭐',
    gradientA: 'linear-gradient(135deg,#1a0e06,#3a2010)',
    gradientB: 'linear-gradient(135deg,#3a2010,#5a3018)',
    isNew: false,
    isSale: false,
  },
  {
    id: 6, category: 'harnesses',
    name: 'Trail Expedition Harness',
    price: 148, was: 185,
    rating: 4.8, reviews: 678,
    badge: 'New', badgeType: 'sage',
    emoji: '🏔️', emoji2: '🌲',
    gradientA: 'linear-gradient(135deg,#0e1a0e,#1a3010)',
    gradientB: 'linear-gradient(135deg,#1a3010,#2a4820)',
    isNew: true,
    isSale: true,
  },
  {
    id: 7, category: 'harnesses',
    name: 'City Slim Harness',
    price: 118, was: null,
    rating: 4.7, reviews: 892,
    badge: null, badgeType: null,
    emoji: '🏙️', emoji2: '✨',
    gradientA: 'linear-gradient(135deg,#1a1a1a,#2a2a2a)',
    gradientB: 'linear-gradient(135deg,#2a2a2a,#3a3030)',
    isNew: false,
    isSale: false,
  },
  // ── Leashes ──
  {
    id: 8, category: 'leashes',
    name: 'Bridle Leather Leash',
    price: 72, was: null,
    rating: 4.9, reviews: 1567,
    badge: 'Bestseller', badgeType: 'clay',
    emoji: '🐩', emoji2: '🌿',
    gradientA: 'linear-gradient(135deg,#2d1f0e,#5C4209)',
    gradientB: 'linear-gradient(135deg,#5C4209,#8B6520)',
    isNew: false,
    isSale: false,
  },
  {
    id: 9, category: 'leashes',
    name: 'Bungee Training Leash',
    price: 54, was: 69,
    rating: 4.6, reviews: 344,
    badge: 'Sale', badgeType: 'clay',
    emoji: '🏃', emoji2: '💪',
    gradientA: 'linear-gradient(135deg,#0e1418,#1a2230)',
    gradientB: 'linear-gradient(135deg,#1a2230,#243048)',
    isNew: false,
    isSale: true,
  },
  {
    id: 10, category: 'leashes',
    name: 'Rope & Leather Leash',
    price: 68, was: null,
    rating: 4.8, reviews: 789,
    badge: 'New', badgeType: 'sage',
    emoji: '⚓', emoji2: '🌊',
    gradientA: 'linear-gradient(135deg,#1a1a2e,#1e3040)',
    gradientB: 'linear-gradient(135deg,#1e3040,#2a4060)',
    isNew: true,
    isSale: false,
  },
  // ── Beds ──
  {
    id: 11, category: 'beds',
    name: 'Orthopedic Memory Bed',
    price: 189, was: 240,
    rating: 4.9, reviews: 2100,
    badge: 'Fan Fave', badgeType: 'gold',
    emoji: '🛏️', emoji2: '😴',
    gradientA: 'linear-gradient(135deg,#3a2a1a,#5a4020)',
    gradientB: 'linear-gradient(135deg,#5a4020,#3a2a1a)',
    isNew: false,
    isSale: true,
  },
  {
    id: 12, category: 'beds',
    name: 'Bolster Linen Nest',
    price: 145, was: null,
    rating: 4.7, reviews: 560,
    badge: 'New', badgeType: 'sage',
    emoji: '🌙', emoji2: '☁️',
    gradientA: 'linear-gradient(135deg,#2a2a3a,#3a3a4a)',
    gradientB: 'linear-gradient(135deg,#3a3a4a,#4a4a5a)',
    isNew: true,
    isSale: false,
  },
];

const CATEGORIES = [
  {
    id: 'harnesses',
    name: 'Harnesses',
    count: 14,
    image: 'assets/images/catagories/harness.png'
  },
  {
    id: 'collars',
    name: 'Collars',
    count: 22,
    image: 'assets/images/catagories/collar.png'

  },
  {
    id: 'leashes',
    name: 'Leashes',
    count: 18,
    image: 'assets/images/catagories/leashes.png'
  },
  {
    id: 'toys',
    name: 'Toys & Play',
    count: 31,
    image: 'assets/images/catagories/toys.png'
  },
  {
    id: 'beds',
    name: 'Beds & Comfort',
    count: 12,
    image: 'assets/images/catagories/beds.png'
  },
  {
    id: 'travel',
    name: 'Travel',
    count: 9,
    image: 'assets/images/catagories/travel.png'
  }
];


/* ── RENDER HELPERS ── */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const star  = '<svg viewBox="0 0 12 12"><path d="M6 1l1.2 3.7H11L8.1 6.9l1.1 3.7L6 8.5l-3.2 2.1L3.9 6.9 1 4.7h3.8z"/></svg>';
  const halfS = '<svg viewBox="0 0 12 12"><defs><linearGradient id="hg"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="rgba(14,12,10,0.1)"/></linearGradient></defs><path d="M6 1l1.2 3.7H11L8.1 6.9l1.1 3.7L6 8.5l-3.2 2.1L3.9 6.9 1 4.7h3.8z" fill="url(#hg)"/></svg>';
  const emptyS= '<svg viewBox="0 0 12 12" style="opacity:0.2"><path d="M6 1l1.2 3.7H11L8.1 6.9l1.1 3.7L6 8.5l-3.2 2.1L3.9 6.9 1 4.7h3.8z"/></svg>';
  return star.repeat(full) + halfS.repeat(half) + emptyS.repeat(empty);
}

function renderProductCard(p, extraClass = '') {
  const discount = p.was ? Math.round((1 - p.price / p.was) * 100) : null;
  return `
    <div class="product-card ${extraClass}" data-id="${p.id}" data-cat="${p.category}">
      <div class="product-card-img-wrap">
        <div class="product-card-emoji primary" style="background:${p.gradientA}">${p.emoji}</div>
        <div class="product-card-emoji secondary" style="background:${p.gradientB}">${p.emoji2}</div>
        <div class="product-card-badges">
          ${p.badge ? `<span class="badge badge-${p.badgeType}">${p.badge}</span>` : ''}
        </div>
        <div class="product-card-actions">
          <button class="card-action-btn wishlist-btn" aria-label="Wishlist" title="Wishlist">♡</button>
          <button class="card-action-btn quickview-btn" aria-label="Quick view" title="Quick view">⊕</button>
        </div>
      </div>
      <div class="product-card-info">
        <div class="product-card-cat">${p.category}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-rating">
          <div class="stars">${renderStars(p.rating)}</div>
          <span>${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-card-price">
          <span class="price-now">$${p.price}</span>
          ${p.was ? `<span class="price-was">$${p.was}</span>` : ''}
          ${discount ? `<span class="price-pct">-${discount}%</span>` : ''}
        </div>
      </div>
      <button class="quick-add" data-id="${p.id}">+ Add to Cart</button>
    </div>
  `;
}

function renderCategoryCard(cat, idx) {
  const isWide = idx === 0 || idx === 4;

  return `
    <div class="cat-card hover-line-top${isWide ? ' wide' : ''}" data-cat="${cat.id}">

      ${
        cat.image
          ? `<img src="${cat.image}" alt="${cat.name}" class="cat-image">`
          : `<div class="cat-emoji-bg" style="background:${cat.gradient}">${cat.emoji}</div>`
      }

      <div class="cat-overlay"></div>

      <div class="cat-content">
        <div class="cat-name">${cat.name}</div>
        <div class="cat-count">${cat.count} products</div>
        <span class="cat-btn">Explore →</span>
      </div>

    </div>
  `;
}

/* ── CART STATE ── */
const Cart = {
  items: [],
  add(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const existing = this.items.find(x => x.id === id);
    if (existing) existing.qty++;
    else this.items.push({ ...p, qty: 1 });
    this.updateCount();
    showToast(`${p.name} added to cart ✓`);
  },
  count() {
    return this.items.reduce((a, b) => a + b.qty, 0);
  },
  updateCount() {
    const el = document.getElementById('cartCount');
    if (!el) return;
    const n = this.count();
    el.textContent = n;
    el.classList.toggle('show', n > 0);
  }
};

/* ── TOAST ── */
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    toast.innerHTML = '<span class="toast-icon">✓</span><span id="toastMsg"></span>';
    document.body.appendChild(toast);
  }
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── EVENT DELEGATION ── */
document.addEventListener('click', e => {
  // Quick add
  const qa = e.target.closest('.quick-add');
  if (qa) {
    e.preventDefault();
    Cart.add(parseInt(qa.dataset.id));
    return;
  }
  // Card action wishlist
  const wb = e.target.closest('.wishlist-btn');
  if (wb) {
    e.preventDefault();
    wb.textContent = wb.textContent === '♡' ? '♥' : '♡';
    wb.style.color = wb.textContent === '♥' ? 'var(--clay)' : '';
    showToast(wb.textContent === '♥' ? 'Saved to wishlist ♥' : 'Removed from wishlist');
    return;
  }
  // Quick view
  const qv = e.target.closest('.quickview-btn');
  if (qv) {
    e.preventDefault();
    const card = qv.closest('[data-id]');
    const p = PRODUCTS.find(x => x.id === parseInt(card?.dataset?.id));
    if (p) showToast(`Quick view: ${p.name}`);
    return;
  }
  // Category card
  const catCard = e.target.closest('.cat-card');
  if (catCard) {
    showToast(`Browsing ${catCard.dataset.cat}…`);
    return;
  }
});

// // Expose data globally
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;

// Expose helpers
window.renderProductCard = renderProductCard;
window.renderCategoryCard = renderCategoryCard;
window.renderStars = renderStars;

// Expose cart
window.Cart = Cart;

// Expose toast
window.showToast = showToast;