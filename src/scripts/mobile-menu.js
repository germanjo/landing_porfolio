/**
 * Mobile Menu Toggle Module
 * Handles hamburger menu open/close with smooth transitions
 */

// Prevent double initialization
let menuInitialized = false;

export function initMobileMenu() {
  if (menuInitialized) {
    console.log('Mobile menu already initialized, skipping');
    return;
  }
  menuInitialized = true;
  
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  
  console.log('Mobile menu init:', { toggle: !!toggle, mobileNav: !!mobileNav });
  
  if (!toggle || !mobileNav) {
    console.warn('Mobile menu: elements not found');
    return;
  }
  
  const closeMenu = () => {
    console.log('Closing menu');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
  };
  
  const openMenu = () => {
    console.log('Opening menu');
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
  };
  
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle clicked!', toggle.getAttribute('aria-expanded'));
    console.trace('Stack trace');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close menu on link click
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
  
  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      closeMenu();
    }
  });
}
