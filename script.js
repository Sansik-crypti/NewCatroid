// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Фиксированный хедер при скролле
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Плавная прокрутка к секциям
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

// Анимация появления элементов при скролле
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

// Наблюдаем за элементами для анимации
document.querySelectorAll('.feature-card, .screenshot-item, .testimonial-card, .download-text, .download-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// FAQ аккордеон
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Анимация счетчиков
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

// Запуск анимации счетчиков при попадании в область видимости
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

// Плавающие элементы в герой секции
function createFloatingElements() {
    const heroSection = document.querySelector('.hero');
    const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9'];
    
    for (let i = 0; i < 8; i++) {
        const floatingEl = document.createElement('div');
        floatingEl.classList.add('floating-element');
        
        // Случайные свойства
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

// Создаем плавающие элементы после загрузки страницы
window.addEventListener('load', createFloatingElements);

// Анимация наведения на кнопки скачивания
document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Параллакс эффект для герой секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс для анимации при загрузке
    document.querySelectorAll('.feature-card, .screenshot-item, .testimonial-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Показываем элементы с задержкой
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Обработка формы (если будет добавлена)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить отправку формы
            alert('Спасибо! Ваше сообщение отправлено.');
            form.reset();
        });
    });
});

// Добавляем эффект печатающего текста для заголовка
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

// Запускаем эффект печатающего текста для главного заголовка
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 150);
    }
});

// Добавляем интерактивность для скриншотов
document.querySelectorAll('.screenshot-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('zoomed');
    });
});