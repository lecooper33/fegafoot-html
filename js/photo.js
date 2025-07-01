// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img class="lightbox-content">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('figcaption').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});