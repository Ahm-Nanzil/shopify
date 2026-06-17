/* ═══════════════════════════════════════
   PAWVARA — carousel.js
   Best Sellers Carousel · Testimonials
═══════════════════════════════════════ */

/* ── GENERIC CAROUSEL FACTORY ── */
function createCarousel(opts) {
  const {
    trackEl,
    prevBtn,
    nextBtn,
    dotsContainer,
    itemSelector,
    visibleCount = 4,
    gap = 24,
    infinite = true,
    autoplay = false,
    autoplayDelay = 4000,
  } = opts;

  if (!trackEl) return;

  let isDragging   = false;
  let startX       = 0;
  let currentX     = 0;
  let dragOffset   = 0;
  let currentIndex = 0;
  let autoplayTimer;

  const items = () => trackEl.querySelectorAll(itemSelector);

  function itemWidth() {
    const first = items()[0];
    if (!first) return 0;
    return first.offsetWidth + gap;
  }

  function maxIndex() {
    const total = items().length;
    return Math.max(0, total - visibleCount);
  }

  function goTo(idx, animate = true) {
    const n = items().length;
    if (infinite) {
      if (idx < 0) idx = maxIndex();
      if (idx > maxIndex()) idx = 0;
    } else {
      idx = Math.max(0, Math.min(idx, maxIndex()));
    }
    currentIndex = idx;

    const offset = -(currentIndex * itemWidth());
    trackEl.style.transition = animate ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    trackEl.style.transform  = `translateX(${offset}px)`;

    updateDots();
    updateButtons();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot, .testi-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    if (!infinite) {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex();
    }
  }

  function buildDots() {
    if (!dotsContainer) return;
    const n = maxIndex() + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      dotsContainer.appendChild(dot);
    }
  }

  // Drag
  function onDragStart(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    currentX = startX;
    trackEl.style.transition = 'none';
    trackEl.style.userSelect = 'none';
    pauseAutoplay();
  }
  function onDragMove(e) {
    if (!isDragging) return;
    currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    dragOffset = currentX - startX;
    const base = -(currentIndex * itemWidth());
    trackEl.style.transform = `translateX(${base + dragOffset}px)`;
  }
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    trackEl.style.userSelect = '';
    const threshold = itemWidth() * 0.25;
    if (dragOffset < -threshold) goTo(currentIndex + 1);
    else if (dragOffset > threshold) goTo(currentIndex - 1);
    else goTo(currentIndex);
    dragOffset = 0;
    resumeAutoplay();
  }

  trackEl.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  trackEl.addEventListener('touchstart', onDragStart, { passive: true });
  trackEl.addEventListener('touchmove', onDragMove, { passive: true });
  trackEl.addEventListener('touchend', onDragEnd);

  prevBtn?.addEventListener('click', () => { goTo(currentIndex - 1); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(currentIndex + 1); resetAutoplay(); });

  // Autoplay
  function startAutoplay() {
    if (!autoplay) return;
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), autoplayDelay);
  }
  function pauseAutoplay()  { clearInterval(autoplayTimer); }
  function resumeAutoplay() { startAutoplay(); }
  function resetAutoplay()  { pauseAutoplay(); resumeAutoplay(); }

  // Keyboard
  trackEl.setAttribute('tabindex', '0');
  trackEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(currentIndex, false), 150);
  });

  buildDots();
  goTo(0, false);
  startAutoplay();

  return { goTo, buildDots };
}

/* ── BEST SELLERS CAROUSEL INIT ── */
(function initBestSellers() {
  const track    = document.getElementById('bestSellersTrack');
  const prev     = document.getElementById('bsPrev');
  const next     = document.getElementById('bsNext');
  const dots     = document.getElementById('bsDots');
  if (!track) return;

  // Inject products
  if (window.PRODUCTS) {
    const sellers = window.PRODUCTS.filter((_, i) => i < 8);
    track.innerHTML = sellers.map(p => window.renderProductCard(p, '')).join('');
  }

  function getVisible() {
    if (window.innerWidth <= 480) return 1.2;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1100) return 3;
    return 4;
  }

  createCarousel({
    trackEl: track,
    prevBtn: prev,
    nextBtn: next,
    dotsContainer: dots,
    itemSelector: '.product-card',
    // visibleCount: Math.floor(getVisible()),
    visibleCount: getVisible(),
    gap: 24,
    infinite: true,
    autoplay: true,
    autoplayDelay: 5000,
  });
})();

/* ── TESTIMONIALS CAROUSEL ── */
(function initTestimonials() {
  const track = document.getElementById('testiTrack');
  const prev  = document.getElementById('testiPrev');
  const next  = document.getElementById('testiNext');
  if (!track) return;

  const testimonials = [
    {
      name: 'Sarah M.',
      info: 'Golden Retriever parent · NYC',
      avatar: 'SM',
      rating: 5,
      text: `Finally a brand that gets it. The Heritage Leather Collar is <strong>beautiful</strong> — my dog Biscuit gets compliments every walk. Quality is unmatched.`,
      product: 'Heritage Leather Collar',
      verified: true,
    },
    {
      name: 'James K.',
      info: 'Rescue dog parent · Austin',
      avatar: 'JK',
      rating: 5,
      text: `The Atlas Harness changed our walks completely. No more pulling, no more escaping. It fits perfectly and the <strong>craftsmanship is exceptional.</strong>`,
      product: 'Atlas Step-In Harness',
      verified: true,
    },
    {
      name: 'Priya L.',
      info: 'Dachshund mom · London',
      avatar: 'PL',
      rating: 5,
      text: `I'm obsessed. The Orthopedic Bed is <strong>so luxurious</strong> that I kind of want one myself. Max sleeps 14 hours a day and looks so peaceful.`,
      product: 'Orthopedic Memory Bed',
      verified: true,
    },
    {
      name: 'Tom R.',
      info: 'Husky parent · Colorado',
      avatar: 'TR',
      rating: 5,
      text: `Trail Expedition Harness is everything. We hike 20 miles a week and it holds up perfectly. <strong>Worth every penny</strong> — built for real adventure.`,
      product: 'Trail Expedition Harness',
      verified: true,
    },
    {
      name: 'Maya S.',
      info: 'Poodle parent · Paris',
      avatar: 'MS',
      rating: 5,
      text: `The packaging alone made me emotional. You can tell this brand <strong>genuinely cares.</strong> Coco adores her new collar and I adore the brand.`,
      product: 'Waxed Canvas Collar',
      verified: true,
    },
    {
      name: 'Daniel W.',
      info: 'Labrador parent · Toronto',
      avatar: 'DW',
      rating: 5,
      text: `Third order from Pawvara and they keep getting better. Customer support helped me pick the right harness size and <strong>got it right on the first try.</strong>`,
      product: 'City Slim Harness',
      verified: true,
    },
  ];

  function stars(n) {
    return Array(n).fill('<span>★</span>').join('');
  }

  track.innerHTML = testimonials.map(t => `
    <div class="testi-card" data-tilt>
      <div class="testi-stars text-gold">${stars(t.rating)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar" style="background:var(--stone)">${t.avatar}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-info">${t.info} · <em>${t.product}</em></div>
        </div>
        ${t.verified ? `<div class="testi-verified">✓ Verified</div>` : ''}
      </div>
    </div>
  `).join('');

  function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  createCarousel({
    trackEl: track,
    prevBtn: prev,
    nextBtn: next,
    itemSelector: '.testi-card',
    visibleCount: Math.floor(getVisible()),
    gap: 20,
    infinite: true,
    autoplay: true,
    autoplayDelay: 6000,
  });
})();