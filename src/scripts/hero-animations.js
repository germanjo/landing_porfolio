/**
 * Hero Animations Module
 * Smooth entrance animations with shorter timing
 */

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate hero badge
 */
function animateBadge(badge) {
  if (prefersReducedMotion()) {
    badge.style.opacity = '1';
    badge.style.transform = 'none';
    return Promise.resolve();
  }

  return badge.animate(
    [
      { opacity: 0, transform: 'translateY(-15px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }
  ).finished;
}

/**
 * Animate title lines with stagger - faster
 */
function animateTitleLines(titleLines) {
  if (!titleLines || titleLines.length === 0) return Promise.resolve();
  
  if (prefersReducedMotion()) {
    titleLines.forEach(line => {
      line.style.opacity = '1';
      line.style.transform = 'none';
    });
    return Promise.resolve();
  }

  const animations = titleLines.map((line, index) => {
    return line.animate(
      [
        { opacity: 0, transform: 'translateY(15px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 400,
        delay: index * 50,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    ).finished;
  });

  return Promise.all(animations);
}

/**
 * Animate subtitle - starts right after title
 */
function animateSubtitle(subtitle) {
  if (prefersReducedMotion()) {
    subtitle.style.opacity = '1';
    return Promise.resolve();
  }

  return subtitle.animate(
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration: 400,
      delay: 50,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }
  ).finished;
}

/**
 * Animate CTAs - starts right after subtitle
 */
function animateCTAs(ctaButtons) {
  if (prefersReducedMotion()) {
    ctaButtons.forEach(btn => {
      btn.style.opacity = '1';
      btn.style.transform = 'none';
    });
    return Promise.resolve();
  }

  const animations = ctaButtons.map((btn, index) => {
    return btn.animate(
      [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 400,
        delay: 100 + (index * 50),
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    ).finished;
  });

  return Promise.all(animations);
}

/**
 * Animate stats - simple fade
 */
function animateStats(stats) {
  if (prefersReducedMotion()) {
    stats.forEach(stat => {
      stat.style.opacity = '1';
    });
    return Promise.resolve();
  }

  const animations = stats.map((stat, index) => {
    return stat.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 300, delay: index * 50, easing: 'ease-out', fill: 'forwards' }
    ).finished;
  });

  return Promise.all(animations);
}

/**
 * Initialize hero entrance animations
 */
export function initHeroAnimations() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const badge = hero.querySelector('.hero-badge');
  const titleLines = Array.from(hero.querySelectorAll('.title-line'));
  const subtitle = hero.querySelector('.hero-subtitle');
  const ctaButtons = Array.from(hero.querySelectorAll('.hero-cta .btn'));
  const stats = Array.from(hero.querySelectorAll('.hero-stats .stat'));

  // Set initial state
  const setInitialState = (elements) => {
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '0';
      }
    });
  };

  if (!prefersReducedMotion()) {
    setInitialState([badge, ...titleLines, subtitle, ...ctaButtons, ...stats]);
  }

  // Run animations - flows smoothly
  const runAnimations = async () => {
    try {
      // Start sequentially without long waits
      if (badge) await animateBadge(badge);
      if (titleLines.length) await animateTitleLines(titleLines);
      if (subtitle) await animateSubtitle(subtitle);
      if (ctaButtons.length) await animateCTAs(ctaButtons);
      if (stats.length) await animateStats(stats);
    } catch (e) {
      // Silently handle
    }
  };

  runAnimations();

  // Safety net
  setTimeout(() => {
    const all = [badge, ...titleLines, subtitle, ...ctaButtons, ...stats];
    all.forEach(el => {
      if (el && el.style.opacity === '0') {
        el.style.opacity = '1';
      }
    });
    // Reset stat numbers
    stats.forEach(stat => {
      const num = stat.querySelector('.stat-number');
      if (num && num.textContent === '0+') {
        // Will be set by countUp
      }
    });
  }, 3000);
}

export function init() {
  initHeroAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
