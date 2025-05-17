// Mobil Menü İşlemleri
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Menüyü aç/kapat
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Menü linklerine tıklandığında menüyü kapat
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Sayfa scroll olduğunda menüyü kapat
window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Form doğrulama
// const contactForm = document.getElementById('contact-form');
// 
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const message = document.getElementById('message').value.trim();
//     
//     // Basit doğrulama
//     if (name === '' || email === '' || message === '') {
//         alert('Lütfen tüm alanları doldurun.');
//         return;
//     }
//     
//     // Email formatı kontrolü
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert('Lütfen geçerli bir email adresi girin.');
//         return;
//     }
//     
//     // Form gönderildiğinde
//     alert('Mesajınız gönderildi! (Demo amaçlı)');
//     contactForm.reset();
// });

// Sayfa yüklendiğinde animasyon
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Scroll animasyonu
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Animasyon eklenecek elementler
document.querySelectorAll('.about-content, .projects-grid, .contact-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    observer.observe(element);
});

// CSS sınıfı eklendiğinde animasyon
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Tema toggle ve sistem teması algılama
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark');
        themeIcon.innerHTML = '<path d="M21.64 13.64A9 9 0 1 1 10.36 2.36a7 7 0 1 0 11.28 11.28z"/>';
    } else {
        document.body.classList.remove('dark');
        themeIcon.innerHTML = `
        <circle cx="12" cy="12" r="6" fill="currentColor"/>
        <g>
          <polygon points="12,2 13,6 11,6" fill="currentColor"/>
          <polygon points="12,22 13,18 11,18" fill="currentColor"/>
          <polygon points="2,12 6,13 6,11" fill="currentColor"/>
          <polygon points="22,12 18,13 18,11" fill="currentColor"/>
          <polygon points="4.22,4.22 7,7 5.59,5.59" fill="currentColor"/>
          <polygon points="19.78,19.78 17,17 18.41,18.41" fill="currentColor"/>
          <polygon points="4.22,19.78 7,17 5.59,18.41" fill="currentColor"/>
          <polygon points="19.78,4.22 17,7 18.41,5.59" fill="currentColor"/>
        </g>`;
    }
}

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getSavedTheme() {
    return localStorage.getItem('theme');
}

function saveTheme(mode) {
    localStorage.setItem('theme', mode);
}

// İlk yüklemede sistem veya kaydedilmiş tema
const savedTheme = getSavedTheme();
const systemTheme = getSavedTheme() || getSystemTheme();
setTheme(systemTheme);

// Toggle butonu
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
    saveTheme(isDark ? 'light' : 'dark');
});

// Sistem teması değişirse otomatik güncelle
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!getSavedTheme()) {
        setTheme(e.matches ? 'dark' : 'light');
    }
}); 