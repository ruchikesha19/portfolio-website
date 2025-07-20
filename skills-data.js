const skillsData = {
    Python: {
        proficiency: 80,
        description: 'Used for backend development, data analysis, and machine learning applications.'
    },
    Java: {
        proficiency: 75,
        description: 'Applied in object-oriented programming, Android development, and enterprise applications.'
    },
    MySQL: {
        proficiency: 85,
        description: 'Database management, complex queries, and data modeling for web applications.'
    },
    HTML: {
        proficiency: 80,
        description: 'Semantic markup, accessibility best practices, and modern HTML5 features.'
    },
    CSS: {
        proficiency: 85,
        description: 'Responsive design, animations, and modern layout techniques like Flexbox and Grid.'
    },
    JavaScript: {
        proficiency: 80,
        description: 'DOM manipulation, async programming, and modern ES6+ features.'
    },
    React: {
        proficiency: 75,
        description: 'Component-based development, state management, and React hooks.'
    },
    Figma: {
        proficiency: 85,
        description: 'UI/UX design, prototyping, and collaborative design systems.'
    }
};

// Create and show tooltip
function showSkillTooltip(skill, event) {
    const data = skillsData[skill];
    if (!data) return;

    // Remove existing tooltip if any
    const existingTooltip = document.querySelector('.skill-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `
        <div class="progress-label">Proficiency: ${data.proficiency}%</div>
        <div class="progress-track">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
    `;

    // Create description
    const description = document.createElement('div');
    description.className = 'tooltip-description';
    description.textContent = data.description;

    // Add elements to tooltip
    tooltip.appendChild(progressBar);
    tooltip.appendChild(description);

    // Set initial position for animation
    tooltip.style.position = 'absolute';
    tooltip.style.opacity = '0';
    document.body.appendChild(tooltip);

    // Position tooltip after it's added to the DOM
    positionTooltip(tooltip, event.target);
    
    // Trigger animation
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
    });

    // Add to document
    document.body.appendChild(tooltip);

    // Animate progress bar
    requestAnimationFrame(() => {
        const fill = tooltip.querySelector('.progress-fill');
        fill.style.width = data.proficiency + '%';
    });

    // Remove tooltip when mouse leaves
    const removeTooltip = () => {
        tooltip.remove();
        bubble.removeEventListener('mouseleave', removeTooltip);
    };

    bubble.addEventListener('mouseleave', removeTooltip);
}

// Add event listeners to skill bubbles
document.addEventListener('DOMContentLoaded', () => {
    const bubbles = document.querySelectorAll('.bubble');
    let activeTooltip = null;

    bubbles.forEach(bubble => {
        // Handle both click and hover events
        ['click', 'mouseenter'].forEach(eventType => {
            bubble.addEventListener(eventType, (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove any existing tooltip
                if (activeTooltip) {
                    activeTooltip.remove();
                }
                
                showSkillTooltip(e.target.textContent.trim(), e);
                activeTooltip = document.querySelector('.skill-tooltip');
            });
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', (e) => {
        if (activeTooltip && !e.target.closest('.bubble')) {
            activeTooltip.remove();
            activeTooltip = null;
        }
    });

    // Handle touch events for mobile
    document.addEventListener('touchstart', (e) => {
        if (activeTooltip && !e.target.closest('.bubble')) {
            activeTooltip.remove();
            activeTooltip = null;
        }
    });
});

// Update tooltip positioning
function positionTooltip(tooltip, bubble) {
    const bubbleRect = bubble.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Calculate positions
    let top = bubbleRect.top + scrollTop - tooltipRect.height - 10;
    let left = bubbleRect.left + scrollLeft + (bubbleRect.width - tooltipRect.width) / 2;

    // Adjust if tooltip would go off screen
    if (top < scrollTop) {
        // Show below if not enough space above
        top = bubbleRect.bottom + scrollTop + 10;
    }

    if (left < scrollLeft) {
        left = scrollLeft + 10;
    } else if (left + tooltipRect.width > window.innerWidth + scrollLeft) {
        left = window.innerWidth + scrollLeft - tooltipRect.width - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}