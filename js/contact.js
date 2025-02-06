document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');

    // Phone number validation for Indian numbers
    function validatePhoneNumber(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    }



    // Show success message
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.color = 'green';
        successDiv.style.marginBottom = '1rem';
        successDiv.textContent = 'Message sent successfully! We will get back to you soon.';
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.parentNode.insertBefore(successDiv, submitButton);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Format phone number as user types
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}); 