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
});
