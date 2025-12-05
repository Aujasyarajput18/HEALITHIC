// Mobile Menu Toggle
function toggleMobileMenu() {
    var menu = document.querySelector('.nav-menu');
    var hamburger = document.querySelector('.hamburger');
    
    if (menu && hamburger) {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Initialize mobile menu button
document.addEventListener('DOMContentLoaded', function() {
    var navContainer = document.querySelector('.nav-container');
    var navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu) {
        // Create hamburger button
        var hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        hamburger.onclick = toggleMobileMenu;
        navContainer.appendChild(hamburger);
    }
});

// Smooth Scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a[href^="#"]');
    
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
});

// Form Validation
function validateForm(form) {
    var inputs = form.querySelectorAll('input[required], textarea[required]');
    var isValid = true;
    
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        
        // Remove previous error styling
        input.classList.remove('error');
        
        // Check if empty
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    }
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

// Add form validation to contact form
document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                alert('Thank you! Your message has been sent.');
                this.reset();
            }
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    var navMenu = document.querySelector('.nav-menu');
    var hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Active navigation link highlighting
document.addEventListener('DOMContentLoaded', function() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-link');
    
    for (var i = 0; i < navLinks.length; i++) {
        var link = navLinks[i];
        var linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    }
});

