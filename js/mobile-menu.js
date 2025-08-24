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
            
            console.log('Mobile toggle clicked'); // Debug log
            
            // Toggle classes
            navMenu.classList.toggle('mobile-menu-active');
            navMenu.classList.toggle('translate-x-0');
            navMenu.classList.toggle('translate-x-full');
            
            body.style.overflow = navMenu.classList.contains('mobile-menu-active') ? 'hidden' : '';
            
            // Update toggle button icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('mobile-menu-active')) {
                icon.className = 'bx bx-x';
                this.setAttribute('aria-expanded', 'true');
                this.setAttribute('aria-label', 'Tutup menu');
                console.log('Menu opened'); // Debug log
            } else {
                icon.className = 'bx bx-menu';
                this.setAttribute('aria-expanded', 'false');
                this.setAttribute('aria-label', 'Buka menu');
                console.log('Menu closed'); // Debug log
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
                icon.className = 'bx bx-menu';
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
                icon.className = 'bx bx-menu';
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
                icon.className = 'bx bx-menu';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Buka menu');
            }
        });
    }
    
    /* ====================================================
       NAVIGATION ACTIVE STATE MANAGEMENT (SCROLL & CLICK BASED)
       ==================================================== */
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id], div[id]');
    let isScrolling = false;
    
    // Throttle function untuk performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Set active link berdasarkan section ID
    function setActiveNavLink(activeId = null) {
        let currentActiveId = activeId;
        
        // Jika tidak ada activeId yang diberikan, deteksi dari scroll position
        if (!currentActiveId) {
            const scrollPosition = window.scrollY + 100; // Offset untuk header
            
            // Cari section yang sedang dalam viewport
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentActiveId = section.id;
                    break;
                }
            }
            
            // Default ke home jika tidak ada section yang cocok
            if (!currentActiveId && window.scrollY < 200) {
                currentActiveId = 'home';
            }
        }
        
        // Update semua navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const linkId = href ? href.replace('#', '') : '';
            
            // Remove semua active classes
            link.classList.remove('nav-link-active', 'active');
            if (!link.classList.contains('mobile-nav-link')) {
                link.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-blue-700');
                link.classList.add('nav-link');
            }
            
            // Add active class jika cocok dengan current section
            if (linkId === currentActiveId) {
                if (link.classList.contains('mobile-nav-link')) {
                    // Mobile navigation
                    link.classList.add('active');
                } else {
                    // Desktop navigation
                    link.classList.add('nav-link-active');
                    link.classList.remove('nav-link');
                }
            }
        });
        
        // Update URL hash tanpa scroll
        if (currentActiveId && !isScrolling) {
            history.replaceState(null, null, `#${currentActiveId}`);
        }
    }
    
    // Scroll event listener dengan throttling
    const handleScroll = throttle(() => {
        if (!isScrolling) {
            setActiveNavLink();
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        setActiveNavLink(hash);
    });
    
    // Set initial active state
    setActiveNavLink();
    
    /* ====================================================
       SMOOTH SCROLLING WITH ACTIVE STATE INTEGRATION
       ==================================================== */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Set scrolling flag
                    isScrolling = true;
                    
                    // Calculate offset for fixed navigation
                    const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    // Immediately update active state
                    setActiveNavLink(targetId);
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    
                    // Reset scrolling flag after animation
                    setTimeout(() => {
                        isScrolling = false;
                        // Double-check active state after scroll
                        setActiveNavLink();
                    }, 1000);
                    
                    // Update URL hash
                    history.replaceState(null, null, href);
                } else if (targetId === 'home') {
                    // Handle home link
                    isScrolling = true;
                    setActiveNavLink('home');
                    
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 1000);
                    
                    history.replaceState(null, null, '#home');
                }
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('mobile-menu-active')) {
                    navMenu.classList.remove('mobile-menu-active');
                    navMenu.classList.add('translate-x-full');
                    navMenu.classList.remove('translate-x-0');
                    body.style.overflow = '';
                    if (mobileMenuToggle) {
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.className = 'bx bx-menu';
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
    
    /* ====================================================
       LOGO CLICK TO TOP WITH ACTIVE STATE
       ==================================================== */
    const logo = document.querySelector('img[alt="Maltas Esports"]');
    const brandElements = document.querySelectorAll('.brand-logo, .nav-brand');
    
    // Logo click handler
    if (logo) {
        logo.addEventListener('click', function() {
            isScrolling = true;
            setActiveNavLink('home');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
            
            history.replaceState(null, null, '#home');
        });
        
        logo.style.cursor = 'pointer';
    }
    
    // Brand elements click handler
    brandElements.forEach(brand => {
        brand.addEventListener('click', function() {
            isScrolling = true;
            setActiveNavLink('home');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
            
            history.replaceState(null, null, '#home');
        });
        
        brand.style.cursor = 'pointer';
    });
    
    /* ====================================================
       KEYBOARD NAVIGATION SUPPORT
       ==================================================== */
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('mobile-menu-active')) {
            navMenu.classList.remove('mobile-menu-active');
            navMenu.classList.add('translate-x-full');
            navMenu.classList.remove('translate-x-0');
            body.style.overflow = '';
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                icon.className = 'bx bx-menu';
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
    
    console.log('🎮 Mobile Menu JavaScript Loaded Successfully!');
});
