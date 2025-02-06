// Check if age verification was already done
const isAgeVerified = localStorage.getItem('ageVerified');
const ageVerificationModal = document.getElementById('ageVerificationModal');
const restrictedModal = document.getElementById('restrictedModal');

// Show age verification modal on page load if not verified
window.addEventListener('DOMContentLoaded', () => {
    if (!isAgeVerified) {
        ageVerificationModal.classList.remove('hidden');
    }
});

// Handle age verification
function verifyAge(isOver18) {
    if (isOver18) {
        // User is over 18, allow access and save to localStorage
        localStorage.setItem('ageVerified', 'true');
        ageVerificationModal.classList.add('hidden');
    } else {
        // User is under 18, show restricted access modal
        ageVerificationModal.classList.add('hidden');
        showRestrictedModal();
    }
}

// Show restricted access modal
function showRestrictedModal() {
    restrictedModal.classList.remove('hidden');
}

// Close restricted access modal
function closeRestrictedModal() {
    restrictedModal.classList.add('hidden');
    // Redirect to Google or another appropriate site
    window.location.href = 'https://www.google.com';
} 