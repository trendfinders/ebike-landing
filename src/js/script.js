// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione delle variabili globali
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.sticky-nav');
    let lastScroll = 0;

    // ===== Gestione Menu Mobile =====
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
        mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // ===== Navigazione Sticky con Hide/Show su Scroll =====
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down -> Nascondi Nav
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up -> Mostra Nav
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // ===== Smooth Scroll per Link Interni =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Chiudi il menu mobile se aperto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
                    mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
                }
            }
        });
    });

    // ===== Animazioni allo Scroll =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.trust-badge, .product-card, .about-content, .dealers-search')
        .forEach(el => observer.observe(el));

    // ===== Inizializzazione e Gestione Google Maps =====
    let map;
    let markers = [];
    const dealers = [
        { lat: 45.4642, lng: 9.1900, name: "E-Bike Store Milano", address: "Via Milano, 123" },
        { lat: 41.9028, lng: 12.4964, name: "E-Bike Roma Centro", address: "Via Roma, 456" },
        { lat: 45.0703, lng: 7.6869, name: "E-Bike Torino", address: "Via Torino, 789" }
        // Aggiungi altri negozi qui
    ];

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 41.9028, lng: 12.4964 },
            zoom: 6,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "simplified"}]
                }
                // Aggiungi altri stili personalizzati qui
            ]
        });

        // Aggiungi i marker per ogni negozio
        dealers.forEach(dealer => {
            const marker = new google.maps.Marker({
                position: { lat: dealer.lat, lng: dealer.lng },
                map: map,
                title: dealer.name,
                animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="info-window">
                        <h3>${dealer.name}</h3>
                        <p>${dealer.address}</p>
                        <a href="#contatti" class="map-contact-btn">Contatta</a>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            markers.push(marker);
        });
    }

    // Inizializza la mappa se l'elemento esiste
    if (document.getElementById('map')) {
        initMap();
    }

    // ===== Gestione Form di Contatto =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validazione base
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData);
            
            if (!validateForm(formEntries)) {
                showNotification('Compila tutti i campi correttamente', 'error');
                return;
            }

            try {
                // Simula l'invio del form
                await submitForm(formEntries);
                showNotification('Messaggio inviato con successo!', 'success');
                this.reset();
            } catch (error) {
                showNotification('Errore durante l\'invio. Riprova più tardi.', 'error');
            }
        });
    }

    // ===== Funzioni di Utilità =====
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s+()-]{8,}$/;

        return data.name.length > 2 &&
               emailRegex.test(data.email) &&
               phoneRegex.test(data.phone) &&
               data.message.length > 10;
    }

    async function submitForm(data) {
        // Simula una chiamata API
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 1000);
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2500);
        }, 100);
    }

    // ===== Gestione Catalogo =====
    const infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Scroll alla sezione contatti
            document.getElementById('contatti').scrollIntoView({ behavior: 'smooth' });
            
            // Pre-compila il messaggio
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `Vorrei ricevere maggiori informazioni sul modello: ${productName}`;
            }
        });
    });
});

// ===== Lazy Loading per le Immagini =====
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===== Performance Monitoring =====
const perfData = {
    navigationStart: performance.now(),
    metrics: {}
};

window.addEventListener('load', () => {
    perfData.metrics.loadTime = performance.now() - perfData.navigationStart;
    console.log('Page Load Time:', perfData.metrics.loadTime + 'ms');
});
