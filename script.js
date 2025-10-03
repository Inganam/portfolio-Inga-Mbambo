// Resume data
        const resumeData = {
            name: "Inga Mbambo",
            title: "Systems Support Associate",
            contact: {
                email: "ingambambo2004@icloud.com",
                phone: "+27 61 492 2514",
                linkedin: "Inga Mbambo"
            },
            summary: "I am a motivated Systems Support Associate with a strong foundation in AI applications and a passion for innovative technology solutions. Currently working toward a career as a Systems Analyst, I bring a proactive mindset, strong problem-solving skills, and a commitment to continuous learning in the evolving tech landscape.",
            experience: [
                {
                    position: "Systems Support Associate",
                    company: "Capaciti",
                    duration: "2025 - Present",
                    description: "Applying artificial intelligence to enhance IT solutions while actively pursuing professional development."
                },
                {
                    position: "Systems Development Intern", 
                    company: "CSG Resource",
                    duration: "2024 - 2025",
                    description: "Gained foundational skills in systems development, HTML, CSS, Python, and Cybersecurity."
                }
            ],
            education: [
                {
                    degree: "Higher Certificate in Economic and Management Sciences",
                    institution: "UNISA - Parow",
                    year: "2024"
                }
            ],
            skills: ["Python Programming", "HTML/CSS", "AI Applications", "Problem Solving", "Team Collaboration", "Communication"],
            languages: ["IsiXhosa (Native)", "English (Advanced)"],
            certifications: [
                "AI Essentials - Intel (2025)",
                "AI For Everyone - DeepLearning.AI (2025)", 
                "Generative AI with LLM - AWS & DeepLearning.AI (2025)",
                "Introduction to Generative AI - Google Cloud (2025)",
                "CSS Essentials - Cisco (2025)",
                "Introduction to Cybersecurity - Cisco (2025)",
                "HTML Essentials - Cisco (2025)",
                "Python Essentials 1 - Cisco (2024)"
            ]
        };

        // EmailJS Configuration
        const EMAILJS_CONFIG = {
            PUBLIC_KEY: "APTfpQYIHptMK19oc",
            SERVICE_ID: "service_5l0x4ks",
            TEMPLATE_ID: "template_lcjnt1c"
        };

        // Initialize EmailJS
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

        // Function to generate and download resume as PDF
function downloadResume() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Set up colors
        const primaryColor = [88, 137, 112]; // #588970
        const darkColor = [58, 76, 72]; // #3a4c48
        const textColor = [51, 51, 51];

        // Header background
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 25, 'F');

        // Name and title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text(resumeData.name, 15, 15);

        doc.setFontSize(13);
        doc.setFont(undefined, 'normal');
        doc.text(resumeData.title, 15, 22);

        // Contact info
        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Email: ${resumeData.contact.email}`, 140, 12);
        doc.text(`Phone: ${resumeData.contact.phone}`, 140, 17);
        doc.text(`LinkedIn: ${resumeData.contact.linkedin}`, 140, 22);

        let yPos = 32;

        // Summary
        doc.setTextColor(...darkColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('SUMMARY', 15, yPos);
        yPos += 7;

        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const summaryLines = doc.splitTextToSize(resumeData.summary, 180);
        doc.text(summaryLines, 15, yPos);
        yPos += summaryLines.length * 5 + 5;

        // Experience
        doc.setTextColor(...darkColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('EXPERIENCE', 15, yPos);
        yPos += 7;

        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        resumeData.experience.forEach(exp => {
            doc.setFont(undefined, 'bold');
            doc.text(`${exp.position} - ${exp.company}`, 15, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(exp.duration, 120, yPos);
            yPos += 5;
            const expLines = doc.splitTextToSize(exp.description, 180);
            doc.text(expLines, 15, yPos);
            yPos += expLines.length * 5 + 3;
        });

        // Education
        doc.setTextColor(...darkColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('EDUCATION', 15, yPos);
        yPos += 7;

        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        resumeData.education.forEach(edu => {
            doc.setFont(undefined, 'bold');
            doc.text(edu.degree, 15, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(`${edu.institution} (${edu.year})`, 15, yPos + 5);
            yPos += 10;
        });

        // Skills
        doc.setTextColor(...darkColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('SKILLS', 15, yPos);
        yPos += 7;

        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const skillsText = resumeData.skills.join(' • ');
        const skillsLines = doc.splitTextToSize(skillsText, 180);
        doc.text(skillsLines, 15, yPos);
        yPos += skillsLines.length * 5 + 5;

        // Languages
        doc.setTextColor(...darkColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('LANGUAGES', 15, yPos);
        yPos += 7;

        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        resumeData.languages.forEach(lang => {
            doc.text(`• ${lang}`, 15, yPos);
            yPos += 5;
        });
        yPos += 3;

        // Certifications
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }

        doc.setTextColor(...darkColor);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('CERTIFICATIONS', 15, yPos);
        yPos += 7;

        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        resumeData.certifications.forEach(cert => {
            doc.text(`• ${cert}`, 15, yPos);
            yPos += 5;
        });

        // Save the PDF
        doc.save(`${resumeData.name.replace(' ', '_')}_Resume.pdf`);
        showNotification('Resume PDF downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
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
        document.getElementById('contactForm').addEventListener('submit', function(e) {
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
            ).then(function() {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                document.getElementById('contactForm').reset();
            }).catch(function(error) {
                console.error('EmailJS Error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            });
        });

        // Mobile menu functionality
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
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
        window.addEventListener('scroll', function() {
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
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Move orbs slightly based on mouse position
            document.querySelectorAll('.orb').forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            // Move profile photo slightly
            const profilePhoto = document.querySelector('.profile-photo');
            if (profilePhoto) {
                const x = (mouseX - 0.5) * 10;
                const y = (mouseY - 0.5) * 10;
                profilePhoto.style.transform = `translate(${x}px, ${y}px) rotateY(${x * 0.1}deg) rotateX(${-y * 0.1}deg)`;
            }
        });

        // Enhanced button hover effects
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

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

        // Add tilt effect to cards
        function addTiltEffect(selector) {
            document.querySelectorAll(selector).forEach(card => {
                card.addEventListener('mouseenter', function(e) {
                    this.style.transition = 'transform 0.1s ease';
                });
                
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transition = 'transform 0.3s ease';
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });
        }

        // Apply tilt effects to various elements
        addTiltEffect('.skill-card');
        addTiltEffect('.highlight-card');
        addTiltEffect('.contact-item');
        // Apply tilt effects to various elements
        addTiltEffect('.skill-card');
        addTiltEffect('.highlight-card');
        addTiltEffect('.contact-item');
        // ADD THESE TWO LINES ONLY:
        addTiltEffect('.project-card');
        addTiltEffect('.experience-item');
        addTiltEffect('.certificate-card');

        // Loading animation
        window.addEventListener('load', function() {
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
        document.addEventListener('DOMContentLoaded', function() {
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
        window.addEventListener('error', function(e) {
            console.error('Portfolio error:', e.error);
        });