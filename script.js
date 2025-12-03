document.addEventListener('DOMContentLoaded', function() {

    // --- EFECTO DE SCROLL SUAVE PARA ENLACES INTERNOS ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    for (let link of smoothScrollLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // --- EFECTO DE APARICIÓN AL HACER SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // El elemento se activa cuando el 10% es visible
    });

    // Observar todas las secciones y tarjetas de proyecto
    const elementsToAnimate = document.querySelectorAll('.container');
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden-initial'); // Añade una clase para el estado inicial
        observer.observe(el);
    });

    // --- LÓGICA DEL CARRUSEL DE PROYECTOS ---
    let slideIndex = 1;
    const slides = document.getElementsByClassName("carousel-slide");
    if (slides.length > 0) {
        showSlides(slideIndex);

        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');

        prevButton.addEventListener('click', () => plusSlides(-1));
        nextButton.addEventListener('click', () => plusSlides(1));

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function showSlides(n) {
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex-1].style.display = "block";
        }
    }

    // --- LÓGICA PARA EL MODAL DE PROYECTOS ---
    const modal = document.getElementById("projectModal");
    const modalDescription = document.getElementById("modal-project-description");
    const modalTitle = document.getElementById("modal-project-title"); // Nuevo elemento para el título
    const modalGallery = document.getElementById("modal-project-gallery");
    const closeButton = document.querySelector(".close-button");

    // Solo intentar añadir listeners si el modal existe
    if (modal) {
        document.querySelectorAll('.open-modal-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const projectSlide = event.target.closest('.carousel-slide');
                
                // Obtener datos del proyecto desde los atributos data-*
                const title = projectSlide.dataset.title; // Obtener el título
                const description = projectSlide.dataset.description;
                const images = JSON.parse(projectSlide.dataset.images);

                modalTitle.textContent = title; // Asignar el título al modal
                // Llenar el modal con los datos
                modalDescription.innerHTML = `<p>${description}</p>`;
                modalGallery.innerHTML = ''; // Limpiar galería anterior
                images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = "Imagen del proyecto";
                    modalGallery.appendChild(img);
                });

                // Mostrar el modal
                modal.style.display = "block";
                document.body.classList.add('modal-open'); // Bloquea el scroll del body
            });
        });

        // Cerrar el modal al hacer clic en la 'X' o fuera del contenido
        closeButton.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.classList.remove('modal-open'); // Restaura el scroll del body
        });
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.classList.remove('modal-open'); // Restaura el scroll del body
            }
        });
    }
});
