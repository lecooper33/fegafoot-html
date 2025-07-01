
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    function animateStats() {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(sectionPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const speed = 10000;
                const count = parseInt(stat.innerText);
                const increment = target / speed;
                
                if(count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(animateStats, 1);
                } else {
                    stat.innerText = target;
                }
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
