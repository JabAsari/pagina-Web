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

// --- 5. Lógica del Carrusel de Envíos ---
    const carruselContenedor = document.getElementById('carrusel-envios');
    
    if (carruselContenedor) {
        // AQUÍ PON TUS IMÁGENES. Puedes poner 3, 4, las que quieras.
        const imagenesCarrusel = [
            'img/envios.jpeg', // Foto 1
            'img/envios2.jpeg',  // Foto 2 (Ejemplo, cambia por una real)
            'img/envios3.jpeg',
            'img/envios4.jpeg',
            'img/envios5.jpeg'  // Foto 3 (Ejemplo, cambia por una real)
        ];

        let indiceActual = 0;

        // Limpiamos el contenedor por si había algo precargado
        carruselContenedor.innerHTML = '';

        // Creamos los elementos (divs) para cada imagen
        const slides = imagenesCarrusel.map((url, index) => {
            const div = document.createElement('div');
            div.className = `carrusel-slide ${index === 0 ? 'active' : ''}`;
            // Usamos un fallback a Unsplash por si la imagen local falla en la prueba
            div.style.backgroundImage = `url('${url}'), url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000')`;
            carruselContenedor.appendChild(div);
            return div;
        });

        // Función que cambia la imagen cada cierto tiempo
        setInterval(() => {
            // Quitamos la clase 'active' a la imagen actual (se desvanece)
            slides[indiceActual].classList.remove('active');
            
            // Calculamos cuál es la siguiente imagen
            indiceActual = (indiceActual + 1) % slides.length;
            
            // Le ponemos la clase 'active' a la nueva imagen (aparece suavemente)
            slides[indiceActual].classList.add('active');
        }, 4000); // 4000 milisegundos = 4 segundos. Puedes cambiar este número.
    }