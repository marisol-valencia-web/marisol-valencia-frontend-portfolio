/* ═══════════════════════════════════════════════════════════════
   script.js — Portfolio interactions
   ─ Scroll-triggered reveal (IntersectionObserver, no library)
   ─ Nav shadow on scroll
   ─ Mobile nav toggle (hamburger)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ─────────────────────────────────────────
     Elements with class .reveal animate in when they enter view.
     Stagger delays are set via .reveal-d1, .reveal-d2, .reveal-d3
     in CSS (transition-delay).
     ──────────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // animate once only
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));


  /* ── 2. NAV SCROLL SHADOW ─────────────────────────────────────
     Adds .scrolled to .nav-wrap when page is scrolled > 24px.
     CSS handles the box-shadow transition.
     ──────────────────────────────────────────────────────────── */
  const navWrap = document.querySelector('.nav-wrap');

  if (navWrap) {
    const handleNavScroll = () => {
      navWrap.classList.toggle('scrolled', window.scrollY > 24);
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load
  }


  /* ── 3. MOBILE NAV TOGGLE ─────────────────────────────────────
     Toggles .open on #navLinks and .open on #navToggle.
     Closes automatically when a nav link is clicked.
     ──────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when any link is tapped
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (!navWrap.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();
