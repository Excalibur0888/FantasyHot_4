document.addEventListener('DOMContentLoaded', () => {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        const progressText = card.querySelector('.progress-text');
        if (progressText) {
            const progress = parseFloat(progressText.textContent);
            const ring = card.querySelector('.progress-ring img');
            if (ring) {
                // Загружаем SVG как изображение
                ring.onload = function() {
                    // Получаем доступ к SVG документу
                    const svgDoc = ring.contentDocument;
                    if (svgDoc) {
                        const progressFill = svgDoc.querySelector('.progress-fill');
                        if (progressFill) {
                            const radius = 36; // Радиус из SVG
                            const circumference = radius * 2 * Math.PI;
                            const offset = circumference - (progress / 100 * circumference);
                            progressFill.style.strokeDasharray = `${circumference} ${circumference}`;
                            progressFill.style.strokeDashoffset = offset;
                        }
                    }
                };
            }
        }
    });
}); 