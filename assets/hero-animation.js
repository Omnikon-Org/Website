import gsap from 'gsap';

export function initHeroAnimation() {
    const container = document.getElementById('omnikon-hero-animation-container');
    if (!container) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        gsap.set('.omnikon-letter-fill', { clipPath: 'inset(0 0% 0 0)' });
        gsap.set('.omnikon-letter', { '-webkit-text-stroke': '1px rgba(220, 38, 38, 0.2)' });
        return;
    }

    initParticles();

    const tl = gsap.timeline({ delay: 0.3 });
    const fills = document.querySelectorAll('.omnikon-letter-fill');
    const glows = document.querySelectorAll('.omnikon-letter-glow');
    
    // Animate the clip-path to sweep from left to right for each letter
    tl.to(fills, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.6,
        ease: 'power4.out',
        stagger: 0.15
    });

    // Add subtle red glow and embers as each letter fills
    tl.to(glows, {
        '-webkit-text-stroke': '1px rgba(220, 38, 38, 0.6)',
        filter: 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    }, "<0.1");

    // Transition to matte black with deep crimson gradient
    tl.to(fills, {
        backgroundPosition: '100% 100%', 
        duration: 1.5,
        ease: 'power2.inOut',
    }, ">-0.5");
    
    // Add soft red edge glow after completion (reducing the bright glow)
    tl.to(glows, {
        '-webkit-text-stroke': '1px rgba(220, 38, 38, 0.2)',
        filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.3))',
        duration: 1,
        ease: 'power2.inOut'
    }, "<");

    // Infinite Shine Animation every 8-10s
    gsap.to(fills, {
        backgroundPosition: '0% 0%',
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        repeatDelay: 8,
        yoyo: true,
        delay: tl.duration() // Start after the intro finishes
    });
}

function initParticles() {
    const canvas = document.getElementById('omnikon-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Create high DPI canvas
    const dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    
    resize();
    
    const particles = [];
    const colors = ['#DC2626', '#991B1B', '#ff4d4d'];

    // 40 particles for subtle effect
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.4 - 0.1, 
            alpha: Math.random() * 0.5 + 0.1
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(render);
    }
    
    window.addEventListener('resize', resize);
    render();
}

document.addEventListener('DOMContentLoaded', initHeroAnimation);
