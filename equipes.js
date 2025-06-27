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
let isMobile = window.innerWidth <= 768;
const carousel = document.querySelector('.equipe-carousel');
const nbVisibleDesktop = 4; // Nombre de joueurs visibles sur desktop
const nbVisibleMobile = 2; // Nombre de joueurs visibles sur mobile
const scrollStep = isMobile ? nbVisibleMobile : 2; // Nombre de cartes à défiler

// Initialisation du carrousel
function initCarousel() {
  isMobile = window.innerWidth <= 768;
  renderCarousel();
  setupAutoSlide();
  setupEventListeners();
}

// Rendu du carrousel
function renderCarousel() {
  if (!carousel) return;
  
  carousel.innerHTML = '';
  
  const nbVisible = isMobile ? nbVisibleMobile : nbVisibleDesktop;
  
  // Afficher les cartes visibles
  for (let i = 0; i < Math.min(nbVisible, joueurs.length); i++) {
    const idx = (currentIndex + i) % joueurs.length;
    const joueur = joueurs[idx];
    createPlayerCard(joueur);
  }
  
  // Pour le mobile, on clone les éléments pour un défilement infini fluide
  if (isMobile) {
    for (let i = 0; i < nbVisibleMobile; i++) {
      const idx = (currentIndex + i) % joueurs.length;
      const joueur = joueurs[idx];
      createPlayerCard(joueur, true); // true pour indiquer que c'est un clone
    }
  }
}

// Création d'une carte de joueur
function createPlayerCard(joueur, isClone = false) {
  const div = document.createElement('div');
  div.className = 'joueur' + (isClone ? ' clone' : '');
  div.innerHTML = `
    <img src="${joueur.img}" alt="${joueur.nom}">
    <div class="nom">${joueur.nom}</div>
  `;
  carousel.appendChild(div);
}

// Défilement suivant
function slideNext() {
  currentIndex = (currentIndex + scrollStep) % joueurs.length;
  if (isMobile) {
    smoothScrollToNext();
  } else {
    renderCarousel();
  }
}

// Défilement précédent
function slidePrev() {
  currentIndex = (currentIndex - scrollStep + joueurs.length) % joueurs.length;
  if (isMobile) {
    smoothScrollToPrev();
  } else {
    renderCarousel();
  }
}

// Animation fluide pour mobile (suivant)
function smoothScrollToNext() {
  if (!carousel) return;
  
  const firstChild = carousel.firstElementChild;
  if (!firstChild) return;
  
  const itemWidth = firstChild.offsetWidth + parseInt(window.getComputedStyle(carousel).gap);
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${itemWidth * scrollStep}px)`;
  
  setTimeout(() => {
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0)';
    currentIndex = (currentIndex + scrollStep) % joueurs.length;
    renderCarousel();
  }, 500);
}

// Animation fluide pour mobile (précédent)
function smoothScrollToPrev() {
  if (!carousel) return;
  
  // On ajoute temporairement des clones au début
  for (let i = 1; i <= scrollStep; i++) {
    const idx = (currentIndex - scrollStep - i + joueurs.length) % joueurs.length;
    const joueur = joueurs[idx];
    createPlayerCard(joueur, true);
  }
  
  // On force un recalcul du layout
  carousel.offsetHeight;
  
  const itemWidth = carousel.firstElementChild.offsetWidth + parseInt(window.getComputedStyle(carousel).gap);
  carousel.style.transition = 'none';
  carousel.style.transform = `translateX(-${itemWidth * scrollStep}px)`;
  
  // On force un nouveau recalcul
  carousel.offsetHeight;
  
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = 'translateX(0)';
  
  setTimeout(() => {
    currentIndex = (currentIndex - scrollStep + joueurs.length) % joueurs.length;
    renderCarousel();
  }, 500);
}

// Configuration du défilement automatique
function setupAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  
  // Défilement automatique seulement sur mobile
  if (isMobile) {
    autoSlideInterval = setInterval(slideNext, 3000);
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
    const newIsMobile = window.innerWidth <= 768;
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