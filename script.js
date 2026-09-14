const body = document.body;
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
let navScrollY = 0;

const closeNav = () => {
  if (!body.classList.contains('nav-open')) return;
  body.classList.remove('nav-open');
  body.style.removeProperty('--nav-scroll-offset');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
  window.scrollTo(0, navScrollY);
};

toggle?.addEventListener('click', () => {
  const open = !body.classList.contains('nav-open');
  if (open) {
    navScrollY = window.scrollY;
    body.style.setProperty('--nav-scroll-offset', `-${navScrollY}px`);
    body.classList.add('nav-open');
  } else {
    closeNav();
  }
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((node) => node.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((node) => observer.observe(node));
}

document.querySelector('[data-notify]')?.addEventListener('click', () => {
  const status = document.querySelector('[data-notify-status]');
  if (status) status.textContent = 'Early access is not collecting personal data yet. Check back after device testing.';
});

document.querySelector('[data-language]')?.addEventListener('change', (event) => {
  const path = event.target.value;
  if (path && /^\/(?:|it\/|de\/|es\/|fr\/)$/u.test(path)) {
    const previewBase = window.location.hostname.endsWith('.github.io') ? '/run-earn-back-site' : '';
    window.location.assign(`${previewBase}${path}`);
  }
});
