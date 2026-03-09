/* ============================================
   AQAR عقار — main.js
   Shared across index.html and privacy.html
   ============================================ */

/* ── Language toggle ── */
let isAr = true;

// Apply Arabic on page load
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';
  document.body.classList.add('ar');
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = 'English';
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.textContent = el.dataset.ar;
  });
});

function toggleLang() {
  isAr = !isAr;
  const html = document.documentElement;
  const btn = document.getElementById('langBtn');

  html.lang = isAr ? 'ar' : 'en';
  html.dir = isAr ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar', isAr);
  btn.textContent = isAr ? 'English' : 'العربية';

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = isAr ? el.dataset.ar : el.dataset.en;
  });
}

/* ── Nav: add .scrolled class on scroll ── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Staggered feature cards ── */
document.querySelectorAll('.feature-card.reveal, .cat-card.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
});

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => linkObserver.observe(s));
}

/* ── Smooth form submit feedback ── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    const btn = form.querySelector('.form-submit');
    btn.textContent = isAr ? 'جارٍ الإرسال...' : 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
  });
}

/* ── Tilt effect on feature cards (subtle) ── */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
