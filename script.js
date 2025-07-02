const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const submenuToggles = document.querySelectorAll('.submenu-toggle');

// Toggle menu mobile
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

// Toggle sous-menu
submenuToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    const parent = toggle.closest('.has-submenu');
    parent.classList.toggle('show');

    // Ferme les autres sous-menus
    document.querySelectorAll('.has-submenu').forEach(item => {
      if (item !== parent) item.classList.remove('show');
    });

    e.stopPropagation();
  });
});

// Ferme sous-menus si clic à l'extérieur
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    document.querySelectorAll('.has-submenu').forEach(item => {
      item.classList.remove('show');
    });
  }
});

// Gestion de l'affichage du header selon le scroll
let lastScroll = 0;
const header = document.querySelector('header');
let hideHeaderTimeout = null;
let lastDirection = null;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    header.classList.remove('hide');
    header.classList.add('transparent');
    lastDirection = null;
    if (hideHeaderTimeout) {
      clearTimeout(hideHeaderTimeout);
      hideHeaderTimeout = null;
    }
    return;
  }
  header.classList.remove('transparent');
  if (currentScroll > lastScroll) {
    // Scroll vers le bas : cacher le header
    header.classList.add('hide');
    lastDirection = 'down';
    if (hideHeaderTimeout) {
      clearTimeout(hideHeaderTimeout);
      hideHeaderTimeout = null;
    }
  } else {
    // Scroll vers le haut : montrer le header
    header.classList.remove('hide');
    if (lastDirection !== 'up') {
      lastDirection = 'up';
    }
    if (hideHeaderTimeout) {
      clearTimeout(hideHeaderTimeout);
    }
    hideHeaderTimeout = setTimeout(() => {
      // Si on n'a pas rescrollé vers le haut, cacher le header
      if (lastDirection === 'up') {
        header.classList.add('hide');
      }
    }, 4000);
  }
  lastScroll = currentScroll;
});
