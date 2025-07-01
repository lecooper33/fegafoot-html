// Données des actualités
const actualites = [
    {
        id: 1,
        titre: "Victoire historique contre le Cameroun",
        texte: "Les Panthères du Gabon ont créé la surprise en battant les Lions Indomptables 2-1 lors du match amical.",
        date: "28 Juin 2025",
        image: "actu-image/gabon-vs-camer.avif",
        contenu: "Dans un stade d'Angondjé en effervescence, les Panthères du Gabon ont offert une prestation remarquable pour battre leurs voisins camerounais. Les buts ont été marqués par Aubameyang (23e) et Bouanga (67e). Cette victoire marque un tournant pour la sélection gabonaise qui prépare activement les éliminatoires de la CAN 2025. Le sélectionneur a salué 'l'esprit combatif et la discipline tactique' de son équipe."
    },
    {
        id: 2,
        titre: "Aubameyang nommé sélectionneur",
        texte: "La Fégafoot officialise la nomination de la légende gabonaise comme nouveau sélectionneur national.",
        date: "20 Juin 2025",
        image: "img/aubame.jpg",
        contenu: "Pierre-Emerick Aubameyang, légende du football gabonais, prend officiellement les rênes de la sélection nationale. Lors d'une conférence de presse émouvante, l'ancien attaquant a déclaré : 'C'est l'honneur de ma vie de pouvoir servir mon pays dans ce rôle.' Son contrat court jusqu'à la Coupe du Monde 2026 avec pour objectif principal la qualification. Il succède à Patrice Neveu qui n'avait pas renoué son bail."
    },
    {
        id: 3,
        titre: "Stage intensif des U17",
        texte: "Les espoirs du football gabonais entament un stage de préparation de 2 semaines à Libreville.",
        date: "15 Juin 2025",
        image: "actu-image/U17-1.jpeg",
        contenu: "25 jeunes joueurs ont été convoqués pour un stage intensif en vue du prochain championnat d'Afrique junior. Le sélectionneur des U17, Jean-Claude Darcheville, a insisté sur l'importance de ce rassemblement : 'Nous voulons construire une génération compétitive qui pourra intégrer l'équipe A dans les années à venir.' Le programme inclut des séances techniques le matin et des matchs amicaux l'après-midi."
    },
    {
        id: 4,
        titre: "Tournée des féminines en Afrique",
        texte: "L'équipe féminine A entame une tournée de 3 matchs contre le Nigeria, le Ghana et la Côte d'Ivoire.",
        date: "10 Juin 2025",
        image: "img/feminines.jpeg",
        contenu: "Le football féminin gabonais vit un moment historique avec cette première tournée internationale. Face à trois des meilleures équipes du continent, les Panthères féminines vont pouvoir mesurer leur niveau. La sélectionneuse a convoqué 23 joueuses, dont 8 évoluant à l'étranger. 'Ces matchs sont cruciaux pour notre développement', a-t-elle déclaré avant le départ."
    },
    {
        id: 5,
        titre: "Nouveau centre de formation",
        texte: "Inauguration du Centre d'Excellence des Panthères à Libreville.",
        date: "5 Juin 2025",
        image: "actu-image/centre.jpg",
        contenu: "Le Gabon se dote d'un centre de formation ultramoderne dédié au football. Financé en partie par la FIFA, ce complexe de 15 hectares comprend 4 terrains, un internat et un centre médical. 'C'est un rêve qui se réalise pour le football gabonais', a déclaré le président de la Fégafoot. Les premières promotions accueilleront 120 jeunes dès la rentrée prochaine."
    },
    {
        id: 6,
        titre: "Match amical contre le Maroc",
        texte: "Les Panthères affronteront les Lions de l'Atlas le 30 Juin à Rabat.",
        date: "1er Juin 2025",
        image: "actu-image/gabon-vs-maroc.jpg",
        contenu: "Dans le cadre de leur préparation pour les éliminatoires de la CAN, les Panthères du Gabon disputeront un match amical contre le Maroc. Le sélectionneur a convoqué une liste élargie de 30 joueurs pour cette rencontre qui se déroulera au complexe sportif Prince Moulay Abdellah. 'C'est une belle occasion de jauger notre niveau face à une équipe de haut niveau', a-t-il déclaré."
    }
];

// Variables pour le slider
let currentSlide = 0;
let slideInterval;
const slideDuration = 7000; // 7 secondes

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Affiche la version desktop
    afficherDesktopView();
    
    // Affiche la version mobile (slider)
    afficherMobileSlider();
    
    // Détecte le redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 900) {
            clearInterval(slideInterval);
            initSlider();
        } else {
            clearInterval(slideInterval);
        }
    });
    
    // Initialise le slider si on est en mobile au chargement
    if (window.innerWidth <= 900) {
        initSlider();
    }
});

// Affiche la version desktop
function afficherDesktopView() {
    // Affiche la première actualité comme principale
    afficherActuPrincipale(actualites[0]);
    
    // Affiche la liste des autres actualités
    const listeContainer = document.getElementById('liste-actus');
    listeContainer.innerHTML = '';
    
    actualites.slice(1).forEach(actu => {
        const item = document.createElement('div');
        item.className = 'actu-item';
        item.innerHTML = `
            <h4>${actu.titre}</h4>
            <p>${actu.texte}</p>
            <div class="date">${actu.date}</div>
        `;
        
        item.addEventListener('click', () => {
            afficherActuPrincipale(actu);
        });
        
        listeContainer.appendChild(item);
    });
}

// Affiche une actualité dans le conteneur principal (desktop)
function afficherActuPrincipale(actu) {
    const container = document.getElementById('actu-principale');
    container.innerHTML = `
        <img src="${actu.image}" alt="${actu.titre}">
        <h3>${actu.titre}</h3>
        <div class="date">${actu.date}</div>
        <div class="contenu">${actu.contenu}</div>
    `;
}

// Slider mobile actualités
let actuCurrentSlide = 0;
let actuSlideInterval;
const actuSlideDuration = 5000;

function afficherMobileSlider() {
    const sliderContainer = document.getElementById('actualites-slider-container');
    const dotsContainer = document.getElementById('actualites-slider-dots');
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    actualites.forEach((actu, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <img src="${actu.image}" alt="${actu.titre}">
            <h3>${actu.titre}</h3>
            <div class="date">${actu.date}</div>
            <div class="contenu">${actu.contenu}</div>
        `;
        if (index === 0) slide.classList.add('active');
        sliderContainer.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToActuSlide(index));
        dotsContainer.appendChild(dot);
    });

    actuCurrentSlide = 0;
    startActuSlider();
}

function startActuSlider() {
    clearInterval(actuSlideInterval);
    actuSlideInterval = setInterval(() => {
        nextActuSlide();
    }, actuSlideDuration);
}

function nextActuSlide() {
    const slides = document.querySelectorAll('#actualites-slider-container .slide');
    const dots = document.querySelectorAll('#actualites-slider-dots .dot');
    slides[actuCurrentSlide].classList.remove('active');
    dots[actuCurrentSlide].classList.remove('active');
    actuCurrentSlide = (actuCurrentSlide + 1) % slides.length;
    slides[actuCurrentSlide].classList.add('active');
    dots[actuCurrentSlide].classList.add('active');
}

function goToActuSlide(index) {
    const slides = document.querySelectorAll('#actualites-slider-container .slide');
    const dots = document.querySelectorAll('#actualites-slider-dots .dot');
    slides[actuCurrentSlide].classList.remove('active');
    dots[actuCurrentSlide].classList.remove('active');
    actuCurrentSlide = index;
    slides[actuCurrentSlide].classList.add('active');
    dots[actuCurrentSlide].classList.add('active');
    startActuSlider();
}