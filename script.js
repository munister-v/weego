document.documentElement.classList.add('js');

const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav && nav) {
  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', open);
  });

  document.querySelectorAll('.m-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.vis)');
      let idx = 0;
      siblings.forEach((sibling, i) => {
        if (sibling === entry.target) idx = i;
      });
      setTimeout(() => entry.target.classList.add('vis'), idx * 70);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealItems.forEach(el => io.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('vis'));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 52, behavior: 'smooth' });
  });
});

window.addEventListener('load', () => {
  document.querySelectorAll('.dc-bar').forEach((bar, i) => {
    bar.style.transformOrigin = 'bottom';
    bar.style.transform = 'scaleY(0)';
    bar.style.transition = `transform .45s ease ${i * .06 + .3}s`;
    requestAnimationFrame(() => {
      bar.style.transform = 'scaleY(1)';
    });
  });
});
