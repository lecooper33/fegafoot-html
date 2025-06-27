document.addEventListener('DOMContentLoaded', function() {
    const matches = [
        {
            id: 1,
            title: "AS Mangasport vs CMS",
            date: "15/06/2024",
            equipeA: {
                nom: "AS Mangasport",
                logo: "https://via.placeholder.com/50/006B3D/FFFFFF?text=AM"
            },
            equipeB: {
                nom: "CMS",
                logo: "https://via.placeholder.com/50/0056B8/FFFFFF?text=CMS"
            },
            stade: "Stade Pierre-Claver Divounguy",
            ville: "Oyem",
            heure: "15h30",
            competition: "Ligue 1"
        },
        {
            id: 2,
            title: "US Bitam vs AS Pélican",
            date: "16/06/2024",
            equipeA: {
                nom: "US Bitam",
                logo: "https://via.placeholder.com/50/FFD700/000000?text=USB"
            },
            equipeB: {
                nom: "AS Pélican",
                logo: "https://via.placeholder.com/50/FFFFFF/006B3D?text=PEL"
            },
            stade: "Stade Gaston Peyrille",
            ville: "Bitam",
            heure: "16h00",
            competition: "Ligue 1"
        },
        {
            id: 3,
            title: "AS Stade Mandji vs Sogéa",
            date: "22/06/2024",
            equipeA: {
                nom: "AS Stade Mandji",
                logo: "https://via.placeholder.com/50/0056B8/FFFFFF?text=ASM"
            },
            equipeB: {
                nom: "Sogéa FC",
                logo: "https://via.placeholder.com/50/FFFFFF/1A1A1A?text=SOG"
            },
            stade: "Stade Pierre-Claver Divounguy",
            ville: "Port-Gentil",
            heure: "17h00",
            competition: "Coupe"
        },
        {
            id: 4,
            title: "Missile FC vs AS Bouenguidi",
            date: "23/06/2024",
            equipeA: {
                nom: "Missile FC",
                logo: "https://via.placeholder.com/50/FFD700/0056B8?text=MIS"
            },
            equipeB: {
                nom: "AS Bouenguidi",
                logo: "https://via.placeholder.com/50/FFFFFF/1A1A1A?text=BOU"
            },
            stade: "Stade de l'Amitié",
            ville: "Libreville",
            heure: "14h30",
            competition: "Ligue 1"
        },
        {
            id: 5,
            title: "AS Mangasport vs USM Libreville",
            date: "29/06/2024",
            equipeA: {
                nom: "AS Mangasport",
                logo: "https://via.placeholder.com/50/006B3D/FFFFFF?text=AM"
            },
            equipeB: {
                nom: "USM Libreville",
                logo: "https://via.placeholder.com/50/1A1A1A/FFFFFF?text=USM"
            },
            stade: "Stade de Franceville",
            ville: "Franceville",
            heure: "15h00",
            competition: "CAF"
        }
    ];

    // Éléments du DOM
    const desktopView = document.getElementById('matchs-desktop-view');
    const sliderContainer = document.getElementById('matchs-slider-container');
    const dotsContainer = document.getElementById('matchs-slider-dots');
    const filterButtons = document.querySelectorAll('.btn-filtre');
    
    // Variables pour le slider
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 secondes
    let filteredMatches = [];

    // Variables pour le slider mobile des matchs
    let matchCurrentSlide = 0;
    let matchSlideInterval;
    const matchSlideDuration = 5000;

    // Initialisation
    function init() {
        displayDesktopView(matches);
        displayMobileSlider(matches);
        setupEventListeners();
        
        if (window.innerWidth <= 900) {
            afficherMobileMatchSlider();
            initSlider();
        }
    }

    // Affiche la version desktop
    function displayDesktopView(matchesToDisplay) {
        desktopView.innerHTML = '';
        
        matchesToDisplay.forEach(match => {
            const matchCard = createMatchCard(match);
            desktopView.appendChild(matchCard);
        });
    }

    // Affiche la version mobile (slider)
    function displayMobileSlider(matchesToDisplay) {
        sliderContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        filteredMatches = matchesToDisplay;
        
        if (filteredMatches.length === 0) {
            sliderContainer.innerHTML = `
                <div class="no-matches">
                    <iconify-icon icon="mdi:alert-circle-outline" style="font-size: 2rem; color: var(--panthere-or)"></iconify-icon>
                    <p>Aucun match à afficher</p>
                </div>
            `;
            return;
        }

        filteredMatches.forEach((match, index) => {
            // Crée les slides
            const slide = document.createElement('div');
            slide.className = 'match-slide';
            slide.innerHTML = `
                <div class="info-match">
                    <h4 class="match-title">
                        ${match.title}
                        <span class="competition">${match.competition}</span>
                    </h4>
                    
                    <div class="equipes">
                        <div class="equipe">
                            <img src="${match.equipeA.logo}" alt="${match.equipeA.nom}">
                            <span>${match.equipeA.nom}</span>
                        </div>
                        <span class="vs">VS</span>
                        <div class="equipe">
                            <img src="${match.equipeB.logo}" alt="${match.equipeB.nom}">
                            <span>${match.equipeB.nom}</span>
                        </div>
                    </div>
                    
                    <ul>
                        <li class="match">
                            <span><iconify-icon icon="mdi:calendar"></iconify-icon> Date: </span>
                            ${match.date}
                        </li>
                        <li class="match">
                            <span><iconify-icon icon="mdi:stadium"></iconify-icon> Stade: </span>
                            ${match.stade} <small>(${match.ville})</small>
                        </li>
                        <li class="match">
                            <span><iconify-icon icon="mdi:clock-time-four-outline"></iconify-icon> Heure: </span>
                            ${match.heure}
                        </li>
                    </ul>
                </div>
            `;
            sliderContainer.appendChild(slide);
            
            // Crée les points de navigation
            const dot = document.createElement('div');
            dot.className = 'match-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Crée une carte de match
    function createMatchCard(match) {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="info-match">
                <h4 class="match-title">
                    ${match.title}
                    <span class="competition">${match.competition}</span>
                </h4>
                
                <div class="equipes">
                    <div class="equipe">
                        <img src="${match.equipeA.logo}" alt="${match.equipeA.nom}">
                        <span>${match.equipeA.nom}</span>
                    </div>
                    <span class="vs">VS</span>
                    <div class="equipe">
                        <img src="${match.equipeB.logo}" alt="${match.equipeB.nom}">
                        <span>${match.equipeB.nom}</span>
                    </div>
                </div>
                
                <ul>
                    <li class="match">
                        <span><iconify-icon icon="mdi:calendar"></iconify-icon> Date: </span>
                        ${match.date}
                    </li>
                    <li class="match">
                        <span><iconify-icon icon="mdi:stadium"></iconify-icon> Stade: </span>
                        ${match.stade} <small>(${match.ville})</small>
                    </li>
                    <li class="match">
                        <span><iconify-icon icon="mdi:clock-time-four-outline"></iconify-icon> Heure: </span>
                        ${match.heure}
                    </li>
                </ul>
            </div>
        `;
        return card;
    }

    // Initialise le slider mobile
    function initSlider() {
        // Gestion du glissement tactile
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            slideInterval = setInterval(nextSlide, slideDuration);
        }, {passive: true});
        
        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            }
        }
        
        // Défilement automatique
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Passe au slide suivant
    function nextSlide() {
        if (filteredMatches.length === 0) return;
        currentSlide = (currentSlide + 1) % filteredMatches.length;
        updateSlider();
    }

    // Retourne au slide précédent
    function prevSlide() {
        if (filteredMatches.length === 0) return;
        currentSlide = (currentSlide - 1 + filteredMatches.length) % filteredMatches.length;
        updateSlider();
    }

    // Va à un slide spécifique
    function goToSlide(index) {
        if (filteredMatches.length === 0) return;
        currentSlide = index;
        updateSlider();
    }

    // Met à jour l'affichage du slider
    function updateSlider() {
        const slides = document.querySelectorAll('.match-slide');
        const dots = document.querySelectorAll('.match-dot');
        
        if (slides.length === 0) return;
        
        // Met à jour la position du slider
        sliderContainer.scrollTo({
            left: slides[currentSlide].offsetLeft,
            behavior: 'smooth'
        });
        
        // Met à jour les points de navigation
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Réinitialise le timer d'auto-défilement
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Affiche le slider mobile des matchs
    function afficherMobileMatchSlider() {
        const sliderContainer = document.getElementById('matchs-slider-container');
        const dotsContainer = document.getElementById('matchs-slider-dots');
        sliderContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        matches.forEach((match, index) => {
            const slide = document.createElement('div');
            slide.className = 'match-slide';
            slide.innerHTML = `
                <img src="${match.equipeA.logo}" alt="${match.equipeA.nom}">
                <span class="vs">VS</span>
                <img src="${match.equipeB.logo}" alt="${match.equipeB.nom}">
                <h3>${match.title}</h3>
                <div class="competition">${match.competition}</div>
                <div class="date">${match.date}</div>
                <div class="heure">${match.heure}</div>
                <div class="lieu">${match.stade}, ${match.ville}</div>
            `;
            if (index === 0) slide.classList.add('active');
            sliderContainer.appendChild(slide);

            const dot = document.createElement('span');
            dot.className = 'match-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToMatchSlide(index));
            dotsContainer.appendChild(dot);
        });

        matchCurrentSlide = 0;
        startMatchSlider();
    }

    function startMatchSlider() {
        clearInterval(matchSlideInterval);
        matchSlideInterval = setInterval(() => {
            nextMatchSlide();
        }, matchSlideDuration);
    }
    function nextMatchSlide() {
        const slides = document.querySelectorAll('#matchs-slider-container .match-slide');
        const dots = document.querySelectorAll('#matchs-slider-dots .match-dot');
        slides[matchCurrentSlide].classList.remove('active');
        dots[matchCurrentSlide].classList.remove('active');
        matchCurrentSlide = (matchCurrentSlide + 1) % slides.length;
        slides[matchCurrentSlide].classList.add('active');
        dots[matchCurrentSlide].classList.add('active');
    }
    function goToMatchSlide(index) {
        const slides = document.querySelectorAll('#matchs-slider-container .match-slide');
        const dots = document.querySelectorAll('#matchs-slider-dots .match-dot');
        slides[matchCurrentSlide].classList.remove('active');
        dots[matchCurrentSlide].classList.remove('active');
        matchCurrentSlide = index;
        slides[matchCurrentSlide].classList.add('active');
        dots[matchCurrentSlide].classList.add('active');
        startMatchSlider();
    }

    // Configure les écouteurs d'événements
    function setupEventListeners() {
        // Filtres
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const competition = button.dataset.competition;
                let matchesToDisplay;
                
                if (competition === 'all') {
                    matchesToDisplay = matches;
                } else {
                    matchesToDisplay = matches.filter(match => match.competition === competition);
                }
                
                displayDesktopView(matchesToDisplay);
                displayMobileSlider(matchesToDisplay);
                
                if (window.innerWidth <= 900) {
                    currentSlide = 0;
                    updateSlider();
                }
            });
        });
        
        // Redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 900) {
                clearInterval(slideInterval);
                initSlider();
            } else {
                clearInterval(slideInterval);
            }
        });
    }

    // Initialise l'application
    init();
});