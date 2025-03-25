// Initialize AdSense ads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all AdSense ads on the page
    try {
        (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
        console.error('Error initializing AdSense:', error);
    }

    // Add smooth scrolling for navigation links
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

    // Add mobile menu functionality
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create hamburger menu button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        nav.appendChild(hamburger);

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    };

    // Initialize mobile menu if screen width is small
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    });
});

// Add loading animation for content cards
const contentCards = document.querySelectorAll('.content-card');
contentCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 