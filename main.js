document.addEventListener('DOMContentLoaded', () => {

  // --- Hamburger Nav ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Detection ---
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // --- Active Nav Link ---
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('nav-active');
    }
  });

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  // --- Custom Cursor (desktop only) ---
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  // --- Filter System (films & news) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        document.querySelectorAll('[data-category]').forEach((card, i) => {
          const show = cat === 'all' || card.dataset.category === cat;
          card.style.transition = 'opacity 0.3s, transform 0.3s';
          if (show) {
            setTimeout(() => {
              card.style.display = '';
              requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });
            }, i * 60);
          } else {
            card.style.opacity = '0'; card.style.transform = 'translateY(16px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 24);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  // --- Marquee Duplication ---
  document.querySelectorAll('.marquee-content').forEach(el => {
    if (!el.dataset.duped) { el.innerHTML += el.innerHTML; el.dataset.duped = '1'; }
  });

  // --- Contact Form ---
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...'; btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Sent!';
        const msg = document.createElement('div');
        msg.className = 'form-success';
        msg.textContent = 'Thank you! We\'ll get back to you shortly.';
        form.parentNode.insertBefore(msg, form.nextSibling);
        setTimeout(() => { form.reset(); btn.textContent = orig; btn.disabled = false; msg.remove(); }, 5000);
      }, 1800);
    });
  }

  // --- Skill Bar Animation ---
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { bar.style.width = bar.dataset.width; obs.unobserve(bar); } });
    }, { threshold: 0.3 });
    obs.observe(bar);
  });

  // --- Page Loaded ---
  document.body.classList.add('loaded');

});
