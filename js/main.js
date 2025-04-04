// Smooth scrolling for navigation links
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--bg-color)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 5px var(--shadow-color)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.navbar').insertBefore(menuButton, nav);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    } else {
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton) {
            menuButton.remove();
        }
        document.querySelector('.nav-links').classList.remove('show');
    }
});

// Navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const sections = document.querySelectorAll('section, header.hero');
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll smoothly to the section
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active section when scrolling
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // 300px offset for better UX
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id') || 'hero';
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            } else if (current === 'hero' && link.getAttribute('href') === '#overview') {
                // Special case for the hero section
                link.classList.add('active');
            }
        });
    });
    
    // Mobile navigation toggle
    const navBrand = document.querySelector('.nav-brand');
    const navLinksContainer = document.querySelector('.nav-links');
    
    navBrand.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navLinksContainer.classList.toggle('show-mobile-nav');
        }
    });
});

// Add favicon animation
document.addEventListener('DOMContentLoaded', function() {
    // Get the favicon element
    const favicon = document.getElementById('favicon');
    const faviconHref = favicon.href;
    
    // Create animated SVG version
    function createAnimatedFavicon() {
        // Fetch the original SVG content
        fetch(faviconHref)
            .then(response => response.text())
            .then(svgContent => {
                // Parse SVG content
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                const svgRoot = svgDoc.documentElement;
                
                // Add animation class
                svgRoot.setAttribute('class', 'favicon-spin');
                
                // Add animation style if not already in CSS
                const style = document.createElement('style');
                style.textContent = '@keyframes favicon-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }' +
                                  '.favicon-spin { animation: favicon-spin 1s linear infinite; }';
                svgRoot.appendChild(style);
                
                // Convert back to string
                const serializer = new XMLSerializer();
                const animatedSvg = serializer.serializeToString(svgDoc);
                
                // Create a blob URL for the animated favicon
                const blob = new Blob([animatedSvg], {type: 'image/svg+xml'});
                const animatedUrl = URL.createObjectURL(blob);
                
                // Store the animated favicon URL
                window.animatedFaviconUrl = animatedUrl;
                
                // Initially set to the animated version when the page loads
                if (document.visibilityState === 'hidden') {
                    favicon.href = animatedUrl;
                }
            })
            .catch(error => {
                console.error('Error creating animated favicon:', error);
            });
    }
    
    // Call the function to create the animated favicon
    createAnimatedFavicon();
    
    // Handle visibility changes to swap favicons
    document.addEventListener('visibilitychange', function() {
        if (favicon && window.animatedFaviconUrl) {
            if (document.visibilityState === 'hidden') {
                // Switch to animated favicon when tab is not visible
                favicon.href = window.animatedFaviconUrl;
            } else {
                // Switch back to static favicon when tab is visible
                favicon.href = faviconHref;
            }
        }
    });
});

// Add theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.createElement('div');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = `
        <input type="checkbox" id="theme-switch" class="theme-switch">
        <label for="theme-switch" class="theme-switch-label">
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
            <span class="slider"></span>
        </label>
    `;
    
    document.body.appendChild(themeToggle);
    
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or use preferred color scheme
    if (localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && 
         !localStorage.getItem('theme'))) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Listen for toggle changes
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Add scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.classList.add('scroll-progress');
    document.body.appendChild(progressIndicator);
    
    // Update scroll progress
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressIndicator.style.width = scrollPercentage + '%';
    });
    
    // Animate sections on scroll
    const animateSections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateSections.forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });
    
    // Loading animation
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    loader.innerHTML = `
        <div class="loader-content">
            <img src="images/logo.svg" alt="Logo" class="loader-logo">
            <div class="loader-spinner"></div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }, 1500);
    });
});

// Interactive Feature Showcase Tabs
document.addEventListener('DOMContentLoaded', function() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            demoTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            const contents = document.querySelectorAll('.demo-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // Show content for clicked tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Testimonials Slider
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonials = document.querySelector('.testimonials');
    
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Calculate position
            const slideIndex = this.getAttribute('data-slide');
            testimonials.style.transform = `translateX(-${slideIndex * 100}%)`;
        });
    });
    
    // Auto-advance testimonials
    let currentSlide = 0;
    const totalSlides = testimonialDots.length;
    
    function advanceSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Update dots
        testimonialDots.forEach(d => d.classList.remove('active'));
        testimonialDots[currentSlide].classList.add('active');
        
        // Update position
        testimonials.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Auto-advance every 5 seconds
    setInterval(advanceSlide, 5000);
    
    // Team Member Expanded Profiles
    const teamMembers = document.querySelectorAll('.team-member');
    
    // Create the modal container if it doesn't exist
    if (!document.querySelector('.team-member-expanded')) {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('team-member-expanded');
        modalContainer.innerHTML = `
            <div class="team-member-modal">
                <div class="modal-close"><i class="fas fa-times"></i></div>
                <div class="team-modal-header">
                    <img class="modal-image" src="" alt="Team Member">
                    <div class="modal-info">
                        <h2 class="modal-name"></h2>
                        <div class="modal-role"></div>
                        <div class="modal-bio"></div>
                        <div class="skill-tags"></div>
                    </div>
                </div>
                <div class="modal-contributions">
                    <h3>Contributions</h3>
                    <ul class="contribution-list"></ul>
                </div>
            </div>
        `;
        document.body.appendChild(modalContainer);
        
        // Close modal on click
        const closeBtn = modalContainer.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            modalContainer.classList.remove('active');
        });
        
        // Close modal on outside click
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('active');
            }
        });
    }
    
    
    // Add click event to team members
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const data = teamData[name];
            
            if (data) {
                const modal = document.querySelector('.team-member-expanded');
                const modalImage = modal.querySelector('.modal-image');
                const modalName = modal.querySelector('.modal-name');
                const modalRole = modal.querySelector('.modal-role');
                const modalBio = modal.querySelector('.modal-bio');
                const skillTags = modal.querySelector('.skill-tags');
                const contributionList = modal.querySelector('.contribution-list');
                
                // Set content
                modalImage.src = this.querySelector('img').src;
                modalImage.alt = name;
                modalName.textContent = name;
                modalRole.textContent = data.role;
                modalBio.textContent = data.bio;
                
                // Create skill tags
                skillTags.innerHTML = '';
                data.skills.forEach(skill => {
                    const tag = document.createElement('div');
                    tag.classList.add('skill-tag');
                    tag.textContent = skill;
                    skillTags.appendChild(tag);
                });
                
                // Create contribution list
                contributionList.innerHTML = '';
                data.contributions.forEach(contribution => {
                    const li = document.createElement('li');
                    li.textContent = contribution;
                    contributionList.appendChild(li);
                });
                
                // Show modal
                modal.classList.add('active');
            }
        });
    });
});

// Animate timeline items when they come into view
const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
};

// Initialize timeline animation
document.addEventListener('DOMContentLoaded', () => {
    animateTimeline();
});

// Video autoplay functionality
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('demo-video');
    if (!video) return;

    // Set initial state
    video.volume = 1.0;
    video.muted = false;
    video.preload = 'auto';

    // Create a single observer for the video
    const videoObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            // Try to play the video when it's visible
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Playback started successfully
                        video.muted = false;
                        video.volume = 1.0;
                    })
                    .catch(error => {
                        console.log("Autoplay prevented:", error);
                        // Add a one-time click handler to the document
                        const clickHandler = () => {
                            video.play()
                                .then(() => {
                                    video.muted = false;
                                    video.volume = 1.0;
                                })
                                .catch(e => console.log("Play after click prevented:", e));
                            document.removeEventListener('click', clickHandler);
                        };
                        document.addEventListener('click', clickHandler);
                    });
            }
        } else {
            // Pause the video when it's not visible
            if (!video.paused) {
                video.pause();
            }
        }
    }, {
        threshold: 0.5
    });

    // Start observing the video
    videoObserver.observe(video);

    // Handle tab visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && !video.paused) {
            video.pause();
        } else if (!document.hidden && 
                   video.getBoundingClientRect().top < window.innerHeight &&
                   video.getBoundingClientRect().bottom > 0) {
            video.play()
                .then(() => {
                    video.muted = false;
                    video.volume = 1.0;
                })
                .catch(e => console.log("Resume prevented:", e));
        }
    });
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const slideWidth = 100; // 100%

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlider();
    }

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Optional: Auto-advance every 5 seconds
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
}); 