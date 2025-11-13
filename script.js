


// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "APTfpQYIHptMK19oc",
    SERVICE_ID: "service_5l0x4ks",
    TEMPLATE_ID: "template_lcjnt1c"
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// Resume download helpers
const RESUME_FILE_NAME = 'Inga Mbambo Resume.pdf';
const RESUME_MIME_TYPE = 'application/pdf';

function getResumeBase64() {
    if (!window.RESUME_BASE64 || typeof window.RESUME_BASE64 !== 'string') {
        throw new Error('Embedded resume data is not available.');
    }
    return window.RESUME_BASE64.replace(/\s+/g, '');
}

function base64ToBlob(base64, mimeType) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
}

function triggerFileDownload(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
    }, 1000);
}

// Function to download resume from embedded data (download-only)
function downloadResume() {
    try {
        const resumeBlob = base64ToBlob(getResumeBase64(), RESUME_MIME_TYPE);
        triggerFileDownload(resumeBlob, RESUME_FILE_NAME);
        showNotification('Resume download started!', 'success');
    } catch (error) {
        console.error('Error preparing resume download:', error);
        showNotification('Resume file unavailable. Please try again later.', 'error');
    }
}

// Improved Notification System
let notificationTimeout = null;

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    // Clear any existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }

    // Update content and style
    notificationText.textContent = message;
    notification.className = `notification ${type}`;

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Hide after 4 seconds with smooth transition
    notificationTimeout = setTimeout(() => {
        notification.classList.remove('show');

        // Completely reset after transition
        setTimeout(() => {
            notification.className = 'notification';
        }, 500);
    }, 4000);
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    showNotification('Sending your message...', 'success');

    // Send email using EmailJS
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
            inamel: name,
            email: email,
            message: message,
            subject: subject || `Portfolio Contact from ${name}`
        }
    ).then(function () {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    }).catch(function (error) {
        console.error('EmailJS Error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    });
});

// Mobile menu functionality
document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Event listeners
document.getElementById('downloadResumeBtn').addEventListener('click', downloadResume);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

// Header background on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }
});

// Dynamic particle generation
// Dynamic particle generation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 12) + 's';
    document.querySelector('.particles').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Mouse parallax effect
document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Move orbs slightly based on mouse position
    document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Profile photo parallax disabled for professional appearance
});

// Button hover effects disabled for professional appearance

// Skill bar animations on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        }
    });
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Tilt effect disabled for professional appearance

// Loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Animate elements in sequence
    const elements = document.querySelectorAll('.loading');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Enhanced scroll reveal
const revealElements = document.querySelectorAll('.skill-card, .highlight-card, .contact-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    revealObserver.observe(element);
});

// Cursor trail effect
const cursor = {
    x: 0,
    y: 0,
    trail: []
};

document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    // Create trail dot
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #3b82f6, #60a5fa);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.8;
        transform: scale(1);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(dot);

    // Animate and remove dot
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 100);

    setTimeout(() => {
        dot.remove();
    }, 300);
});

// Performance optimization
let ticking = false;
function updateAnimations() {
    // Update particle positions or other animations here
    ticking = false;
}

function requestAnimationUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add entrance animations to key elements
    const heroContent = document.querySelector('.hero-content h1');
    if (heroContent) {
        const text = heroContent.textContent;
        heroContent.textContent = '';
        setTimeout(() => {
            typeWriter(heroContent, text, 50);
        }, 500);
    }

    // Initialize all animations
    requestAnimationUpdate();

    console.log('🚀 Advanced portfolio loaded successfully!');
});

// Error handling
window.addEventListener('error', function (e) {
    console.error('Portfolio error:', e.error);
});


// Phone number reveal functionality
const revealPhoneBtn = document.getElementById('revealPhone');
const phoneNumberSpan = document.getElementById('phoneNumber');

if (revealPhoneBtn && phoneNumberSpan) {
    revealPhoneBtn.addEventListener('click', function() {
        phoneNumberSpan.textContent = '+27 61 492 2514';
        phoneNumberSpan.classList.remove('phone-hidden');
        phoneNumberSpan.classList.add('phone-revealed');
        revealPhoneBtn.style.display = 'none';
    });
}
