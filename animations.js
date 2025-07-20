window.addEventListener('load', () => {
    try {
        // Create containers first
        const heroContainer = document.createElement('div');
        const skillsContainer = document.createElement('div');

        const skillsAnimation = bodymovin.loadAnimation({
            container: skillsContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json' // Tech stack animation
        });

        const skillsSection = document.querySelector('.skills');
        if (skillsSection && skillsContainer) {
            skillsContainer.classList.add('skills-animation');
            skillsSection.prepend(skillsContainer);
        }

        // Add error handlers
        heroAnimation.addEventListener('error', () => {
            console.error('Error loading hero animation');
        });

        skillsAnimation.addEventListener('error', () => {
            console.error('Error loading skills animation');
        });
    } catch (error) {
        console.error('Error initializing animations:', error);
    }

    // Enhanced scroll animations
    gsap.to('.bubble', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
        },
        stagger: {
            amount: 1,
            from: 'random'
        },
        scale: 1.2,
        rotation: 360,
        ease: 'none'
    });

    // Magnetic effect for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            gsap.to(card, {
                duration: 0.5,
                x: deltaX * 20,
                y: deltaY * 20,
                rotation: deltaX * 5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                x: 0,
                y: 0,
                rotation: 0
            });
        });
    });

    // Particle effect background
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#4a90e2' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4a90e2',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'  // Changed from 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
});

// Text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble effect to headings
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Problem Solver & Creative Thinker',
        'Python & Java Expert',
        'Tech Enthusiast & Innovator',
        'Web Developer & Designer',
        'AI & IoT Enthusiast',
        'Database & Backend Expert',
        'Frontend & UX Specialist'
    ];

    const el = document.querySelector('.hero-content h1');
    if (el) {
        // Set initial text content
        const initialText = 'Full-Stack Developer & UI/UX Designer';
        el.textContent = initialText;
        
        // Initialize text scramble effect
        const fx = new TextScramble(el);
        let counter = 0;

        const next = () => {
            const currentPhrase = phrases[counter % phrases.length];
            fx.setText(currentPhrase).then(() => {
                setTimeout(next, 3000);
            });
            counter = (counter + 1) % phrases.length;
        };

        // Start the animation after a delay
        setTimeout(() => {
            next();
        }, 2000);
    }
});