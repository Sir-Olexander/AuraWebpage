/**
 * Aura Landing Page - Main JavaScript
 * Handles mobile menu, scroll animations, and smooth scrolling
 */

(function() {
  'use strict';

  // ========== Mobile Menu ==========
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ========== Smooth Scrolling ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileMenu();

        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== Scroll Animations ==========
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after animation
        // animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(element => {
    animationObserver.observe(element);
  });

  // ========== Navigation Background on Scroll ==========
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      nav.style.background = 'rgba(9, 11, 20, 0.95)';
    } else {
      nav.style.background = 'rgba(9, 11, 20, 0.85)';
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ========== Active Navigation Link ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ========== Parallax Effect for Hero Glow ==========
  const heroGlows = document.querySelectorAll('.hero__glow');

  function handleParallax() {
    const scrollY = window.scrollY;

    heroGlows.forEach((glow, index) => {
      const speed = index === 0 ? 0.3 : 0.2;
      glow.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  // Only apply parallax on desktop
  if (window.innerWidth >= 1024) {
    window.addEventListener('scroll', handleParallax, { passive: true });
  }

  // ========== Intersection Observer for Lazy Loading ==========
  // Images with loading="lazy" are handled by the browser
  // This is a fallback for older browsers
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
  } else {
    // Fallback: use Intersection Observer for lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ========== Form Handling (if needed) ==========
  // Placeholder for future form handling
  // const forms = document.querySelectorAll('form');
  // forms.forEach(form => {
  //   form.addEventListener('submit', handleFormSubmit);
  // });

  // ========== Console Easter Egg ==========
  console.log('%c✨ Aura', 'font-size: 24px; font-weight: bold; color: #7B61FF;');
  console.log('%cAI-powered dating assistant', 'font-size: 14px; color: #A0A0B0;');
  console.log('%cNever stare at your screen again.', 'font-size: 12px; color: #6B6E80;');

})();