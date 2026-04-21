document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar iconos
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Navegación Suave 
    const links = document.querySelectorAll('nav a[href^="#"], a[href^="#contacto"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if(targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Animación al hacer Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que aparece
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Manejo del formulario
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Enviando...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulación de envío
            setTimeout(() => {
                submitBtn.innerText = "¡Mensaje Enviado!";
                submitBtn.style.background = "#22c55e"; // Color de éxito
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = "linear-gradient(135deg, #b87333, #8b4513)";
                }, 3000);
            }, 1500);
        });
    }
});