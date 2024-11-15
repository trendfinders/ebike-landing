       // Initialize AOS
       AOS.init({
        duration: 1000,
        once: true
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Grazie per la tua richiesta! Ti contatteremo presto.');
        this.reset();
    });

    // Mobile menu toggle (you can expand this)
    function toggleMobileMenu() {
        // Add your mobile menu logic here
    }

     // Dati dei rivenditori (esempio)
const dealers = [
    {
        name: "BikeStore Milano",
        address: "Via Milano 123, Milano",
        phone: "+39 02 1234567",
        coords: [45.4642, 9.1900]
    },
    {
        name: "Cicli Express Roma",
        address: "Via Roma 456, Roma",
        phone: "+39 06 7654321",
        coords: [41.9028, 12.4964]
    },
    {
        name: "Bike World Torino",
        address: "Corso Torino 789, Torino",
        phone: "+39 011 9876543",
        coords: [45.0703, 7.6869]
    },
    // Puoi aggiungere altri rivenditori qui
];

// Inizializza la mappa
const map = L.map('map').setView([41.9028, 12.4964], 6); // Centro Italia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Popola la lista dei rivenditori e aggiungi i marker
const dealersList = document.getElementById('dealers-list');

dealers.forEach(dealer => {
    // Aggiungi marker alla mappa
    const marker = L.marker(dealer.coords)
        .addTo(map)
        .bindPopup(`
            <strong>${dealer.name}</strong><br>
            ${dealer.address}<br>
            Tel: ${dealer.phone}
        `);

    // Crea elemento nella lista
    const dealerElement = document.createElement('div');
    dealerElement.className = 'p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition';
    dealerElement.innerHTML = `
        <h4 class="font-semibold">${dealer.name}</h4>
        <p class="text-gray-600 text-sm">${dealer.address}</p>
        <p class="text-gray-600 text-sm">${dealer.phone}</p>
    `;

    // Aggiungi evento click per centrare la mappa
    dealerElement.addEventListener('click', () => {
        map.setView(dealer.coords, 15);
        marker.openPopup();
    });

    dealersList.appendChild(dealerElement);
});

// Funzione per aggiungere nuovi rivenditori
function addDealer(name, address, phone, lat, lng) {
    const newDealer = {
        name: name,
        address: address,
        phone: phone,
        coords: [lat, lng]
    };
    
    dealers.push(newDealer);
    
    // Aggiorna mappa e lista
    const marker = L.marker(newDealer.coords)
        .addTo(map)
        .bindPopup(`
            <strong>${newDealer.name}</strong><br>
            ${newDealer.address}<br>
            Tel: ${newDealer.phone}
        `);

    const dealerElement = document.createElement('div');
    dealerElement.className = 'p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition';
    dealerElement.innerHTML = `
        <h4 class="font-semibold">${newDealer.name}</h4>
        <p class="text-gray-600 text-sm">${newDealer.address}</p>
        <p class="text-gray-600 text-sm">${newDealer.phone}</p>
    `;

    dealerElement.addEventListener('click', () => {
        map.setView(newDealer.coords, 15);
        marker.openPopup();
    });

    dealersList.appendChild(dealerElement);
}

function toggleMobileMenu() {
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden');
    // Agregamos una animación suave
    mobileMenu.classList.add('animate-fade-in');
} else {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('animate-fade-in');
}
}

// Cerrar el menú móvil cuando se hace click en un enlace
document.querySelectorAll('#mobileMenu a').forEach(link => {
link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('hidden');
});
});

document.addEventListener('DOMContentLoaded', function() {
    const videoThumbnail = document.getElementById('videoThumbnail');
    const videoContainer = document.getElementById('videoContainer');
    const youtubeVideo = document.getElementById('youtubeVideo');
    const closeVideo = document.getElementById('closeVideo');

    // Video Play Handler
    videoThumbnail.addEventListener('click', function() {
        // Sostituisci VIDEO_ID con l'ID del tuo video YouTube
        youtubeVideo.src = 'https://www.youtube.com/embed/m5YOCaNWADc?si=1DIzSFfeSLhMiaF9&autoplay=0&rel=0&showinfo=0&modestbranding=1';
        videoContainer.classList.remove('hidden');
        // Aggiungi animazione fade-in
        videoContainer.classList.add('animate-fade-in');
    });

    // Close Video Handler
    closeVideo.addEventListener('click', function() {
        youtubeVideo.src = '';
        videoContainer.classList.add('hidden');
        videoContainer.classList.remove('animate-fade-in');
    });
});

// Aggiungi questo alla sezione degli stili
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
    </style>
`);