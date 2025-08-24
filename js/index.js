/* ====================================================
   MALTAS ESPORTS COMMUNITY - JAVASCRIPT
   Main JavaScript untuk Carousel & Other Features
   ==================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ====================================================
       MARQUEE FALLBACK - JIKA CSS TIDAK BEKERJA
       ==================================================== */
    const marqueeElement = document.querySelector('.animate-marquee');
    if (marqueeElement) {
        // Pastikan marquee berjalan dengan JavaScript jika CSS gagal
        let marqueePosition = 100; // Mulai dari kanan (100vw)
        
        function moveMarquee() {
            marqueePosition -= 0.1; // Kecepatan gerakan
            
            if (marqueePosition < -100) {
                marqueePosition = 100; // Reset ke kanan
            }
            
            marqueeElement.style.transform = `translateX(${marqueePosition}vw)`;
            requestAnimationFrame(moveMarquee);
        }
        
        // Cek apakah CSS animation berjalan
        const computedStyle = window.getComputedStyle(marqueeElement);
        if (computedStyle.animationName === 'none' || computedStyle.animationName === '') {
            // Jika CSS animation tidak berjalan, gunakan JavaScript
            
            moveMarquee();
        }
    }
    
    /* ====================================================
       HERO SECTION FUNCTIONALITY
       ==================================================== */
    
    // Date and Time Display
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        const dateElement = document.getElementById('currentDate');
        const timeElement = document.getElementById('currentTime');
        
        if (dateElement && timeElement) {
            dateElement.textContent = now.toLocaleDateString('id-ID', options);
            timeElement.textContent = now.toLocaleTimeString('id-ID', timeOptions);
        }
    }
    
    // Update time every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    /* ====================================================
       HERO SECTION FUNCTIONALITY
       ==================================================== */
    
    // Date and Time Display
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        const dateElement = document.getElementById('currentDate');
        const timeElement = document.getElementById('currentTime');
        
        if (dateElement && timeElement) {
            dateElement.textContent = now.toLocaleDateString('id-ID', options);
            timeElement.textContent = now.toLocaleTimeString('id-ID', timeOptions);
        }
    }
    
    // Update time every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Hero Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    
    console.clear();
    console.log('🎯 CAROUSEL DEBUG INFO - 3 SLIDES:');
    console.log('Number of slides detected:', slides.length);
    console.log('Number of indicators detected:', indicators.length);
    console.log('Expected: 3 slides, 3 indicators');
    console.log('Slides:', slides);
    console.log('Indicators:', indicators);

    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.transform = 'translateX(0%)';
            } else if (i < index) {
                slide.style.transform = 'translateX(-100%)';
            } else {
                slide.style.transform = 'translateX(100%)';
            }
        });
        
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('bg-white/40');
                indicator.classList.add('bg-white/80');
            } else {
                indicator.classList.remove('bg-white/80');
                indicator.classList.add('bg-white/40');
            }
        });
        
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
    
    // Event listeners for carousel
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    // Indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Initialize first slide
    showSlide(0);
    
    // Auto-play carousel
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const carouselContainer = document.getElementById('heroCarousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }
    
    /* ====================================================
       AOS INITIALIZATION
       ==================================================== */
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false,
            offset: 50,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
        
        // Refresh AOS on window resize
        window.addEventListener('resize', function() {
            AOS.refresh();
        });
        
        console.log('🎯 AOS Animations Initialized Successfully!');
    } else {
        console.warn('⚠️ AOS library not loaded');
    }
    
    /* ====================================================
       INITIALIZE COMPLETE
       ==================================================== */
    console.log('🎮 Maltas Esports Community - All Systems Loaded!');
});

/* ====================================================
   UTILITY FUNCTIONS
   ==================================================== */

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Check if device supports touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target, duration = 800) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override smooth scroll behavior
    window.smoothScrollTo = smoothScrollPolyfill;
}