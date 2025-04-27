document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
            navbar.style.padding = '0.5rem 2rem';
        } else {
            navbar.classList.remove('navbar-shrink');
            navbar.style.padding = '1rem 2rem';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Simple validation
            if (name.value.trim() === '') {
                showError(name, 'Lütfen adınızı girin');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Lütfen e-posta adresinizi girin');
                isValid = false;
            } else if (!isEmailValid(email.value)) {
                showError(email, 'Lütfen geçerli bir e-posta adresi girin');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Lütfen mesajınızı girin');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Show success message (in real app would send form data to server)
                const alert = document.createElement('div');
                alert.className = 'alert alert-success mt-3';
                alert.textContent = 'Mesajınız başarıyla gönderildi!';
                
                contactForm.reset();
                contactForm.appendChild(alert);
                
                setTimeout(() => {
                    alert.remove();
                }, 3000);
            }
        });
    }

    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (!item.classList.contains(filterValue)) {
                        item.style.display = 'none';
                    } else {
                        item.style.display = 'block';
                    }
                });
            });
        });
    }

    // Helper functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
        
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.invalid-feedback')) {
            formGroup.appendChild(errorDiv);
        }
        
        input.className = 'form-control is-invalid';
    }
    
    function removeError(input) {
        input.className = 'form-control is-valid';
        const errorDiv = input.parentElement.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function isEmailValid(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});

// Image lazy loading
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
        });
    }
});

