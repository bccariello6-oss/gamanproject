import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartBar({ onOpen }: { onOpen: () => void }) {
  const { state, dispatch } = useCart();
  
  if (state.items.length === 0) return null;
  
  const numItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 pb-6 md:pb-8 flex flex-col items-center justify-center animate-[fadeInUp_0.4s_ease_out] gap-3">
      <button 
        onClick={() => dispatch({ type: 'CLEAR' })}
        className="text-xs text-cream-dim hover:text-crimson-light uppercase tracking-widest font-bold flex items-center gap-1 bg-ink/80 px-3 py-1 rounded-full backdrop-blur transition-colors border border-ink"
      >
        <span>✕</span> Começar de novo
      </button>

      <button 
        onClick={onOpen}
        className="w-full max-w-3xl bg-secondary border border-amber/30 p-4 rounded-xl flex items-center justify-between shadow-[0_-4px_32px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform hover:-translate-y-1 active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          <div className="bg-crimson text-cream w-10 h-10 rounded-full flex items-center justify-center font-bold font-sans text-xl border border-crimson-light/50">
            <span className="leading-none pt-[2px]">{state.items.length}</span>
          </div>
          <div className="text-left">
            <span className="block text-cream-dim text-sm uppercase tracking-widest font-bold">Ver Resumo</span>
            <span className="font-serif italic text-amber text-2xl leading-none">{numItems} opções selecionadas</span>
          </div>
        </div>
        
        <div className="bg-amber text-ink px-6 py-2 rounded font-bold tracking-widest uppercase text-sm">
          Avançar →
        </div>
      </button>
    </div>
  );
}
