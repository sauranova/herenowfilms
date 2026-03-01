/* ============================================================
   HERE NOW FILMS — Main JavaScript
   ============================================================ */

'use strict';

/* ── CUSTOM CURSOR ─────────────────────────────────────────── */
(function initCursor() {
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
})();

/* ── NAVIGATION ────────────────────────────────────────────── */
(function initNav() {
  const nav  = document.querySelector('.nav');
  const ham  = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (ham && links) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link detection
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ── FILM FILTER ───────────────────────────────────────────── */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filmCards  = document.querySelectorAll('[data-genre]');
  if (!filterBtns.length || !filmCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      filmCards.forEach(card => {
        const match = filter === 'all' || card.dataset.genre === filter;
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(20px)';
        card.style.transition = 'opacity 0.3s, transform 0.3s';

        setTimeout(() => {
          card.style.display = match ? '' : 'none';
          requestAnimationFrame(() => {
            card.style.opacity   = match ? '1' : '0';
            card.style.transform = match ? 'translateY(0)' : 'translateY(20px)';
          });
        }, 200);
      });
    });
  });
})();

/* ── HERO PARALLAX ─────────────────────────────────────────── */
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroFilm    = document.querySelector('.hero-film-strip');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.12}px)`;
    if (heroFilm)    heroFilm.style.transform    = `translateY(${y * 0.06}px)`;
  }, { passive: true });
})();

/* ── COUNTER ANIMATION ─────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 24);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ── CONTACT FORM ──────────────────────────────────────────── */
(function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    const msgEl = document.createElement('div');
    msgEl.style.cssText = `
      margin-top: 1rem; padding: 1rem 1.5rem;
      border: 1px solid rgba(200, 164, 74, 0.4);
      font-family: 'Cormorant Garamond', serif;
      font-size: 1rem; color: var(--gold-light);
      background: rgba(200, 164, 74, 0.05);
    `;
    msgEl.textContent = 'Thank you. Your message has been received. We will be in touch soon.';
    form.appendChild(msgEl);

    btn.innerHTML = originalText;
    btn.disabled = false;
    form.reset();
    setTimeout(() => msgEl.remove(), 5000);
  });
})();

/* ── AWARDS TICKER DUPLICATE ───────────────────────────────── */
(function initTicker() {
  const ticker = document.querySelector('.awards-ticker');
  if (!ticker) return;
  // Duplicate inner items for seamless -50% loop
  ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
})();

/* ── SMOOTH HOVER TILT ─────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.film-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── PAGE LOAD COMPLETE ────────────────────────────────────── */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
