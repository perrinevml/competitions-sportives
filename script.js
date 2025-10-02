document.addEventListener('DOMContentLoaded', function () {
    // Carrousel d'images
    const images = document.querySelectorAll('.carousel-img');
    let current = 0;

    function showImage(idx) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
    }

    function nextImage() {
        current = (current + 1) % images.length;
        showImage(current);
    }

    function prevImage() {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    }

    // Boutons du carrousel
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
    }

    // Démarrage automatique du carrousel toutes les 5 secondes
    setInterval(nextImage, 5000);

    showImage(current);

    // Filtre sur le tableau des événements
    const eventsSection = document.getElementById('evenements');
    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.placeholder = 'Rechercher un événement...';
    filterInput.style.margin = '1rem 0';
    filterInput.style.padding = '0.5rem';
    filterInput.style.width = '100%';
    eventsSection.insertBefore(filterInput, eventsSection.querySelector('table'));

    filterInput.addEventListener('input', function () {
        const filter = filterInput.value.toLowerCase();
        const rows = eventsSection.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    // Confirmation formulaire de suggestion
    const suggestionForm = document.querySelector('#suggestion form');
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Merci pour votre suggestion ! Elle a bien été envoyée.');
            suggestionForm.reset();
        });
    }

    // Menu mobile
    const nav = document.querySelector('nav ul');
    if (nav) {
        const menuBtn = document.createElement('button');
        menuBtn.textContent = '☰ Menu';
        menuBtn.style.background = '#0074d9';
        menuBtn.style.color = '#fff';
        menuBtn.style.border = 'none';
        menuBtn.style.padding = '0.7rem 1.2rem';
        menuBtn.style.fontSize = '1.1rem';
        menuBtn.style.cursor = 'pointer';
        menuBtn.style.display = 'none';
        menuBtn.style.margin = '1rem auto';
        menuBtn.style.borderRadius = '4px';

        nav.parentElement.insertBefore(menuBtn, nav);

        function checkWidth() {
            if (window.innerWidth < 700) {
                nav.style.display = 'none';
                menuBtn.style.display = 'block';
            } else {
                nav.style.display = 'flex';
                menuBtn.style.display = 'none';
            }
        }

        menuBtn.addEventListener('click', function () {
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        });

        window.addEventListener('resize', checkWidth);
        checkWidth();
    }
});
