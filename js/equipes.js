// Carrousel d'équipe FEGAFOOT
const joueurs = [
  { nom: 'Anse NGOUNBI', img: 'img-eqipe/Anse-Ngoubi.jpeg' },
  { nom: 'Jack RISONGA', img: 'img-eqipe/Jack-Risonga.jpeg' },
  { nom: 'Junior FOTSO', img: 'img-eqipe/Junior-Fotso.jpeg' },
  { nom: 'Michel MBOULA', img: 'img-eqipe/Michel-Mboula.jpeg' },
  { nom: 'Mario LEMINA', img: 'img-eqipe/Mario-Lemina.jpeg' },
  { nom: 'Allan Do MARCOLINO', img: 'img-eqipe/Allan-do-marcolino.jpeg' },
  { nom: 'Bruno ECUELE', img: 'img-eqipe/Bruno-eccuele.jpeg' },
  { nom: 'Johann OBIANG', img: 'img-eqipe/Johann-Obiang.jpeg' },
  { nom: 'Denis BOUNGA', img: 'img-eqipe/Denis-Bouanga.jpeg' },
  { nom: 'Jim ALLEVINAH', img: 'img-eqipe/Jim-Allevinah.jpeg' },
  { nom: 'Guelor KANGA', img: 'img-eqipe/Guelor-Kanga.jpeg' },
  { nom: 'Shavy BABICKA', img: 'img-eqipe/Shavy-Babicka.jpeg' },
  { nom: 'Alex MOUCKETOU', img: 'img-eqipe/Alex-Moucketou.jpeg' },
  { nom: 'Aaron APINDANGOYE', img: 'img-eqipe/AAron-Appidangoye.jpeg' },
  { nom: 'Medwin BITHEGUE', img: 'img-eqipe/Medwin-Bithegue.jpeg' },
  { nom: 'Loyce MBABA', img: 'img-eqipe/Loyce-Mbaba.jpeg' },
  { nom: 'David SAMBISSA', img: 'img-eqipe/David-Sambissa.jpeg' },
  { nom: 'Sidney OBISSA', img: 'img-eqipe/Sidney-Obissa.jpeg' },
  { nom: 'Anthony OYONO', img: 'img-eqipe/Anthony-Oyono.jpeg' },
  { nom: 'Jeremi OYONO', img: 'img-eqipe/Jeremi-Oyono.jpeg' }
];

// Variables globales
let currentIndex = 0;
let autoSlideInterval;
let isMobile = window.innerWidth <= 900;
const carousel = document.querySelector('.equipe-carousel');
const dotsContainer = document.createElement('div');
dotsContainer.className = 'joueur-slider-dots';
document.querySelector('.equipe-carousel-wrapper').appendChild(dotsContainer);

// Initialisation du carrousel
function initCarousel() {
  isMobile = window.innerWidth <= 900;
  renderCarousel();
  setupAutoSlide();
  setupEventListeners();
  
  // Pour mobile, on initialise le slider avec les dots
  if (isMobile) {
    createDots();
  }
}

// Crée les points de navigation
function createDots() {
  dotsContainer.innerHTML = '';
  joueurs.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'joueur-dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// Rendu du carrousel
function renderCarousel() {
  if (!carousel) return;
  
  carousel.innerHTML = '';
  
  if (isMobile) {
    // Version mobile - une seule carte visible
    const joueur = joueurs[currentIndex];
    createPlayerCard(joueur);
  } else {
    // Version desktop - 4 cartes visibles
    const startIndex = currentIndex % joueurs.length;
    for (let i = 0; i < 4; i++) {
      const idx = (startIndex + i) % joueurs.length;
      const joueur = joueurs[idx];
      createPlayerCard(joueur);
    }
  }
}

// Création d'une carte de joueur
function createPlayerCard(joueur) {
  const div = document.createElement('div');
  div.className = 'joueur';
  div.innerHTML = `
    <img src="${joueur.img}" alt="${joueur.nom}">
    <div class="nom">${joueur.nom}</div>
  `;
  carousel.appendChild(div);
}

// Défilement suivant
function slideNext() {
  currentIndex = (currentIndex + 1) % joueurs.length;
  updateCarousel();
}

// Défilement précédent
function slidePrev() {
  currentIndex = (currentIndex - 1 + joueurs.length) % joueurs.length;
  updateCarousel();
}

// Va à un slide spécifique
function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// Met à jour l'affichage du carrousel
function updateCarousel() {
  renderCarousel();
  
  // Met à jour les points de navigation
  if (isMobile) {
    const dots = document.querySelectorAll('.joueur-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Réinitialise le timer d'auto-défilement
  if (isMobile) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideNext, 5000);
  }
}

// Configuration du défilement automatique
function setupAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  
  // Défilement automatique seulement sur mobile
  if (isMobile) {
    autoSlideInterval = setInterval(slideNext, 5000);
  }
}

// Gestion des événements tactiles
function setupTouchEvents() {
  if (!carousel) return;
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    clearInterval(autoSlideInterval);
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    setupAutoSlide();
  }, { passive: true });
  
  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      slideNext();
    } else if (diff < -50) {
      slidePrev();
    }
  }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (prevBtn) prevBtn.addEventListener('click', slidePrev);
  if (nextBtn) nextBtn.addEventListener('click', slideNext);
  
  // Gestion du redimensionnement
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 900;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      currentIndex = 0;
      initCarousel();
    }
  });
  
  // Événements tactiles pour mobile
  if (isMobile) {
    setupTouchEvents();
  }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', initCarousel);