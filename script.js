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

// Number Counter Animation
function animateCounter(element) {
    var target = parseInt(element.getAttribute('data-target'));
    var suffix = element.getAttribute('data-suffix') || '';
    var duration = 2000; // 2 seconds
    var increment = target / (duration / 16); // 60fps
    var current = 0;
    
    var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas
        var displayValue = Math.floor(current).toLocaleString();
        element.textContent = displayValue + suffix;
    }, 16);
}

// Check if element is in viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize counter animation when page loads (only on index.html)
document.addEventListener('DOMContentLoaded', function() {
    var counters = document.querySelectorAll('.counter');
    var hasAnimated = false;
    
    if (counters.length > 0) {
        // Check if counters are already visible
        var firstCounter = counters[0];
        if (firstCounter && isInViewport(firstCounter.parentElement)) {
            for (var i = 0; i < counters.length; i++) {
                animateCounter(counters[i]);
            }
            hasAnimated = true;
        }
        
        // If not visible, wait for scroll
        if (!hasAnimated) {
            window.addEventListener('scroll', function() {
                if (!hasAnimated) {
                    for (var i = 0; i < counters.length; i++) {
                        var counter = counters[i];
                        if (isInViewport(counter.parentElement)) {
                            animateCounter(counter);
                            hasAnimated = true;
                        }
                    }
                }
            });
        }
    }
});

// Fade-in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    var fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    function checkFadeElements() {
        for (var i = 0; i < fadeElements.length; i++) {
            var element = fadeElements[i];
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        }
    }
    
    // Check on load
    checkFadeElements();
    
    // Check on scroll
    window.addEventListener('scroll', checkFadeElements);
});

// Button hover effect - scale animation
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.btn');
    
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Card hover effect - lift animation
document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');
    
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    }
});

// Hero text fade-in on page load
document.addEventListener('DOMContentLoaded', function() {
    var heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn');
    
    for (var i = 0; i < heroElements.length; i++) {
        heroElements[i].style.opacity = '0';
        heroElements[i].style.transform = 'translateY(20px)';
        heroElements[i].style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(function(index) {
            return function() {
                heroElements[index].style.opacity = '1';
                heroElements[index].style.transform = 'translateY(0)';
            };
        }(i), i * 200);
    }
});

