document.addEventListener('DOMContentLoaded', () => {
    // Initialize match countdown timers
    initializeCountdowns();
    
    // Initialize player card interactions
    initializePlayerCards();
    
    // Initialize boost animations
    initializeBoosts();
    
    // Initialize league table interactions
    initializeLeagueTables();
});

function initializeCountdowns() {
    const matchCards = document.querySelectorAll('.match-card');
    
    matchCards.forEach(card => {
        const countdown = card.querySelector('.countdown');
        const matchTime = countdown.getAttribute('data-match-time');
        
        updateCountdown(countdown, new Date(matchTime));
        
        // Update countdown every minute
        setInterval(() => {
            updateCountdown(countdown, new Date(matchTime));
        }, 60000);
    });
}

function updateCountdown(element, matchTime) {
    const now = new Date();
    const timeLeft = matchTime - now;
    
    if (timeLeft <= 0) {
        element.textContent = 'Live';
        element.classList.add('live');
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    element.textContent = `${days}d ${hours}h ${minutes}m`;
}

function initializePlayerCards() {
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        const addButton = card.querySelector('.add-player');
        const removeButton = card.querySelector('.remove-player');
        
        addButton.addEventListener('click', () => {
            card.classList.add('selected');
            addButton.style.display = 'none';
            removeButton.style.display = 'block';
            showNotification('Player added to your team!');
        });
        
        removeButton.addEventListener('click', () => {
            card.classList.remove('selected');
            removeButton.style.display = 'none';
            addButton.style.display = 'block';
            showNotification('Player removed from your team.');
        });
    });
}

function initializeBoosts() {
    const boosts = document.querySelectorAll('.boost-card');
    
    boosts.forEach(boost => {
        boost.addEventListener('click', () => {
            if (!boost.classList.contains('active')) {
                boost.classList.add('active');
                showNotification('Boost activated!');
                
                // Animate boost activation
                const icon = boost.querySelector('.boost-icon');
                icon.classList.add('pulse');
                setTimeout(() => {
                    icon.classList.remove('pulse');
                }, 1000);
            }
        });
    });
}

function initializeLeagueTables() {
    const leagueCards = document.querySelectorAll('.league-card');
    
    leagueCards.forEach(card => {
        const viewButton = card.querySelector('.view-contests');
        
        viewButton.addEventListener('click', () => {
            const leagueName = card.getAttribute('data-league');
            // Navigate to league contests page
            window.location.href = `/contests/${leagueName.toLowerCase()}`;
        });
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