import React from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-primary cursor-pointer overscroll-none"
      onClick={onComplete}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, rgba(200,146,42,0.1) 0%, transparent 60%)'
      }} />
      
      <div className="kanji-watermark">我慢</div>
      
      <div className="relative z-10 flex flex-col items-center animate-[fadeInUp_1s_ease_forwards]">
        <h1 className="font-display text-5xl md:text-7xl tracking-[0.2em] mb-1 text-cream">GAMAN</h1>
        <div className="text-amber uppercase tracking-[0.5em] text-sm md:text-base font-sans font-bold mb-6">
          Sushi Lounge
        </div>
        <p className="font-display text-cream-dim text-lg md:text-xl italic mb-12">
          "A culinária oriental além do que você já conhece"
        </p>
        
        <button 
          className="mt-8 px-8 py-3 bg-crimson font-sans text-cream uppercase tracking-widest text-sm transition-transform active:scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-crimson-light/20"
          onClick={onComplete}
        >
          Explorar Cardápio
        </button>
      </div>
    </div>
  );
}
