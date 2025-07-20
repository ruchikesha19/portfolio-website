// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate skill bubbles
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach((bubble, index) => {
    gsap.from(bubble, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: '.skills',
            start: 'top center'
        }
    });
});

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: 'top 80%'
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add animation for form submission
    gsap.to(contactForm, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    }, 1000);
});

// Interactive skill bubbles
document.querySelector('.skill-bubbles').addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('bubble')) {
        gsap.to(e.target, {
            scale: 1.1,
            duration: 0.3
        });
    }
});

document.querySelector('.skill-bubbles').addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('bubble')) {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.3
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
});

// Add class to nav on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});