document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
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

    // ===== Confetti Celebration =====
    function startConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        let pieces = [];
        const numberOfPieces = 200;
        const colors = ['#2E7D32', '#FFB300', '#4caf50', '#ffffff', '#1b5e20'];
        
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (pieces.length < numberOfPieces) {
                const isMobile = window.innerWidth < 768;
                pieces.push({
                    x: Math.random() * canvas.width,
                    y: -20,
                    size: Math.random() * (isMobile ? 5 : 10) + (isMobile ? 3 : 5),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 3 + 2,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5
                });
            }
            
            pieces.forEach((p, i) => {
                p.y += p.speed;
                p.rotation += p.rotationSpeed;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
                
                if (p.y > canvas.height) pieces.splice(i, 1);
            });
            
            if (pieces.length > 0) requestAnimationFrame(update);
        }
        
        update();
    }

    // Trigger confetti when the live projects section comes into view
    const projectSection = document.getElementById('live-projects');
    if (projectSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startConfetti();
                // Play a subtle sound or other effect here if desired
                observer.unobserve(projectSection);
            }
        }, { threshold: 0.2 }); // Lower threshold for mobile
        observer.observe(projectSection);
    }
});
