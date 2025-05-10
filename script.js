// Promo Banner Toggle
const promoBanner = document.querySelector('.promo-banner');
const promoClose = document.querySelector('.promo-close');

document.addEventListener('DOMContentLoaded', () => {
    // Handle Promo Banner Close
    const promoBanner = document.querySelector('.promo-banner');
    const promoClose = document.querySelector('.promo-close');
    
    if (promoClose) {
        promoClose.addEventListener('click', () => {
            promoBanner.style.transform = 'translateY(-100%)';
            promoBanner.style.transition = 'transform 0.3s ease';
            
            // Store preference in localStorage
            localStorage.setItem('promoBannerClosed', 'true');
            
            // Remove banner after animation
            setTimeout(() => {
                promoBanner.remove();
            }, 300);
        });
    }

    // Check if banner should be shown
    if (localStorage.getItem('promoBannerClosed') === 'true') {
        promoBanner.style.display = 'none';
    }

    // Premium Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all scroll effect elements
    document.querySelectorAll('.scroll-effect').forEach(element => {
        observer.observe(element);
    });

    // Premium Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Premium Hover Effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            // Toggle active class on the item
            item.classList.toggle('active');
            
            // Toggle content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Why Choose Us Accordion
    const whyChooseAccordion = document.querySelector('.why-choose-us-accordion');
    if (whyChooseAccordion) {
        const accordionHeader = whyChooseAccordion.querySelector('.accordion-header');
        const accordionContent = whyChooseAccordion.querySelector('.accordion-content');

        accordionHeader.addEventListener('click', () => {
            whyChooseAccordion.classList.toggle('active');
            const isActive = whyChooseAccordion.classList.contains('active');
            accordionHeader.setAttribute('aria-expanded', isActive);
            if (isActive) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
        // Optional: keyboard accessibility
        accordionHeader.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                accordionHeader.click();
            }
        });
    }

    // Search functionality for FAQ
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            faqItems.forEach(item => {
                const title = item.querySelector('.faq-trigger span').textContent.toLowerCase();
                const content = item.querySelector('.faq-content').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Buy Now Button Animation
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Initialize Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that should be animated
document.querySelectorAll('.product-card, .testimonial-card, .faq-item, .step').forEach(element => {
    observer.observe(element);
});

// Add animation classes for scroll effects
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
});
