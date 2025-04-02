const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');


RegisterLink.addEventListener('click', () => {
    container.classList.add('active');
})

LoginLink.addEventListener('click', () => {
    container.classList.remove('active');
})

//Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.querySelector('.form-box.Register form');
    
    // Add submit event listener to the form
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get all input fields - UPDATED SELECTORS
        const inputs = form.querySelectorAll('input');
        // Since your HTML has multiple text inputs, we need to properly identify them
        const username = inputs[0]; // First input in the form
        const email = inputs[1];    // Second input in the form
        const number = form.querySelector('input[type="number"]');
        const password = form.querySelector('input[type="password"]');
        
        // Debug - check if elements are found
        console.log("Form elements:", {username, email, number, password});
        
        // Validate only if elements are found
        if (!username || !email || !number || !password) {
            console.error("One or more form elements not found!");
            return; // Exit the function to prevent errors
        }
        
        // Reset previous error messages
        resetErrors();
        
        // Validate each field
        let isValid = true;
        
        // Username validation - should be at least 3 characters
        if (!username.value || username.value.trim().length < 3) {
            showError(username, 'Username must be at least 3 characters');
            isValid = false;
        }
        
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value || !emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone number validation - simple check for numeric value
        if (!number.value || number.value.length < 10) {
            showError(number, 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        }
        
        // Password validation - at least 8 characters with at least one uppercase, one lowercase and one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!password.value || !passwordRegex.test(password.value)) {
            showError(password, 'Password must be at least 8 characters with uppercase, lowercase and numbers');
            isValid = false;
        }
        
        // If all validations pass, submit the form
        if (isValid) {
            // You would normally submit the form here
            // form.submit();
            
            // For demo purposes, show success message
            showSuccessMessage();
        }
    });
    
    // Function to show error message
    function showError(inputElement, message) {
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        // Insert error message after the input box
        inputElement.parentNode.insertAdjacentElement('afterend', errorElement);
        
        // Highlight the input box
        inputElement.style.borderColor = 'red';
    }
    
    // Function to reset all error messages
    function resetErrors() {
        // Remove all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(errorMessage) {
            errorMessage.remove();
        });
        
        // Reset input styles
        const inputs = form.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.style.borderColor = '';
        });
        
        // Remove success message if exists
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.remove();
        }
    }
    
    // Function to show success message
    function showSuccessMessage() {
        // Create overlay for the modal
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        
        // Create the popup
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '30px';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        popup.style.textAlign = 'center';
        popup.style.maxWidth = '400px';
        
        // Add success icon (checkmark)
        const icon = document.createElement('div');
        icon.innerHTML = '✓';
        icon.style.color = 'white';
        icon.style.backgroundColor = '#4CAF50';
        icon.style.width = '60px';
        icon.style.height = '60px';
        icon.style.borderRadius = '50%';
        icon.style.fontSize = '40px';
        icon.style.display = 'flex';
        icon.style.justifyContent = 'center';
        icon.style.alignItems = 'center';
        icon.style.margin = '0 auto 20px auto';
        
        // Add success message
        const message = document.createElement('h2');
        message.textContent = 'Registration Successful!';
        message.style.color = '#333';
        message.style.marginBottom = '15px';
        
        // Add additional message
        const subMessage = document.createElement('p');
        subMessage.textContent = 'You will be redirected to the home page shortly.';
        subMessage.style.color = '#666';
        subMessage.style.marginBottom = '20px';
        
        // Append elements to the popup
        popup.appendChild(icon);
        popup.appendChild(message);
        popup.appendChild(subMessage);
        
        // Append popup to overlay
        overlay.appendChild(popup);
        
        // Append overlay to body
        document.body.appendChild(overlay);
        
        // Set timeout for redirect (3 seconds)
        setTimeout(() => {
            // Fade out effect
            overlay.style.transition = 'opacity 0.5s ease';
            overlay.style.opacity = '0';
            
            // Redirect after fade out
            setTimeout(() => {
                window.location.href = 'index.html'; // Change this to your home page URL
                document.body.removeChild(overlay);
            }, 500);
        }, 2500);
    }
    
    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.style.borderColor = '';
            
            // Remove error message if exists
            const nextElement = this.parentNode.nextElementSibling;
            if (nextElement && nextElement.classList.contains('error-message')) {
                nextElement.remove();
            }
        });
    });
});


//Sidebar
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSideBar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    
    closeAllSubMenus();
}

function toggleSubMenu(button) {
    
    if(!button.nextElementSibling.classList.contains('show')) {
        closeAllSubMenus();
    }
    
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');
    
    if(sidebar.classList.contains('close')) {
        sidebar.classList.toggle('rotate');
        toggleButton.classList.toggle('rotate');
    }
    
}

function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.remove('rotate');
    })
}
