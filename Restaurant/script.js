/* ═══════════════════════════════════════
   AFANA AFROCENTRIC — script.js
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. DARK / LIGHT MODE ──────────────────────────────────
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('afana-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('afana-theme', next);
  });


  // ── 2. NAVBAR SCROLL ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  // ── 3. MOBILE BURGER MENU ─────────────────────────────────
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });


  // ── 4. SCROLL REVEAL ──────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));


  // ── 5. SPLIDE CAROUSEL ────────────────────────────────────
  if (document.querySelector('#menuSplide')) {
    new Splide('#menuSplide', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '24px',
      padding: { left: 0, right: '4%' },
      arrows: true,
      pagination: true,
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      breakpoints: {
        1024: { perPage: 2, padding: { right: '6%' } },
        640:  { perPage: 1, padding: { right: '12%' } },
      },
    }).mount();
  }


  // ── 6. ACTIVE NAV LINK (scroll spy) ───────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => sectionObserver.observe(s));

});