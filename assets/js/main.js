/* ============================================
   main.js - Interactive Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Loader =====
    const loader = document.getElementById('loader');
    setTimeout(() => { loader.classList.add('hidden'); }, 1500);

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 60;
        navbar.classList.toggle('scrolled', scrolled);
        backToTop.classList.toggle('show', window.scrollY > 500);
    });

    // ===== Mobile Menu =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== Back to Top =====
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Particle Background (hero) =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particle.style.width = particle.style.height = (3 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(particle);
        }
    }

    // ===== Global Particle Background (all sections) =====
    const globalParticles = document.getElementById('globalParticles');
    if (globalParticles) {
        for (let i = 0; i < 90; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 22 + 's';
            p.style.animationDuration = (16 + Math.random() * 14) + 's';
            p.style.width = p.style.height = (4 + Math.random() * 5) + 'px';
            globalParticles.appendChild(p);
        }
    }

    // ===== Number Counter Animation =====
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }

    // Trigger counter when hero stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 500);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroStats);
    }

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll(
        '.biz-card, .info-card, .feature-card, .culture-card, .partner-card, ' +
        '.product-card, .industry-card, .fact-item, .contact-item, ' +
        '.about-text p, .key-facts'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Product Tabs =====
    const productTabs = document.querySelectorAll('.product-tab');
    const productPanels = document.querySelectorAll('.product-panel');

    productTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            productTabs.forEach(t => t.classList.remove('active'));
            productPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.querySelector(`.product-panel[data-panel="${targetTab}"]`).classList.add('active');
        });
    });

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Here you would normally send to a backend API
            // For now, we'll simulate a successful submission
            console.log('Form submission:', data);

            // Show success message
            formSuccess.classList.add('show');
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== Parallax Effect on Hero =====
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
            }
        });
    }
});

// ===== Google Analytics (Placeholder) =====
// Replace G-XXXXXXXXXX with actual tracking ID when deploying
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'G-XXXXXXXXXX');
