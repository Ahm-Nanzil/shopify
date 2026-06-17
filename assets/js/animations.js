/* ═══════════════════════════════════════
   PAWVARA — animations.js
   Scroll reveal · Counters · Parallax · Cursor
═══════════════════════════════════════ */

/* ── PAGE LOADER ── */
(function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
    }, 1600);
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ── STAGGER GRID REVEAL ── */
(function initStaggerGrids() {
  const grids = document.querySelectorAll('.stagger-grid');
  if (!grids.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('go');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  grids.forEach(g => io.observe(g));
})();

/* ── ANIMATED COUNTERS ── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.count);
    const decimal = el.dataset.countDecimal || 0;
    const prefix  = el.dataset.countPrefix || '';
    const suffix  = el.dataset.countSuffix || '';
    const dur     = parseInt(el.dataset.countDur || '1800');
    const start   = performance.now();

    function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      const val = target * ease(progress);
      el.textContent = prefix + val.toFixed(decimal) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* ── IMAGE REVEAL CLIP ── */
(function initImgReveal() {
  const wraps = document.querySelectorAll('.img-reveal-wrap');
  if (!wraps.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  wraps.forEach(w => io.observe(w));
})();

/* ── HERO PARALLAX ── */
(function initParallax() {
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero-orb');
  const heroImg = document.querySelector('.hero-img-wrap img');
  if (!hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const heroH = hero.offsetHeight;
        if (y > heroH) { ticking = false; return; }

        orbs.forEach((orb, i) => {
          const speed = (i + 1) * 0.08;
          orb.style.transform = `translateY(${y * speed}px)`;
        });

        if (heroImg) {
          heroImg.style.transform = `scale(1) translateY(${y * 0.12}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── MARQUEE DUPLICATE ── */
(function initMarquee() {
  const tracks = document.querySelectorAll('.marquee-track');
  tracks.forEach(track => {
    const clone = track.innerHTML;
    track.innerHTML = clone + clone; // Seamless loop
  });
})();

/* ── CURSOR GLOW (desktop only) ── */
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.id = 'cursorGlow';
  Object.assign(glow.style, {
    position: 'fixed',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(196,112,58,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '1',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.3s, transform 0.1s',
    opacity: '0',
    top: '0', left: '0',
  });
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function loop() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── MAGNETIC BUTTONS ── */
(function initMagnetic() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ── SECTION TILT (subtle cards) ── */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateZ(8px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ── SECTION BG COLOR TRANSITION on scroll ── */
(function initSectionBgSnap() {
  const sections = document.querySelectorAll('[data-bg-color]');
  if (!sections.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.style.backgroundColor = entry.target.dataset.bgColor;
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => io.observe(s));
})();

/* ── TEXT SCRAMBLE EFFECT ── */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJabcdefghijklmno';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const old = this.el.innerText;
    const len = Math.max(old.length, newText.length);
    const p = new Promise(res => this.resolve = res);
    this.queue = [];
    for (let i = 0; i < len; i++) {
      const from  = old[i] || '';
      const to    = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end   = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameReq);
    this.frame = 0;
    this.update();
    return p;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="opacity:0.4;color:var(--clay)">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameReq = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Expose globally
window.TextScramble = TextScramble;
window.showToast = typeof showToast !== 'undefined' ? showToast : function(){};