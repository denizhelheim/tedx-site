// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    });
});

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

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Animate cards on scroll
document.querySelectorAll('.service-card, .feature-card, .meaning-card, .info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Form submission with better feedback
const form = document.querySelector('.contact form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Mesajınız başarıyla gönderildi!');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Application form submission
const applicationForm = document.querySelector('.application-form form');
if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = applicationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Başvuru Gönderiliyor...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Başvurunuz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
            applicationForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Typing effect for hero text (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function setupPageTransitions() {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetHref = this.href;
            document.body.classList.add('page-hidden');
            document.body.classList.remove('page-visible');

            function handleTransitionEnd(event) {
                if (event.propertyName !== 'opacity') return;
                document.body.removeEventListener('transitionend', handleTransitionEnd);
                window.location.href = targetHref;
            }

            document.body.addEventListener('transitionend', handleTransitionEnd);
        });
    });
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-visible');
    document.body.classList.remove('page-hidden');

    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle && heroTitle.textContent === '#AteşiYak') {
        typeWriter(heroTitle, '#AteşiYak', 150);
    }
    setupPageTransitions();
});

console.log('Web sitesi başarıyla yüklendi ve modernleştirildi! 🚀');
