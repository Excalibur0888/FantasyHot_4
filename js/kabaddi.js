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
        const countdown = card.querySelector('.match-time');
        updateMatchTime(countdown);
        
        // Update match time every minute
        setInterval(() => {
            updateMatchTime(countdown);
        }, 60000);
    });
}

function updateMatchTime(element) {
    const now = new Date();
    const matchTime = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours from now
    const timeLeft = matchTime - now;
    
    if (timeLeft <= 0) {
        element.textContent = 'Live';
        element.classList.add('live');
        return;
    }
    
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    
    element.textContent = `${hours}h ${minutes}m until match`;
}

function initializePlayerCards() {
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        const addButton = card.querySelector('.btn-primary');
        
        addButton.addEventListener('click', () => {
            if (addButton.textContent === 'Add to Team') {
                addButton.textContent = 'Remove from Team';
                addButton.style.background = '#082032';
                showNotification('Player added to your team!');
            } else {
                addButton.textContent = 'Add to Team';
                addButton.style.background = '#FF4C29';
                showNotification('Player removed from your team.');
            }
        });
    });
}

function initializeBoosts() {
    const boosts = document.querySelectorAll('.boost-card');
    
    boosts.forEach(boost => {
        const purchaseButton = boost.querySelector('.btn-primary');
        
        purchaseButton.addEventListener('click', () => {
            if (!boost.classList.contains('active')) {
                boost.classList.add('active');
                purchaseButton.textContent = 'Active';
                purchaseButton.disabled = true;
                showNotification('Boost activated!');
                
                // Animate boost icon
                const icon = boost.querySelector('.boost-icon');
                icon.style.animation = 'pulse 1s';
                
                setTimeout(() => {
                    icon.style.animation = '';
                }, 1000);
            }
        });
    });
}

function initializeLeagueTables() {
    const leagueCards = document.querySelectorAll('.league-card');
    
    leagueCards.forEach(card => {
        const viewButton = card.querySelector('.btn-primary');
        
        viewButton.addEventListener('click', () => {
            const leagueName = card.querySelector('h3').textContent;
            showNotification(`Viewing ${leagueName} contests...`);
            // Navigate to league contests page
            // window.location.href = `/contests/${leagueName.toLowerCase()}`;
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