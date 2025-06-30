// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const mainVideo = document.getElementById('main-video');
  const items = document.querySelectorAll('.video-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-video');
      const title = item.getAttribute('data-title');

      // Change la source de la vidéo principale
      mainVideo.src = src;

      // (Optionnel) mettre à jour un titre sous la vidéo principale
      let mainTitle = document.querySelector('.video-principale .video-main-title');
      if (!mainTitle) {
        mainTitle = document.createElement('div');
        mainTitle.className = 'video-main-title';
        mainTitle.style.cssText = 'color: var(--panthere-or); text-align:center; margin-top:5px;';
        document.querySelector('.video-principale').after(mainTitle);
      }
      mainTitle.textContent = title;
    });
  });
});
