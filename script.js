// Promo Banner Toggle
const promoBanner = document.querySelector('.promo-banner');
const promoClose = document.querySelector('.promo-close');

document.addEventListener('DOMContentLoaded', () => {
    // Handle Promo Banner Close
    const promoBanner = document.querySelector('.promo-banner');
    const promoClose = document.querySelector('.promo-close');
    
    if (promoBanner) {
        document.body.classList.add('has-promo-banner');
    }
    
    if (promoClose) {
        promoClose.addEventListener('click', () => {
            promoBanner.style.transform = 'translateY(-100%)';
            promoBanner.style.opacity = '0';
            promoBanner.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            // Store preference in localStorage
            localStorage.setItem('promoBannerClosed', 'true');
            
            // Remove banner after animation
            setTimeout(() => {
                promoBanner.remove();
                document.body.classList.remove('has-promo-banner');
            }, 300);
        });
    }

    // Check if banner should be shown
    if (localStorage.getItem('promoBannerClosed') === 'true') {
        promoBanner.style.display = 'none';
        document.body.classList.remove('has-promo-banner');
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

// --- OPTIMIZATION & IMPROVEMENT SECTION ---

// 1. Promo Banner: Only add padding if banner is visible
function updatePromoBannerPadding() {
    const promoBanner = document.querySelector('.promo-banner');
    if (promoBanner && promoBanner.style.display !== 'none') {
        document.body.classList.add('has-promo-banner');
    } else {
        document.body.classList.remove('has-promo-banner');
    }
}

// 2. Floating WhatsApp Bubble: Clickable on entire bubble (mobile & desktop)
const floatingBubble = document.querySelector('.floating-bubble');
if (floatingBubble) {
    floatingBubble.addEventListener('click', function(e) {
        // Always open WhatsApp unless clicking a link (for accessibility)
        if (!e.target.closest('a')) {
            window.open('https://wa.me/6289681861461', '_blank');
        }
    });
    // On mobile, also make the icon itself a direct link for accessibility
    const bubbleIcon = floatingBubble.querySelector('i.fab.fa-whatsapp');
    if (bubbleIcon) {
        bubbleIcon.style.cursor = 'pointer';
        bubbleIcon.addEventListener('click', function(e) {
            window.open('https://wa.me/6289681861461', '_blank');
            e.stopPropagation();
        });
    }
}

// 3. Footer: Current year auto update
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${new Date().getFullYear()} hawpiwstore. Hak Cipta Dilindungi.`;
}

// 4. Accordion accessibility improvement (FAQ & Why Choose Us)
document.querySelectorAll('.faq-trigger, .accordion-header').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
    btn.addEventListener('click', function() {
        const expanded = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', String(!expanded));
    });
});

// 5. Optimize scroll/animation event listeners (debounce)
function debounce(fn, wait) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}
window.addEventListener('scroll', debounce(() => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}, 50));

// 6. Ensure promo banner padding is always correct on load/close
window.addEventListener('DOMContentLoaded', updatePromoBannerPadding);
window.addEventListener('resize', updatePromoBannerPadding);
