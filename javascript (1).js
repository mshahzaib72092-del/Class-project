// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const hoverTriggers = document.querySelectorAll('.hover-trigger');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to interactive elements
hoverTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    trigger.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Typing Animation
const texts = ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

type();

// Create floating particles
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite`;
        container.appendChild(particle);
    }
}
createParticles();

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('glass-card', 'mx-4', 'rounded-2xl', 'mt-2');
        navbar.querySelector('.max-w-7xl').classList.remove('px-6');
        navbar.querySelector('.max-w-7xl').classList.add('px-4');
    } else {
        navbar.classList.remove('glass-card', 'mx-4', 'rounded-2xl', 'mt-2');
        navbar.querySelector('.max-w-7xl').classList.add('px-6');
        navbar.querySelector('.max-w-7xl').classList.remove('px-4');
    }
});

// Scroll Reveal Animation with Counter - ONCE ONLY
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate skill percentages ONCE
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                if (!bar.classList.contains('animated')) {
                    bar.classList.add('animated');
                }
            });

            const skillPercentages = entry.target.querySelectorAll('.skill-percent-text');
            skillPercentages.forEach(skill => {
                if (!skill.classList.contains('animated')) {
                    const target = parseInt(skill.getAttribute('data-target'));
                    animateValue(skill, 0, target, 1500);
                    skill.classList.add('animated');
                }
            });

            // Animate stat counters ONCE
            const statCounters = entry.target.querySelectorAll('.stat-counter');
            statCounters.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateValue(stat, 0, target, 1500);
                    stat.classList.add('animated');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// Animate counter function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        if (obj.classList.contains('stat-counter')) {
            obj.innerHTML = currentValue + '+';
        } else {
            obj.innerHTML = currentValue + '%';
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Form Submit Handler
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.classList.remove('gradient-orange');
    btn.classList.add('bg-green-500');
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.add('gradient-orange');
        btn.classList.remove('bg-green-500');
        e.target.reset();
    }, 3000);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mobileMenu').classList.add('hidden');
        }
    });
});

// 3D Form Cursor Follower
const formContainer = document.querySelector('.form-container-3d');

formContainer.addEventListener('mousemove', (e) => {
    const rect = formContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    const formCard = document.querySelector('.form-card-3d');
    formCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`;
});

formContainer.addEventListener('mouseleave', () => {
    const formCard = document.querySelector('.form-card-3d');
    formCard.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
});

// 3D Skill Cards Mouse Effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.skill-glow');
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
    });
});