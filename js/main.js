document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Active Navigation Highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('text-primary', 'font-bold');
            link.classList.remove('text-gray-600', 'hover:text-primary');
        } else {
            // Remove active styles from other links just in case
            link.classList.remove('text-primary', 'font-bold');
        }
    });

    // Reveal on scroll animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('opacity-100', 'translate-y-0');
                element.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    };

    // Initialize initial elements and setup scroll listener
    // Set initial classes for reveal elements
    revealElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition', 'duration-700', 'ease-out');
    });
    
    // Check initially
    setTimeout(revealOnScroll, 100);
    window.addEventListener('scroll', revealOnScroll);
});
