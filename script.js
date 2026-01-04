
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initScrollSpy();
    initScrollProgress();
    initStatsCounter();
    initProjectFilter();
    initQuickContact();
});

/* --------------------------------------------------------------------------
   Navigation Functionality
   -------------------------------------------------------------------------- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   Smooth Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScrolling() {
    // Get all links that start with #
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    // Add fade-in class to elements we want to animate
    const animatedElements = [
        '.skill-category',
        '.project-card',
        '.service-card',
        '.education-card',
        '.about-text',
        '.about-image',
        '.contact-info',
        '.contact-form'
    ];

    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    // Create intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/* --------------------------------------------------------------------------
   Skill Bars Animation
   -------------------------------------------------------------------------- */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    // Store original widths and reset to 0
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });

    // Create observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-progress');
                skillItems.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    }, index * 100); // Stagger animation
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

/* --------------------------------------------------------------------------
   Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                // Success - reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                showFormMessage('Thank you! Your message has been sent.', 'success');
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;

    // Style the message
    messageEl.style.cssText = `
        padding: 12px 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        animation: fadeInUp 0.3s ease;
    `;

    if (type === 'success') {
        messageEl.style.background = 'rgba(100, 255, 218, 0.1)';
        messageEl.style.color = '#64ffda';
        messageEl.style.border = '1px solid rgba(100, 255, 218, 0.3)';
    } else {
        messageEl.style.background = 'rgba(255, 100, 100, 0.1)';
        messageEl.style.color = '#ff6b6b';
        messageEl.style.border = '1px solid rgba(255, 100, 100, 0.3)';
    }

    // Insert at top of form
    const form = document.getElementById('contact-form');
    form.insertBefore(messageEl, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        messageEl.style.transition = 'all 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

/* --------------------------------------------------------------------------
   Scroll Spy - Active Nav Link
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Initial call
    updateActiveLink();
}

/* --------------------------------------------------------------------------
   Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function updateBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const percent = docHeight ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${percent}%`;
    }

    window.addEventListener('scroll', updateBar);
    updateBar();
}

/* --------------------------------------------------------------------------
   Stats Count Up
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10) || 0;
                let current = 0;
                const step = Math.max(1, Math.floor(target / 50));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current;
                }, 20);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    stats.forEach(stat => observer.observe(stat));
}

/* --------------------------------------------------------------------------
   Project Filter
   -------------------------------------------------------------------------- */
function initProjectFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.project-card');
    if (!chips.length || !cards.length) return;

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;
            cards.forEach(card => {
                const category = card.dataset.category;
                const match = filter === 'all' || category === filter;
                card.style.display = match ? 'flex' : 'none';
            });
        });
    });
}

/* --------------------------------------------------------------------------
   Quick Contact Modal
   -------------------------------------------------------------------------- */
function initQuickContact() {
    const openBtn = document.getElementById('quick-contact-btn');
    const modal = document.getElementById('quick-contact-modal');
    const closeBtn = document.getElementById('quick-close');
    const form = document.getElementById('quick-form');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        form.reset();
        modal.classList.remove('active');
        showFormMessage('Thanks! I will reply soon.', 'success');
    });
}

/* --------------------------------------------------------------------------
   Utility: Typing Effect (Optional Enhancement)
   -------------------------------------------------------------------------- */
function initTypingEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Console message for other developers
console.log('%c👋 Hello there, developer!', 'font-size: 16px; font-weight: bold; color: #64ffda;');
console.log('%cThis portfolio was built with HTML, CSS, and vanilla JavaScript.', 'font-size: 12px; color: #a8b2d1;');
console.log('%cFeel free to connect: gotamkumar582@gmail.com', 'font-size: 12px; color: #a8b2d1;');
