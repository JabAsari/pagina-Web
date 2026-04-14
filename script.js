/**
 * Alambiques Santaella - Lógica de Interacción
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar iconos de Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Navegación Suave (Ajustada para Sticky Nav)
    const links = document.querySelectorAll('nav a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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

    // 3. Cerrar Modales al hacer clic en el fondo oscuro (Backdrop)
    const modals = document.querySelectorAll('[id^="modal-"]');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Cerramos solo si se hace clic en el área oscura, no en el contenido
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // 4. Soporte para cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('[id^="modal-"]:not(.hidden)');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
});

/**
 * Función para abrir el modal
 * @param {string} id - El ID del elemento modal
 */
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        // Bloqueamos el scroll del body para mejorar la experiencia
        document.body.classList.add('overflow-hidden');
    }
};

/**
 * Función para cerrar el modal
 * @param {string} id - El ID del elemento modal
 */
window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        // Devolvemos el scroll al body
        document.body.classList.remove('overflow-hidden');
    }
};

/**
 * Gestión básica del formulario de contacto
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí iría la lógica de envío (API/Firestore)
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "Enviando...";
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerText = "¡Mensaje Enviado!";
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}