let audioCtx;
const getAudioContext = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};




let lastClickTime = 0;
const playClickSound = () => {
    const now = Date.now();
    // Sound duration is roughly 350ms. Prevent overlap if already playing.
    if (now - lastClickTime < 370) return;
    lastClickTime = now;

    try {
        const ctx = getAudioContext();
        const t = ctx.currentTime + 0.02;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Classic coin sound
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, t);
        osc.frequency.setValueAtTime(1318.51, t + 0.08); 
        
        // Attack/Release envelope
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
        gain.gain.setValueAtTime(0.05, t + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(t);
        osc.stop(t + 0.35);
    } catch(e) {}
};

// Global Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    
    // Attach click sound to all interactive elements
    document.addEventListener("mousedown", (e) => {
        const target = e.target.closest("a, button, input[type='submit'], input[type='button'], .click-sound");
        if (target) {
            playClickSound();
        }
    });
});
