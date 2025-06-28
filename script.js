// Menu burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

// Sous-menus sur mobile
document.querySelectorAll('.has-submenu > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 700) {
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    }
  });
});

// Animation header : cacher au scroll vers le bas, montrer au scroll vers le haut
let lastScroll = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 50) {
    // Scroll vers le bas
    header.classList.add('hide');
  } else {
    // Scroll vers le haut
    header.classList.remove('hide');
  }
  lastScroll = currentScroll;
});

// Transparence du header quand on est en haut de la page
function updateHeaderTransparency() {
  if (window.scrollY < 10) {
    header.classList.add('header-transparent');
  } else {
    header.classList.remove('header-transparent');
  }
}
window.addEventListener('scroll', updateHeaderTransparency);
window.addEventListener('DOMContentLoaded', updateHeaderTransparency);