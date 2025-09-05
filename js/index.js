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
    
    // Hero Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    


    
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
    }
    

    
    /* ====================================================
       INITIALIZE COMPLETE
       ==================================================== */
    
});

/* ====================================================
   MODAL FUNCTIONS
   ==================================================== */

// Function to open Terms & Conditions Modal
function openTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
    }
}

// Function to close Terms & Conditions Modal
function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        // Add fade-out animation
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 200);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('termsModal');
    if (modal && e.target === modal) {
        closeTermsModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTermsModal();
    }
});

/* ====================================================
   IMAGE MODAL FUNCTIONS
   ==================================================== */

// Function to open image modal
function openImageModal(imageSrc, imageTitle) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modal && modalImage && modalTitle) {
        modalImage.src = imageSrc;
        modalImage.alt = imageTitle;
        modalTitle.textContent = imageTitle;
        
        // Show modal with animation
        modal.classList.remove('hidden');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
    }
}

// Function to close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        // Add fade-out animation
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 200);
    }
}

// Close image modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal && e.target === modal) {
        closeImageModal();
    }
});

// Close image modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
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

/* ====================================================
   GAME TAB FUNCTIONALITY
   ==================================================== */
function showGameTab(gameId) {
    // Hide all desktop game content
    const allDesktopContent = document.querySelectorAll('.game-content:not([id$="-mobile"])');
    allDesktopContent.forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    
    // Hide all mobile game content
    const allMobileContent = document.querySelectorAll('.game-content[id$="-mobile"]');
    allMobileContent.forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    
    // Remove active class from all desktop tabs
    const allDesktopTabs = document.querySelectorAll('.game-tab:not(.lg\\:hidden .game-tab)');
    allDesktopTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all mobile tabs
    const allMobileTabs = document.querySelectorAll('.lg\\:hidden .game-tab');
    allMobileTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected desktop game content
    const selectedDesktopContent = document.getElementById(gameId + '-content');
    if (selectedDesktopContent) {
        selectedDesktopContent.classList.remove('hidden');
        selectedDesktopContent.classList.add('active');
    }
    
    // Show selected mobile game content
    const selectedMobileContent = document.getElementById(gameId + '-content-mobile');
    if (selectedMobileContent) {
        selectedMobileContent.classList.remove('hidden');
        selectedMobileContent.classList.add('active');
    }
    
    // Add active class to selected desktop tab
    const selectedDesktopTab = document.querySelector(`[data-game="${gameId}"]:not(.lg\\:hidden [data-game="${gameId}"])`);
    if (selectedDesktopTab) {
        selectedDesktopTab.classList.add('active');
    }
    
    // Add active class to selected mobile tab
    const selectedMobileTab = document.querySelector(`.lg\\:hidden [data-game="${gameId}"]`);
    if (selectedMobileTab) {
        selectedMobileTab.classList.add('active');
    }
}

/* ====================================================
   TOURNAMENT TAB FUNCTIONALITY
   ==================================================== */
function showTournamentTab(tournamentId) {
    // Hide all tournament content
    const allContent = document.querySelectorAll('.tournament-content');
    allContent.forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.tournament-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tournament content
    const selectedContent = document.getElementById(tournamentId + '-content');
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
        selectedContent.classList.add('active');
    }
    
    // Show selected tournament content for mobile
    const selectedContentMobile = document.getElementById(tournamentId + '-content-mobile');
    if (selectedContentMobile) {
        selectedContentMobile.classList.remove('hidden');
        selectedContentMobile.classList.add('active');
    }
    
    // Add active class to selected tab
    const selectedTab = document.querySelector(`[data-tournament="${tournamentId}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}