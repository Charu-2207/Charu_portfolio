// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to nav links on scroll
let currentSection = '';

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.skill-card, .skill-cat-card, .project-card, .internship-card, .leadership-card, .cert-category, .academic-card, .achievement-card, .about-text, .about-badges-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic typewriter effect for hero title
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const roles = [
        'Aspiring Data Analyst',
        'CSE Student @ VCET',
        'Power BI & SQL Specialist',
        'Department Topper (9.3 CGPA)'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing new text
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});


// Counter animation for stats
const animateCounter = (element, target, duration = 1500) => {
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : (target === 7 ? target + '+' : target);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const target = parseFloat(statNumber.textContent);
                if (!isNaN(target)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, target);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
});

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    // Skills Filter Tabs Functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');
    const allSkillsGrid = document.getElementById('allSkillsGrid');
    const categorySkillsGrid = document.getElementById('categorySkillsGrid');
    const skillCatCards = document.querySelectorAll('.skill-cat-card');

    function applySkillFilter(filter) {
        // Update active tab button
        skillTabs.forEach(t => {
            if (t.getAttribute('data-filter') === filter) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        if (filter === 'all') {
            // In All Skills section: Show grouped category boxes, hide individual cards
            if (allSkillsGrid) {
                allSkillsGrid.style.display = 'grid';
                allSkillsGrid.style.opacity = '1';
                allSkillsGrid.classList.remove('animating');
                void allSkillsGrid.offsetWidth;
                allSkillsGrid.classList.add('animating');
            }
            if (categorySkillsGrid) {
                categorySkillsGrid.style.display = 'none';
            }
        } else {
            // Category tab clicked: Hide grouped category boxes, show individual cards
            if (allSkillsGrid) {
                allSkillsGrid.style.display = 'none';
            }
            if (categorySkillsGrid) {
                categorySkillsGrid.style.display = 'flex';
                categorySkillsGrid.style.opacity = '1';
            }

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                let isVisible = false;
                if (filter === 'soft') {
                    isVisible = category.includes('soft');
                } else {
                    isVisible = category.includes(filter);
                }

                if (isVisible) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.classList.remove('animating');
                    void card.offsetWidth;
                    card.classList.add('animating');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animating');
                }
            });
        }
    }

    if (skillTabs.length > 0) {
        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter');
                applySkillFilter(filter);
            });
        });

        // Clicking a category box in All Skills view switches to that category
        if (skillCatCards.length > 0) {
            skillCatCards.forEach(catCard => {
                catCard.addEventListener('click', () => {
                    const targetCategory = catCard.getAttribute('data-category');
                    if (targetCategory) {
                        applySkillFilter(targetCategory);
                    }
                });
            });
        }

        // Toggle active glow on individual skill cards
        skillCards.forEach(card => {
            card.addEventListener('click', () => {
                skillCards.forEach(c => c.classList.remove('active-glow'));
                card.classList.add('active-glow');
            });
        });

        // Initialize All Skills view
        applySkillFilter('all');
    }
});
