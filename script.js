const body = document.body;
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

const closeNav = () => {
  body.classList.remove('nav-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
};

toggle?.addEventListener('click', () => {
  const open = !body.classList.contains('nav-open');
  body.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

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
  if (path && /^\/(?:|it\/|de\/|es\/|fr\/)$/u.test(path)) window.location.assign(path);
});
