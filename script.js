
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .screenshot-item, .testimonial-card, .download-text, .download-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.innerText.replace('K+', '000').replace('★', '');
        const count = +counter.innerText;
        
        const updateCount = () => {
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.app-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function createFloatingElements() {
    const heroSection = document.querySelector('.hero');
    const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9'];
    
    for (let i = 0; i < 8; i++) {
        const floatingEl = document.createElement('div');
        floatingEl.classList.add('floating-element');
        
        const size = Math.random() * 20 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 15;
        
        floatingEl.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            opacity: ${Math.random() * 0.2 + 0.05};
            animation: float ${duration}s infinite ease-in-out ${delay}s;
            z-index: 1;
        `;
        
        heroSection.appendChild(floatingEl);
    }
}

window.addEventListener('load', createFloatingElements);

document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
е
    document.querySelectorAll('.feature-card, .screenshot-item, .testimonial-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо! Ваше сообщение отправлено.');
            form.reset();
        });
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 150);
    }
});

document.querySelectorAll('.screenshot-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('zoomed');
    });

});
