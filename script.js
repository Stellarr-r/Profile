// script.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const starCount = 100;
    const avatarContainer = document.querySelector('.avatar-container');
    const particleCount = 10;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Create stars
    for (let i = 0; i < starCount; i++) {
        createStar();
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 4 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        // Position in pixels within viewport
        const baseX = Math.random() * viewportWidth;
        const baseY = Math.random() * viewportHeight;
        star.style.left = `${baseX}px`;
        star.style.top = `${baseY}px`;
        const duration = Math.random() * 2 + 1;
        star.style.animationDuration = `${duration}s`;
        // Store base position in pixels
        star.dataset.baseX = baseX;
        star.dataset.baseY = baseY;
        star.dataset.offsetX = 0;
        star.dataset.offsetY = 0;
        container.appendChild(star);
    }

    // Orbiting Particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        avatarContainer.appendChild(particle);
    }

    let angle = 0;
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const radius = 70;
            const speed = 0.02 + index * 0.005;
            const x = Math.cos(angle + index * (Math.PI * 2 / particleCount)) * radius;
            const y = Math.sin(angle + index * (Math.PI * 2 / particleCount)) * radius;
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
        });
        angle += 0.02;
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Mouse interaction with stars
    container.addEventListener('mousemove', (e) => {
        const stars = document.querySelectorAll('.star'); // Only target .star elements
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        stars.forEach(star => {
            const rect = star.getBoundingClientRect();
            const starX = rect.left + rect.width / 2;
            const starY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2)
            );

            if (distance < 150) {
                const scale = Math.max(1, 5 - distance / 30);
                star.style.transform = `scale(${scale})`;
                star.style.boxShadow = `0 0 ${scale * 20}px rgba(138, 43, 226, ${scale / 2})`;

                // Calculate movement
                const angle = Math.atan2(starY - mouseY, starX - mouseX);
                const moveX = Math.cos(angle) * (150 - distance) * 0.2;
                const moveY = Math.sin(angle) * (150 - distance) * 0.2;

                // Update position
                star.dataset.offsetX = moveX;
                star.dataset.offsetY = moveY;
                const newX = parseFloat(star.dataset.baseX) + moveX;
                const newY = parseFloat(star.dataset.baseY) + moveY;
                star.style.left = `${newX}px`;
                star.style.top = `${newY}px`;

                // Create trail with .trail class
                const trail = document.createElement('div');
                trail.classList.add('trail');
                trail.style.width = '2px';
                trail.style.height = '2px';
                trail.style.left = `${starX}px`;
                trail.style.top = `${starY}px`;
                container.appendChild(trail);
                setTimeout(() => trail.remove(), 300);
            } else {
                // Reset to base position
                star.style.transform = 'scale(1)';
                star.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
                star.dataset.offsetX = 0;
                star.dataset.offsetY = 0;
                star.style.left = `${star.dataset.baseX}px`;
                star.style.top = `${star.dataset.baseY}px`;
            }
        });
    });

    // Debug: Check if stars are created
    console.log(`Number of stars created: ${document.querySelectorAll('.star').length}`);
});
