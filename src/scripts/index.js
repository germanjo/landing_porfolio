/**
 * NEXUS 2026 Landing Page - Main Entry Point
 * Initializes all JavaScript modules
 */

// Import and initialize modules
import { initMobileMenu } from './mobile-menu.js';
import { initScrollAnimations } from './animations.js';
import { initHeroAnimations } from './hero-animations.js';

/**
 * Initialize all JavaScript functionality
 */
function init() {
  // Mark that JS is running - enables animation states
  document.body.classList.add('has-js');
  
  // Mobile menu
  initMobileMenu();
  
  // Hero entrance animations (WAAPI)
  initHeroAnimations();
  
  // Scroll animations
  initScrollAnimations();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
}

/**
 * Add scroll effect to header (background opacity)
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  // Initial check
  handleScroll();
  
  // Listen for scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Enhanced smooth scroll for anchor links
 */
function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Set focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
