// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu functionality when implemented
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add active class to current navigation item
document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

// Handle form submissions
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
        // Add form handling logic here
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Interactive Feature Cards Mouse Movement
    const cards = document.querySelectorAll('.feature-card.interactive');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            
            const rotateY = ((e.clientX - rect.left) / card.clientWidth - 0.5) * 20;
            const rotateX = ((e.clientY - rect.top) / card.clientHeight - 0.5) * -20;
            
            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0) rotateX(0)';
        });
    });

    // Hexagon Grid Animation
    const playerCards = document.querySelectorAll('.player-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.classList.contains('offset') && window.innerWidth > 768 ? 
                    'translateY(50%)' : 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    playerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        if (index % 3 === 1) card.classList.add('offset');
        observer.observe(card);
    });

    // Timeline Animation
    const timelineCards = document.querySelectorAll('.boost-card');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        card.style.transition = 'all 0.5s ease';
        timelineObserver.observe(card);
    });

    // Boost Card Activation
    const boostButtons = document.querySelectorAll('.boost-card .btn-primary');
    
    boostButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.boost-card');
            button.textContent = 'Activated';
            button.disabled = true;
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });

    // Smooth Scrolling
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

    // Burger Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Initialize dropdown menus
    const dropdownLinks = document.querySelectorAll('.nav-link');
    dropdownLinks.forEach(link => {
        if (link.nextElementSibling && link.nextElementSibling.classList.contains('dropdown-menu')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = link.nextElementSibling;
                
                // Close all other dropdowns
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== link && otherLink.nextElementSibling) {
                        otherLink.nextElementSibling.classList.remove('show');
                        otherLink.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('show');
                link.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.burger-menu') && navMenu?.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add mobile menu touch slide functionality
    let touchStartX = 0;
    let touchEndX = 0;

    navMenu?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    navMenu?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX && (touchStartX - touchEndX > 50)) {
            // Swipe left - close menu
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}); 