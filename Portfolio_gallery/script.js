// Optional: Add any interactive features here, like lightbox effect or modal popups

// Example: Lightbox functionality (simplified version)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const overlay = item.querySelector('.overlay');
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 2000);
    });
});
