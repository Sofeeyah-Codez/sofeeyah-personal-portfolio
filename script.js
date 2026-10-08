const loader = document.getElementById('loader');
const loaderCount = document.getElementById('loaderCount');
const loaderBar = document.querySelector('.loader__bar span');
const hero = document.querySelector('.hero');
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

let progress = 0;
const loaderTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 14) + 5;
  if (progress >= 100) progress = 100;
  loaderCount.textContent = String(progress).padStart(2, '0');
  loaderBar.style.width = `${progress}%`;
  if (progress === 100) {
    clearInterval(loaderTimer);
    setTimeout(() => {
      loader.classList.add('is-hidden');
      hero.classList.add('is-loaded');
    }, 250);
  }
}, 95);

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  nav.classList.toggle('menu-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', isOpen);
});

document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    nav.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  });
});

// Reveal-on-scroll system.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Slight stagger for skill panels and cards.
document.querySelectorAll('.skill-panel, .focus-card').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
});

// Typewriter effect cycling through role titles under the headline.
// Edit the ROLES array below to change or reorder the titles shown.
const typedRoleEl = document.getElementById('typedRole');
if (typedRoleEl) {
  const ROLES = [
    'Front-End Web Developer',
    'Creative Technologist',
    'Web Creator',
    'Digital Literacy Trainer',
    'AI Explorer',
    'Digital Problem Solver'
  ];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedRoleEl.textContent = ROLES[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = ROLES[roleIndex];
      if (!deleting) {
        charIndex++;
        typedRoleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
        setTimeout(typeLoop, 55);
      } else {
        charIndex--;
        typedRoleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          setTimeout(typeLoop, 300);
          return;
        }
        setTimeout(typeLoop, 28);
      }
    }
    typeLoop();
  }
}

// Subtle project visual movement on scroll (purely CSS-driven; this just
// updates one custom property, and styles.css handles the actual motion).
const projectVisuals = document.querySelectorAll('.project__visual');
window.addEventListener('scroll', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  projectVisuals.forEach(project => {
    const rect = project.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const shift = (progress - .5) * 20;
    project.style.setProperty('--scroll-shift', `${shift}px`);
  });
}, { passive: true });

year.textContent = new Date().getFullYear();

// Contact form: no backend needed — it opens the visitor's email app with
// everything addressed and filled in, ready to send to your inbox.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const subject = data.get('subject') || 'Portfolio inquiry';
    const message = data.get('message') || '';

    const destination = 'olanrewajusofiyat1@gmail.com'; // change this if your email changes
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Logo click: just scroll to the top (no loading animation — the loader
// is only for the very first page load).
document.querySelectorAll('.brand').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  });
});
