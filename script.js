// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {}, { passive: true });

// Burger
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  burger.classList.toggle('open', open);
});
document.querySelectorAll('.m-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
  });
});
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
  }
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.vis)');
    let idx = 0;
    siblings.forEach((s, i) => { if (s === entry.target) idx = i; });
    setTimeout(() => entry.target.classList.add('vis'), idx * 70);
    io.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 52, behavior: 'smooth' });
  });
});

// Chart bar animation on load
window.addEventListener('load', () => {
  document.querySelectorAll('.dc-bar').forEach((b, i) => {
    b.style.transformOrigin = 'bottom';
    b.style.transform = 'scaleY(0)';
    b.style.transition = `transform .45s ease ${i * .06 + .3}s`;
    requestAnimationFrame(() => { b.style.transform = 'scaleY(1)'; });
  });
});
