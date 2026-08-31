document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Typewriter Effect
    const typewriterText = document.querySelector('.typewriter-text');
    const phrases = [
        'Full Stack Developer',
        'AI & ML Engineer',
        'Software Developer',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
                return;
            }
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex++);
            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();

    // 3. Interactive Skill Hover Spotlight
    const skillPills = document.querySelectorAll('.skill-pill');
    const spotlightTitle = document.getElementById('spotlightTitle');
    const spotlightCert = document.getElementById('spotlightCert');
    const spotlightProject = document.getElementById('spotlightProject');
    const spotlightDesc = document.getElementById('spotlightDesc');
    const spotlightImg = document.getElementById('spotlightImg');
    const bigSpotlight = document.getElementById('bigSkillSpotlight');

    function updateSpotlight(pill) {
        skillPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const title = pill.getAttribute('data-title');
        const img = pill.getAttribute('data-img');
        const project = pill.getAttribute('data-project');
        const cert = pill.getAttribute('data-cert');
        const desc = pill.getAttribute('data-desc');

        spotlightTitle.textContent = title;
        if (img) {
            spotlightImg.src = img;
            spotlightImg.alt = title;
            spotlightImg.style.display = 'block';
        }
        spotlightCert.innerHTML = `<i class="fas fa-award"></i> ${cert}`;
        spotlightProject.innerHTML = `<i class="fas fa-folder-open"></i> Project: ${project}`;
        spotlightDesc.textContent = desc;

        if (bigSpotlight) {
            bigSpotlight.style.transform = 'scale(0.99)';
            setTimeout(() => {
                bigSpotlight.style.transform = 'scale(1)';
            }, 60);
        }
    }

    skillPills.forEach(pill => {
        pill.addEventListener('mouseenter', () => updateSpotlight(pill));
        pill.addEventListener('click', () => updateSpotlight(pill));
    });

    // 4. 3D Perspective Tilt Effect on Mouse Move
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 5. Active Nav Highlight on Scroll
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        slides.forEach(slide => {
            const slideTop = slide.offsetTop - 140;
            if (window.pageYOffset >= slideTop) {
                current = slide.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 7. Tab key navigation between slides
    const slideIds = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5'];
    let isScrolling = false;

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        e.stopImmediatePropagation();

        if (isScrolling) return;
        isScrolling = true;

        let currentIndex = 0;
        slides.forEach((slide, i) => {
            if (window.pageYOffset >= slide.offsetTop - window.innerHeight / 2) {
                currentIndex = i;
            }
        });

        const goBack = e.shiftKey;
        let nextIndex = goBack ? currentIndex - 1 : currentIndex + 1;
        nextIndex = Math.max(0, Math.min(nextIndex, slideIds.length - 1));

        document.getElementById(slideIds[nextIndex]).scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => { isScrolling = false; }, 900);
    }, true);
});