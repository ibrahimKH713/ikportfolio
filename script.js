// ==========================================================================
// 1. DARK / LIGHT THEME TOGGLE (Persists in LocalStorage)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const rootElement = document.documentElement;

// Check saved user preference in localStorage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  rootElement.setAttribute('data-theme', 'dark');
  themeIcon.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = rootElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    rootElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    localStorage.setItem('portfolio-theme', 'light');
  } else {
    rootElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    localStorage.setItem('portfolio-theme', 'dark');
  }
});

// ==========================================================================
// 2. MOBILE NAVIGATION MENU TOGGLE
// ==========================================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// ==========================================================================
// 3. SCROLL REVEAL ANIMATION (IntersectionObserver)
// ==========================================================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================================================
// 4. ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
// ==========================================================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
});

// ==========================================================================
// 5. DYNAMIC FOOTER YEAR & PLACEHOLDER LINK GUARD
// ==========================================================================
document.getElementById('current-year').textContent = new Date().getFullYear();

// Prevent placeholder '#' links from jumping to the top of the page until replaced
document.querySelectorAll('.placeholder-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') {
      e.preventDefault();
      alert('Placeholder link: Replace the href="#" in index.html with your actual URL when ready.');
    }
  });
});
