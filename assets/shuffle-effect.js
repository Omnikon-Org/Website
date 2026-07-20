import gsap from 'https://cdn.skypack.dev/gsap';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Utility to generate a random character
const randomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*+<>{}";
    return chars[Math.floor(Math.random() * chars.length)];
};

document.addEventListener('DOMContentLoaded', () => {
    // Select all main headings to apply the shuffle effect to
    const targets = document.querySelectorAll('h1, h2, .shuffle-text');
    
    targets.forEach(target => {
        // Skip elements that have children (to avoid breaking nested HTML like spans/icons)
        if (target.children.length > 0 && !target.classList.contains('force-shuffle')) return;
        
        const originalText = target.innerText;
        if (!originalText.trim()) return;

        // Ensure element maintains layout during animation
        target.dataset.original = originalText;
        
        ScrollTrigger.create({
            trigger: target,
            start: "top 90%", // Trigger slightly before it comes into view
            onEnter: () => shuffleAnimate(target, originalText),
            once: true // Only animate once
        });

        // Optional: Re-trigger on hover if you want
        target.addEventListener('mouseenter', () => {
            if(!target.isAnimating) {
                shuffleAnimate(target, originalText);
            }
        });
    });
});

function shuffleAnimate(element, originalText) {
    element.isAnimating = true;
    let iteration = 0;
    const maxIterations = 15; // Number of scramble frames
    const length = originalText.length;
    
    // We use a simple setInterval to scramble the text
    const interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((char, index) => {
                if (char === " ") return " ";
                if (index < (iteration / maxIterations) * length) {
                    return originalText[index];
                }
                return randomChar();
            })
            .join("");
        
        iteration++;
        
        if (iteration > maxIterations) {
            clearInterval(interval);
            element.innerText = originalText; // Ensure exact match at the end
            element.isAnimating = false;
        }
    }, 40); // speed of frame updates
}
