import React, { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function OrderSuccess({ onComplete }: Props) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center p-6 text-center animate-[fadeInUp_0.5s_ease_out]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, rgba(139,26,26,0.15) 0%, transparent 70%)'
      }} />
      
      <div className="text-8xl md:text-9xl mb-8 animate-float mix-blend-screen opacity-90 filter drop-shadow-[0_0_15px_rgba(200,146,42,0.5)]">
        🎏
      </div>
      
      <h1 className="text-4xl md:text-6xl font-display text-cream mb-4 relative z-10">
        Pedido Enviado!
      </h1>
      
      <p className="text-xl md:text-2xl font-serif text-amber-dim italic max-w-lg mb-12 relative z-10">
        Sua solicitação chegou à cozinha. Em breve seu pedido chegará à mesa.
      </p>

      <div className="bg-secondary border border-amber-dim/20 rounded-xl p-8 mb-12 relative z-10 shadow-2xl">
        <p className="text-cream-dim mb-2 uppercase tracking-widest text-sm">Status</p>
        <p className="text-green-500 font-bold text-xl flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Em Preparo
        </p>
      </div>

      <button 
        onClick={onComplete}
        className="relative z-10 bg-transparent border border-cream hover:bg-cream hover:text-ink text-cream font-bold py-4 px-8 rounded-lg uppercase tracking-widest transition-colors flex items-center gap-3"
      >
        Fazer Novo Pedido
        <span className="text-amber-dim bg-card px-2 py-0.5 rounded text-xs">
          Auto em {seconds}s
        </span>
      </button>
    </div>
  );
}
