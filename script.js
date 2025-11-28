// ========================================
// Portfolio Website - JavaScript
// Author: Eshwar Kiran Ramavath
// ========================================

'use strict';

// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ========================================
// Theme Management (Dark Mode)
// ========================================

/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

/**
 * Set theme and update UI
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// ========================================
// Navigation & Scroll Handling
// ========================================

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
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

/**
 * Smooth scroll to section
 * @param {Event} e - Click event
 */
function smoothScrollToSection(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Adjust for navbar height
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinksContainer.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', smoothScrollToSection);
});

// ========================================
// Mobile Menu Toggle
// ========================================

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navLinksContainer.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && 
        !mobileMenuToggle.contains(e.target) && 
        navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ========================================
// Scroll to Top Button
// ========================================

/**
 * Show/hide scroll to top button based on scroll position
 */
function handleScrollToTopButton() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

scrollToTopBtn.addEventListener('click', scrollToTop);

// ========================================
// Project Filtering
// ========================================

/**
 * Filter projects based on category
 * @param {string} category - Project category to filter
 */
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');
        
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            // Add fade-in animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Handle filter button click
 * @param {Event} e - Click event
 */
function handleFilterClick(e) {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Get filter category
    const filterValue = this.getAttribute('data-filter');
    
    // Filter projects
    filterProjects(filterValue);
}

// Add click event listeners to filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', handleFilterClick);
});

// ========================================
// Intersection Observer for Animations
// ========================================

/**
 * Animate elements when they come into view
 */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections, cards, and other animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .skill-category, .timeline-item, .project-card, ' +
        '.education-card, .certification-card, .testimonial-card, .stat-card, .highlight-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .service-card, .skill-category, .timeline-item, .project-card,
    .education-card, .certification-card, .testimonial-card, .stat-card, .highlight-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .service-card.animate-in, .skill-category.animate-in, .timeline-item.animate-in,
    .project-card.animate-in, .education-card.animate-in, .certification-card.animate-in,
    .testimonial-card.animate-in, .stat-card.animate-in, .highlight-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ========================================
// Contact Form Handling
// ========================================

/**
 * Handle contact form submission
 * @param {Event} e - Submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Create mailto link with form data
    const mailtoLink = `mailto:r.eshwarkiran@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Opening your email client...', 'success');
    
    // Reset form
    contactForm.reset();
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success' or 'error')
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease-out',
        fontWeight: '600'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

contactForm.addEventListener('submit', handleFormSubmit);

// ========================================
// Typing Animation for Hero Section
// ========================================

/**
 * Create typing animation effect
 * @param {HTMLElement} element - Element to animate
 * @param {string[]} words - Array of words to type
 * @param {number} wait - Wait time between words
 */
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.textContent = this.txt;
        
        let typeSpeed = 150;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ========================================
// Statistics Counter Animation
// ========================================

/**
 * Animate counter numbers
 * @param {HTMLElement} element - Counter element
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

/**
 * Initialize counter animations when in viewport
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent.replace(/\D/g, ''));
                animateCounter(target, value);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ========================================
// Window Event Listeners
// ========================================

// Scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleScrollToTopButton();
    
    // Debounce active nav link update
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavLink, 100);
}, { passive: true });

// Resize event
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navLinksContainer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }, 250);
});

// ========================================
// Page Load Event
// ========================================

/**
 * Initialize all functionality when DOM is loaded
 */
function init() {
    // Initialize theme
    initTheme();
    
    // Initialize intersection observer for animations
    initIntersectionObserver();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Set initial navbar state
    handleNavbarScroll();
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    console.log('Portfolio website initialized successfully! 🚀');
}

// Run init when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Service Worker Registration (Optional)
// ========================================

/**
 * Register service worker for PWA support
 * Uncomment to enable
 */
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/

// ========================================
// Export for testing (if needed)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        filterProjects,
        debounce,
        throttle
    };
}
