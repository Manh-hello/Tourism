// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('backToTop');
const fabButton = document.getElementById('fabButton');

// Carousel Elements
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let slideInterval;

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Back to Top Functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Carousel Functionality
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Carousel Controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Indicator Controls
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
    });
});

// Auto-play Carousel
function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Start carousel auto-play
startInterval();

// Pause carousel on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

heroSection.addEventListener('mouseleave', () => {
    startInterval();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .service-card, .audience-card, .contact-card, .about-text, .about-images');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal elements
document.querySelectorAll('.feature-card, .service-card, .audience-card, .contact-card, .about-text, .about-images').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.8s ease';
});

// Scroll event listener for reveal animation
window.addEventListener('scroll', revealOnScroll);

// Initial reveal check
revealOnScroll();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.carousel-slide img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// CTA Button Interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .audience-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard Navigation for Carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
    }
});

// Touch/Swipe Support for Carousel
let touchStartX = 0;
let touchEndX = 0;

heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetInterval();
    }
}

// Preload Images
function preloadImages() {
    const imageUrls = [
        'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        'https://images.pexels.com/photos/2131967/pexels-photo-2131967.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
        'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Performance optimization: Lazy loading for service images
const serviceImages = document.querySelectorAll('.service-image img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

serviceImages.forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .service-image img {
        transition: opacity 0.3s ease;
    }
    
    .service-image img:not(.loaded) {
        opacity: 0.7;
    }
    
    .service-image img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

console.log('Phong Nam Tourism Village website loaded successfully!');




// slide img 

class ImageSlider {
    constructor() {
        this.currentSlide = 0;
        this.imagesPerSlide = 5;
        this.totalImages = 15;
        this.totalSlides = Math.ceil(this.totalImages / this.imagesPerSlide);
        
        this.sliderTrack = document.getElementById('slider-track');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.indicatorsContainer = document.getElementById('indicators2');
        this.currentSlideSpan = document.getElementById('current-slide');
        this.totalSlidesSpan = document.getElementById('total-slides');
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.updateSlider();
        this.bindEvents();
        this.updateResponsiveSettings();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateResponsiveSettings();
            this.updateSlider();
        });
    }
    
    updateResponsiveSettings() {
        const width = window.innerWidth;
        
        if (width <= 480) {
            this.imagesPerSlide = 1;
        } else if (width <= 768) {
            this.imagesPerSlide = 2;
        } else {
            this.imagesPerSlide = 5;
        }
        
        this.totalSlides = Math.ceil(this.totalImages / this.imagesPerSlide);
        
        // Reset to first slide if current slide is out of bounds
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }
        
        this.createIndicators();
        this.updateProgressText();
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator2 ${i === this.currentSlide ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.sliderTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.sliderTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Mouse drag support
        let isDragging = false;
        let startMouseX = 0;
        let endMouseX = 0;
        
        this.sliderTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startMouseX = e.clientX;
            this.sliderTrack.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            endMouseX = e.clientX;
            this.sliderTrack.style.cursor = 'grab';
            
            const diffX = startMouseX - endMouseX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    handleSwipe() {
        const diffX = startX - endX;
        const minSwipeDistance = 50;
        
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateSlider();
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
    }
    
    updateSlider() {
        const translateX = -this.currentSlide * 100;
        this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        this.updateIndicators();
        this.updateProgressText();
        this.updateButtonStates();
        
        // Add animation class for smooth transition
        this.sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    updateIndicators() {
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator2');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    updateProgressText() {
        this.currentSlideSpan.textContent = this.currentSlide + 1;
        this.totalSlidesSpan.textContent = this.totalSlides;
    }
    
    updateButtonStates() {
        // Optional: Disable buttons at start/end (remove if you want infinite loop)
        // this.prevBtn.disabled = this.currentSlide === 0;
        // this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }
    
    // Auto-play functionality (optional)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    // Pause auto-play on hover
    enableAutoPlayPause() {
        const slider = document.querySelector('.slider');
        
        slider.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        slider.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slider = new ImageSlider();
    
    // Optional: Enable auto-play
    // slider.startAutoPlay(4000);
    // slider.enableAutoPlayPause();
    
    // Add loading animation to images
    const images = document.querySelectorAll('.card-image img');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.1}s`;
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Handle image loading errors
        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/400x500/e2e8f0/64748b?text=Image+Not+Found';
        });
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add CSS custom properties for dynamic theming
document.documentElement.style.setProperty('--primary-color', '#3b82f6');
document.documentElement.style.setProperty('--secondary-color', '#1e293b');
document.documentElement.style.setProperty('--accent-color', '#64748b');

// Utility function for debouncing resize events
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

// Add performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}