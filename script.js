// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'translateY(30px)';
        profileImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.9)';
        }
    });
    
    // // Resume download functionality
    // const resumeBtn = document.querySelector('.resume-btn');

    // resumeBtn.addEventListener('click', function() {
    //     const link = document.createElement('a');
    //     link.href = 'assets/file/tejaswinivechalapu.pdf';
    //     link.download = 'Vechalapu_Tejaswini_Resume.pdf';

    //     // Check if the file exists or is accessible
    //     fetch(link.href)
    //         .then(response => {
    //             if (response.ok) {
    //                 link.click();
    //             } else {
    //                 showNotification('Resume file not found. Please check the link or try again later!', 'error');
    //             }
    //         })
    //         .catch(error => {
    //             showNotification('An error occurred while downloading the resume. Please try again later.', 'error');
    //         });
    // });
    
    // Contact form submission with Formspree
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validate form
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Submit to Formspree
    fetch('https://formspree.io/f/xzzvaggk', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('Error sending message. Please try again later.', 'error');
        }
    })
    .catch(error => {
        showNotification('An error occurred. Please check your internet connection and try again.', 'error');
    });
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem;
                backdrop-filter: blur(10px);
                z-index: 1001;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-info {
                border-left: 4px solid var(--primary-color);
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .notification-message {
                color: var(--text-color);
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            .notification-close:hover {
                color: var(--text-color);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        if (!document.querySelector('style[data-notification]')) {
            style.setAttribute('data-notification', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .experience-item, .achievement-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    const titleText = "Hi, I'm Tejaswini";
    
    function typeWriter(element, text, delay = 100) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '<') {
                    // Handle HTML tags
                    const tagEnd = text.indexOf('>', i);
                    const tag = text.substring(i, tagEnd + 1);
                    element.innerHTML += tag;
                    i = tagEnd + 1;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, delay);
            }
        }
        
        type();
    }
    
    // Start typing animation when page loads
    setTimeout(() => {
        typeWriter(heroTitle, "Hi, I'm <span class='highlight'>Tejaswini</span>", 150);
    }, 1000);
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded styles
        const loadStyle = document.createElement('style');
        loadStyle.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(loadStyle);
    });
});