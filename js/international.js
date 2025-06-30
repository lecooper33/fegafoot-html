// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav ul');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Animation des cartes
  const cards = document.querySelectorAll('.competition-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
  });

  // Animation au scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.competition-card, .section-title, .legend-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial state for animation
  const competitionCards = document.querySelectorAll('.competition-card');
  const legendCards = document.querySelectorAll('.legend-card');
  const sectionTitles = document.querySelectorAll('.section-title');
  
  competitionCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  legendCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
  });
  
  sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Initial check
  animateOnScroll();

  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Gestion des tabs (onglets)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Désactive tous les boutons et contenus
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      // Active le bouton et le contenu correspondant
      this.classList.add('active');
      const tab = this.getAttribute('data-tab');
      document.getElementById(tab).classList.add('active');
    });
  });
});