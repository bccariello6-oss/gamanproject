export const playKitchenAlert = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    
    // Play notes: A, E, G#
    osc.frequency.setValueAtTime(528, ctx.currentTime);      // A
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E
    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G#
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch (err) {
    console.error("Audio block or unsupported", err);
  }
};
