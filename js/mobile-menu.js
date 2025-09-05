/* ====================================================
   MALTAS ESPORTS COMMUNITY - MOBILE MENU JAVASCRIPT
   Khusus untuk Mobile Menu Functionality
   ==================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ====================================================
       MOBILE MENU FUNCTIONALITY
       ==================================================== */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (mobileMenuToggle && navMenu) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle mobile menu classes
            navMenu.classList.toggle('translate-x-0');
            navMenu.classList.toggle('translate-x-full');
            navMenu.classList.toggle('mobile-menu-active');
            
            // Toggle body overflow
            if (navMenu.classList.contains('translate-x-0')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
            
            // Update toggle button icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('translate-x-0')) {
                icon.className = 'bx bx-x text-2xl';
                this.setAttribute('aria-expanded', 'true');
                this.setAttribute('aria-label', 'Tutup menu');
            } else {
                icon.className = 'bx bx-menu text-2xl';
                this.setAttribute('aria-expanded', 'false');
                this.setAttribute('aria-label', 'Buka menu');
            }
        });
        
        // Close menu when clicking on nav links
        const mobileNavLinks = navMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-menu-active');
                navMenu.classList.add('translate-x-full');
                navMenu.classList.remove('translate-x-0');
                body.style.overflow = '';
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'bx bx-menu text-2xl';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Buka menu');
            });
        });
        
        // Close menu when clicking outside
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                navMenu.classList.remove('mobile-menu-active');
                navMenu.classList.add('translate-x-full');
                navMenu.classList.remove('translate-x-0');
                body.style.overflow = '';
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'bx bx-menu text-2xl';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Buka menu');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('mobile-menu-active');
                navMenu.classList.add('translate-x-full');
                navMenu.classList.remove('translate-x-0');
                body.style.overflow = '';
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'bx bx-menu text-2xl';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Buka menu');
            }
        });
    }
    

    
    /* ====================================================
       SMOOTH SCROLLING
       ==================================================== */
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed navigation
                    const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.replaceState(null, null, href);
                } else if (targetId === 'home') {
                    // Handle home link
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    history.replaceState(null, null, '#home');
                }
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('translate-x-0')) {
                    navMenu.classList.remove('mobile-menu-active');
                    navMenu.classList.add('translate-x-full');
                    navMenu.classList.remove('translate-x-0');
                    body.style.overflow = '';
                    if (mobileMenuToggle) {
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.className = 'bx bx-menu text-2xl';
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
    
    /* ====================================================
       LOGO CLICK TO TOP
       ==================================================== */
    const logo = document.querySelector('img[alt="Maltas Esports"]');
    const brandElements = document.querySelectorAll('.brand-logo, .nav-brand');
    
    // Logo click handler
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            history.replaceState(null, null, '#home');
        });
        
        logo.style.cursor = 'pointer';
    }
    
    // Brand elements click handler
    brandElements.forEach(brand => {
        brand.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            history.replaceState(null, null, '#home');
        });
        
        brand.style.cursor = 'pointer';
    });
    
    /* ====================================================
       KEYBOARD NAVIGATION SUPPORT
       ==================================================== */
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('translate-x-0')) {
            navMenu.classList.remove('mobile-menu-active');
            navMenu.classList.add('translate-x-full');
            navMenu.classList.remove('translate-x-0');
            body.style.overflow = '';
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'bx bx-menu text-2xl';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus(); // Return focus to toggle button
            }
        }
    });
    
    /* ====================================================
       ACCESSIBILITY IMPROVEMENTS
       ==================================================== */
    
    // Add ARIA labels for better screen reader support
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-label', 'Buka menu navigasi');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'navMenu');
    }
    
    if (navMenu) {
        navMenu.setAttribute('role', 'navigation');
        navMenu.setAttribute('aria-label', 'Menu navigasi utama');
    }
    

});
