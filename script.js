// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
  }
});

// Intersection Observer — staggered entrance animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const siblings = el.parentElement.querySelectorAll('[data-animate]');
    let delay = 0;
    siblings.forEach((sib, i) => {
      if (sib === el) delay = i * 80;
    });
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Animate mini-chart bars on hero load
window.addEventListener('load', () => {
  document.querySelectorAll('.bar').forEach((bar, i) => {
    bar.style.transform = 'scaleY(0)';
    bar.style.transformOrigin = 'bottom';
    bar.style.transition = `transform 0.5s ease ${i * 0.07}s`;
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.transform = 'scaleY(1)'; }, 300);
    });
  });
});
