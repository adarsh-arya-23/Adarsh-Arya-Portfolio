// DOM Elements
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const skillCategories = document.querySelectorAll('.category');
const skillContents = document.querySelectorAll('.skill-category-content');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Highlight active section in navbar
    highlightActiveSection();
    
    // Animate elements on scroll
    animateOnScroll();
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Highlight active section in navbar
function highlightActiveSection() {
    let scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Skills Tab Switching
skillCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        skillCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        // Show corresponding content
        const targetCategory = category.getAttribute('data-category');
        
        skillContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetCategory) {
                content.classList.add('active');
            }
        });
    });
});

// Initialize with 'All' category active
document.addEventListener('DOMContentLoaded', () => {
    // Make sure 'All' category is active by default
    const allCategory = document.querySelector('.skill-category[data-category="all"]');
    if (allCategory) {
        allCategory.classList.add('active');
        
        // Show 'all' content
        skillContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === 'all') {
                content.classList.add('active');
            }
        });
    }
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Reset error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            return;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            return;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            return;
        }
        
        // If all validations pass, show success message
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        };
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
    });
}

// Helper function to show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    input.classList.add('error');
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorMessage.textContent = '';
        input.classList.remove('error');
    }, 3000);
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Your message has been sent successfully!';
    successMessage.style.backgroundColor = 'var(--success-color)';
    successMessage.style.color = 'white';
    successMessage.style.padding = '1.5rem';
    successMessage.style.borderRadius = 'var(--border-radius)';
    successMessage.style.marginTop = '2rem';
    successMessage.style.textAlign = 'center';
    
    contactForm.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Animate elements on scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
    
    // Add animation to skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        if (barPosition < window.innerHeight - 50) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }
    });
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        if (cardPosition < window.innerHeight - 50) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200); // Staggered animation
        }
    });
}

// Add animate-on-scroll class to elements that should be animated
function setupAnimations() {
    // About section elements - check if elements exist first
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.classList.add('animate-on-scroll');
    }
    
    document.querySelectorAll('.about-text h3, .about-text p, .personal-info').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Skills section
    document.querySelectorAll('.skill-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Project cards
    document.querySelectorAll('.project-card').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Contact section
    document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
}

// Initialize animations
setupAnimations();

// Animate skill bars on page load
// Typing effect for role text with multiple roles
function typeEffect() {
    const roles = [
        "Full Stack Web Developer",
        "MERN Specialist",
        "Creative Coder",
        "Tech Enthusiast"
    ];
    const typingElement = document.getElementById('role-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    if (typingElement) {
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing speed
            }
            
            // If finished typing the current role
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end
            } 
            // If finished deleting the current role
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Move to next role
                typingSpeed = 500; // Pause before typing next role
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }
}

// Parallax effect for hero section
function parallaxEffect() {
    const heroSection = document.getElementById('home');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Add hover effects to buttons
function buttonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            // Add scale-up effect on hover
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Reset styles on mouse leave
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
        
        // Add click effect
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
    
    // Add smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Initialize animations for certification cards
function initCertificationAnimations() {
    const certCards = document.querySelectorAll('.certification-card');
    const certificatePopup = document.querySelector('.certificate-popup');
    const certificateIframe = document.getElementById('certificate-iframe');
    const closeButton = document.querySelector('.certificate-popup-close');
    
    certCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
        
        // Add click event to open certificate popup
        card.addEventListener('click', () => {
            const certificatePath = card.getAttribute('data-certificate');
            if (certificatePath) {
                certificateIframe.src = `Certifications/${certificatePath}`;
                certificatePopup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
            }
        });
    });
    
    // Close popup when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closePopup();
        });
    }
    
    // Close popup when clicking outside the content
    if (certificatePopup) {
        certificatePopup.addEventListener('click', (e) => {
            if (e.target === certificatePopup) {
                closePopup();
            }
        });
    }
    
    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificatePopup && certificatePopup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Function to close the popup
    function closePopup() {
        if (certificatePopup) {
            certificatePopup.classList.remove('active');
            // Wait for transition to complete before removing the src
            setTimeout(() => {
                if (certificateIframe) certificateIframe.src = '';
                document.body.style.overflow = ''; // Restore scrolling
            }, 300); // Match the transition duration in CSS
        }
    }
}

// Initialize animations for milestone cards
function initMilestoneAnimations() {
    const milestoneCards = document.querySelectorAll('.milestone-card');
    
    milestoneCards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a slight delay for each card
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100); // 100ms delay between each card
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Initialize animations for timeline items
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const darkmodeToggle = document.getElementById('darkmode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme and checkbox state
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (darkmodeToggle) darkmodeToggle.checked = true;
    } else {
        document.body.removeAttribute('data-theme');
        if (darkmodeToggle) darkmodeToggle.checked = false;
    }
    
    // Toggle theme when checkbox is clicked
    if (darkmodeToggle) {
        darkmodeToggle.addEventListener('change', toggleTheme);
    } else {
        console.error('Dark mode toggle button not found');
    }
}

// Toggle theme between light and dark mode
function toggleTheme(e) {
    // If event exists, use the checkbox state, otherwise toggle based on current theme
    const isDarkTheme = e ? e.target.checked : document.body.getAttribute('data-theme') === 'dark';
    
    if (!isDarkTheme) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Update particles color when theme changes
    if (typeof updateParticlesColor === 'function') {
        updateParticlesColor();
    }
}

// Run all initialization functions after page load
window.addEventListener('load', () => {
    // Trigger initial animations
    animateOnScroll();
    
    // Show skill bars with animation
    setTimeout(() => {
        document.querySelectorAll('.skill-level').forEach(skillLevel => {
            const width = skillLevel.style.width;
            skillLevel.style.width = '0';
            
            setTimeout(() => {
                skillLevel.style.width = width;
            }, 200);
        });
    }, 1000);
    
    // Run other initialization functions
    setTimeout(typeEffect, 1500);
    parallaxEffect();
    buttonEffects();
    initCertificationAnimations();
    initMilestoneAnimations();
    initTimelineAnimations();
    initThemeToggle();
    
    // Initialize particles.js
    if (document.getElementById('particles-container')) {
        setTimeout(() => {
            // Load particles.js configuration
            try {
                const script = document.createElement('script');
                script.src = 'js/particles.js';
                document.body.appendChild(script);
                
                // Update particles color based on theme
                script.onload = function() {
                    // Ensure particles.js is initialized after the script loads
                    if (typeof particlesJS === 'function') {
                        particlesJS('particles-container', {
                            "particles": {
                                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                                "color": { "value": document.body.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#333333' },
                                "shape": { "type": "circle" },
                                "opacity": { "value": 0.5, "random": false },
                                "size": { "value": 3, "random": true },
                                "line_linked": {
                                    "enable": true,
                                    "distance": 150,
                                    "color": document.body.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#333333',
                                    "opacity": 0.4,
                                    "width": 1
                                },
                                "move": { "enable": true, "speed": 2 }
                            },
                            "interactivity": {
                                "detect_on": "canvas",
                                "events": {
                                    "onhover": { "enable": true, "mode": "grab" },
                                    "onclick": { "enable": true, "mode": "push" }
                                }
                            }
                        });
                        updateParticlesColor();
                    }
                };
            } catch (error) {
                console.error('Error initializing particles:', error);
            }
        }, 100);
    }
});
document.getElementById("year").innerText = new Date().getFullYear();


// Scoped inside .camping-section only
const options = document.querySelectorAll('.camping-section .option');

options.forEach((option, index) => {
  option.style.animationDelay = `${index * 0.2}s`;

  option.addEventListener('click', () => {
    document.querySelector('.camping-section .option.active')?.classList.remove('active');
    option.classList.add('active');
  });
});
