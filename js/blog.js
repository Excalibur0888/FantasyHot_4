document.addEventListener('DOMContentLoaded', () => {
    // Initialize newsletter form
    initializeNewsletterForm();
    
    // Initialize post filtering
    initializePostFilters();
    
    // Initialize lazy loading for images
    initializeLazyLoading();
});

function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const checkbox = form.querySelector('input[type="checkbox"]');
            
            if (!checkbox.checked) {
                showNotification('Please agree to receive updates');
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!');
                form.reset();
            }, 1000);
        });
    }
}

function initializePostFilters() {
    const filterButtons = document.querySelectorAll('.tab-btn');
    const sortSelect = document.getElementById('sortPosts');
    const postsGrid = document.getElementById('postsGrid');
    const posts = Array.from(postsGrid.querySelectorAll('.post-card'));
    
    // Filter posts by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter posts
            posts.forEach(post => {
                const postCategory = post.querySelector('.category').textContent.toLowerCase();
                if (category === 'all' || postCategory === category.toLowerCase()) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Sort posts
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const sortedPosts = [...posts].sort((a, b) => {
            const dateA = new Date(a.querySelector('.date').textContent);
            const dateB = new Date(b.querySelector('.date').textContent);
            
            if (sortValue === 'latest') {
                return dateB - dateA;
            } else if (sortValue === 'oldest') {
                return dateA - dateB;
            }
            // For 'popular' sorting, we could add a data attribute for views/likes
            return 0;
        });
        
        // Clear and re-append sorted posts
        postsGrid.innerHTML = '';
        sortedPosts.forEach(post => postsGrid.appendChild(post));
    });
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('.post-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 