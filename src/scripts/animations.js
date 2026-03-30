/**
 * Scroll Animations Module
 * Uses Intersection Observer for scroll-triggered reveals
 */

export function initScrollAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Apply all animations immediately for users who prefer reduced motion
    document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }
  
  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  // Animation observer callback
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add small delay for smoother effect
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, 50);
        
        // Unobserve after revealing (animation plays once)
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Create observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observe all reveal elements
  const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right');
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
  
  // Handle reduced motion changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
      // If reduced motion is enabled, reveal everything immediately
      document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right').forEach(el => {
        el.classList.add('revealed');
      });
    } else {
      // Re-run observer for normal motion
      initScrollAnimations();
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
