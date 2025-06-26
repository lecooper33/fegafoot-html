const matchs = [
  {
    equipes: "Gabon vs Cameroun",
    date: "30 Juin 2025",
    heure: "18h00",
    lieu: "Stade d'Angondjé",
    competition: "Match amical",
    icone: "stadium"
  },
  {
    equipes: "Gabon vs Maroc",
    date: "5 Juillet 2025",
    heure: "20h00",
    lieu: "Stade Omar Bongo",
    competition: "Éliminatoires CAN 2025",
    icone: "trophy"
  },
  {
    equipes: "Gabon (F) vs Sénégal (F)",
    date: "10 Juillet 2025",
    heure: "16h00",
    lieu: "Stade de Port-Gentil",
    competition: "Tournoi féminin UFA",
    icone: "whistle"
  },
  {
    equipes: "Gabon U23 vs Nigeria U23",
    date: "15 Juillet 2025",
    heure: "17h30",
    lieu: "Stade de Franceville",
    competition: "Qualifications JO 2028",
    icone: "olympics"
  },
  {
    equipes: "Gabon vs Côte d'Ivoire",
    date: "20 Juillet 2025",
    heure: "19h00",
    lieu: "Stade d'Angondjé",
    competition: "Match amical",
    icone: "friendly"
  }
];

// Icônes SVG
const icons = {
  stadium: '<svg viewBox="0 0 24 24"><path d="M12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/><path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.6 1.7 4.8 4 5.7V19H5v2h14v-2h-2v-5.3c2.3-.9 4-3.1 4-5.7V7c0-1.1-.9-2-2-2zm-4 8h-2v2H9v-2H7V9.9C5.3 9.5 4 7.9 4 6V7c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V6c0-1.9-1.3-3.5-3-3.9V13z"/></svg>',
  whistle: '<svg viewBox="0 0 24 24"><path d="M3 10h18v4H3z"/><path d="M10 5h4v2h-4z"/><path d="M11 16v-3h2v3z"/><path d="M16 14v2h4v-2z"/><path d="M4 14v2h4v-2z"/></svg>',
  olympics: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="3" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke-width="2"/><circle cx="19" cy="12" r="3" stroke-width="2"/></svg>',
  friendly: '<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/><path d="M7 9.5C7 8.1 8.1 7 9.5 7S12 8.1 12 9.5 10.9 12 9.5 12 7 10.9 7 9.5zm9 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5z"/></svg>'
};

let currentIndex = 0;
let autoSlideInterval;
const slideDuration = 5000; // 5 secondes

function afficherCalendrier() {
  const container = document.getElementById("matchs-container");
  const dotsContainer = document.querySelector(".carousel-dots");
  
  container.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  matchs.forEach((match, index) => {
    // Création des cartes
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="match-card-content">
        <h3>${match.equipes}</h3>
        <div class="match-info">
          ${icons[match.icone] || icons.stadium}
          <p><strong>Compétition :</strong> ${match.competition}</p>
        </div>
        <div class="match-info">
          ${icons.stadium}
          <p><strong>Lieu :</strong> ${match.lieu}</p>
        </div>
        <div class="match-info">
          ${icons.stadium.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 24" style="transform: rotate(90deg)"')}
          <p><strong>Date :</strong> ${match.date} à ${match.heure}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
    
    // Création des dots
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });
  
  // Navigation
  document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
  
  document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  
  // Carousel automatique
  startAutoSlide();
  
  // Redimensionnement
  window.addEventListener('resize', updateTrackPosition);
}

function updateTrackPosition() {
  const track = document.querySelector('.matchs-track');
  const cardWidth = document.querySelector('.match-card').offsetWidth + 32; // + gap
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function goToSlide(index) {
  currentIndex = index;
  updateTrackPosition();
  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % matchs.length;
  updateTrackPosition();
  updateDots();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + matchs.length) % matchs.length;
  updateTrackPosition();
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, slideDuration);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialisation
document.addEventListener('DOMContentLoaded', afficherCalendrier);