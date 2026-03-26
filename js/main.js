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

    revealElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition', 'duration-700', 'ease-out');
    });
    
    setTimeout(revealOnScroll, 100);
    window.addEventListener('scroll', revealOnScroll);

    // ===== Animated Counters =====
    function animateCounter(el, target, duration = 1200) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(start);
        }, 16);
    }

    const counters = document.querySelectorAll('[data-target]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(counter => counterObserver.observe(counter));
    }
});
