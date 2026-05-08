import React, { useState, useEffect, useRef } from 'react';
import { MENU_DATA } from '../data/menuData';
import { MenuItem } from '../types';
import CartBar from '../components/CartBar';
import CartModal from '../components/CartModal';
import OrderSuccess from '../components/OrderSuccess';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabase';

const ToriiGate = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Top curved roof */}
    <path d="M2 7c5 -1 15 -1 20 0" />
    {/* Upper crossbar */}
    <path d="M4 11h16" />
    {/* Left pillar */}
    <path d="M7 7v14" />
    {/* Right pillar */}
    <path d="M17 7v14" />
    {/* Center brace */}
    <path d="M12 7v4" />
    {/* Base plates */}
    <path d="M5 21h4" />
    <path d="M15 21h4" />
  </svg>
);

export default function MenuApp() {
  const [activeCategory, setActiveCategory] = useState(MENU_DATA.categories[0].id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('gaman_last_order');
    if (saved) {
      try {
        setLastOrder(JSON.parse(saved));
      } catch (e) {}
    }
  }, [isSuccessOpen]); // Refresh when an order is completed
  
  const { state, dispatch } = useCart();
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find the category currently in view
      if (isScrollingRef.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentActiveId = activeCategory;
      for (const category of MENU_DATA.categories) {
        const element = categoryRefs.current[category.id];
        if (element && element.offsetTop <= scrollPosition) {
          currentActiveId = category.id;
        }
      }
      
      if (currentActiveId !== activeCategory) {
        setActiveCategory(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    isScrollingRef.current = true;
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    } else {
      isScrollingRef.current = false;
    }
  };

  const handleOrderSubmit = async (tableNumber: string, observations: string) => {
    const { error } = await supabase.from('gaman_orders').insert({
      table: parseInt(tableNumber, 10) || 0,
      items: state.items.map(i => ({
         name: i.name,
         qty: i.quantity,
         obs: observations
      }))
    });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    // Clear cart and show success
    setIsCartOpen(false);
    setIsSuccessOpen(true);
    dispatch({ type: 'CLEAR' });
  };

  if (isSuccessOpen) {
    return <OrderSuccess onComplete={() => {
      setIsSuccessOpen(false);
      // Refresh history state
      const saved = localStorage.getItem('gaman_last_order');
      if (saved) setLastOrder(JSON.parse(saved));
    }} />;
  }

  const handleRepeatLastOrder = () => {
    if (lastOrder.length > 0) {
      lastOrder.forEach(item => {
        dispatch({ type: 'SET_QTY', payload: { item, quantity: item.quantity } });
      });
      setShowHistory(false);
      setIsCartOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-primary">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 fixed h-screen flex-col bg-secondary border-r border-amber-dim/20 pt-8 pb-8 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="px-8 mb-8 flex flex-col items-start gap-1 shrink-0 relative w-full">
          <button 
            onClick={() => {
              window.location.hash = '#/';
              if (window.location.hash === '#/') window.location.reload();
            }} 
            className="absolute right-6 top-1 text-cream-dim hover:text-amber transition-all flex items-center justify-center border border-transparent hover:border-amber/30 rounded-full w-10 h-10 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] bg-primary/20 hover:bg-primary/50"
            title="Voltar ao Início"
          >
            <ToriiGate className="w-5 h-5" />
          </button>
          <h2 className="font-display text-crimson text-3xl tracking-widest uppercase">Gaman</h2>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-amber font-bold">Sushi Lounge</span>
        </div>
        <nav className="relative flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar pb-4 gap-1.5">
          {MENU_DATA.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`w-full text-left px-8 py-1.5 flex flex-col transition-colors relative ${
                activeCategory === cat.id ? 'text-cream' : 'text-cream-dim hover:text-cream/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg opacity-60 font-display">{cat.kanji}</span>
                <span className="uppercase tracking-[0.1em] text-xs font-medium">{cat.label}</span>
              </div>
              
              {/* Active Indication Line */}
              {activeCategory === cat.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson shadow-[0_0_8px_rgba(139,26,26,0.8)] transition-all duration-300" />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* MOBILE HEADER & NAV - Full mobile support */}
      <div className="md:hidden fixed top-0 w-full bg-secondary border-b border-amber-dim/20 z-30 flex flex-col shadow-lg">
        <div className="p-3 flex flex-col items-center justify-center relative">
          <button 
            onClick={() => {
              window.location.hash = '#/';
              if (window.location.hash === '#/') window.location.reload();
            }} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-dim hover:text-amber p-2 flex items-center justify-center border border-transparent hover:border-amber/30 rounded-full transition-all"
            title="Voltar ao Início"
          >
            <ToriiGate className="w-6 h-6" />
          </button>
          <h2 className="font-display text-crimson text-2xl tracking-widest uppercase mb-0.5">Gaman</h2>
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-amber font-bold leading-none">Sushi Lounge</span>
          
          {lastOrder.length > 0 && (
            <button 
              onClick={() => setShowHistory(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-amber p-2 flex items-center justify-center bg-card rounded-full shadow-lg border border-amber/20"
              title="Repetir Último Pedido"
            >
              <span className="text-lg">🕒</span>
            </button>
          )}
        </div>
        
        <nav className="flex overflow-x-auto no-scrollbar border-t border-amber-dim/10 scroll-smooth">
          {MENU_DATA.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-3 text-[11px] uppercase tracking-widest font-bold transition-colors border-b-2 ${
                activeCategory === cat.id 
                  ? 'text-cream border-crimson bg-crimson/5' 
                  : 'text-cream-dim border-transparent hover:text-cream/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-4 md:p-6 pt-32 md:pt-12 pb-64">
        {MENU_DATA.categories.map(category => {
          const catItems = MENU_DATA.items.filter(i => i.category === category.id);
          if (catItems.length === 0) return null;
          
          return (
            <div 
              key={category.id} 
              id={category.id}
              ref={el => {
                if (el) categoryRefs.current[category.id] = el;
              }}
              className="mb-16 scroll-mt-32 md:scroll-mt-12"
            >
              <div className="mb-8 border-b border-amber-dim/20 pb-4">
                <h2 className="font-display text-3xl md:text-5xl text-cream mb-2 flex items-baseline gap-4">
                  {category.label}
                  <span className="text-crimson/30 text-2xl md:text-4xl">{category.kanji}</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {catItems.map((item, index) => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </main>

      <CartBar onOpen={() => setIsCartOpen(true)} />
      
      {isCartOpen && (
        <CartModal 
          onClose={() => setIsCartOpen(false)} 
          onSubmit={handleOrderSubmit} 
        />
      )}

      {/* History Modal / Overlay */}
      {showHistory && lastOrder.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-primary/95 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
          <div className="relative bg-secondary border border-amber/30 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
            <div className="bg-card p-4 border-b border-amber/20 flex justify-between items-center">
              <h3 className="font-display text-xl text-cream italic">Último Pedido</h3>
              <button onClick={() => setShowHistory(false)} className="text-cream-dim hover:text-crimson transition-colors text-2xl">✕</button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {lastOrder.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-ink/50 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-amber/10 text-amber px-2 py-0.5 rounded text-sm font-bold">x{item.quantity}</span>
                    <span className="text-cream font-medium">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-card border-t border-amber/20">
              <button 
                onClick={handleRepeatLastOrder}
                className="w-full py-4 bg-crimson hover:bg-crimson-light text-cream font-bold tracking-widest uppercase rounded-xl shadow-lg transition-all active:scale-95"
              >
                Repetir Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop History Button */}
      {!showHistory && lastOrder.length > 0 && (
        <button 
          onClick={() => setShowHistory(true)}
          className="hidden md:flex fixed bottom-28 left-8 z-30 bg-secondary border border-amber/30 p-4 rounded-full shadow-2xl items-center gap-3 text-amber hover:scale-105 transition-all group"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">🕒</span>
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Último Pedido</span>
        </button>
      )}
    </div>
  );
}

const ItemCard: React.FC<{ item: MenuItem; index: number }> = ({ item, index }) => {
  const { state, dispatch } = useCart();
  const cartItem = state.items.find(i => i.id === item.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  // Stagger animation based on index
  const animDelay = `${(index % 10) * 0.05}s`;
  
  const options = [1, 2, 4, 6];

  const handleSelect = (e: React.MouseEvent, qty: number) => {
    e.stopPropagation();
    const newQty = (currentQty === qty) ? 0 : qty;
    dispatch({ type: 'SET_QTY', payload: { item, quantity: newQty } });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80';
  };

  return (
    <div 
      className="bg-card rounded-xl overflow-hidden flex flex-col sm:flex-row h-auto min-h-[160px] transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-amber-dim/10 hover:border-crimson/50 animate-fade-in-up"
      style={{ animationDelay: animDelay, animationFillMode: 'both' }}
    >
      <div className="w-full sm:w-1/3 h-40 sm:h-auto relative shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-card" />
      </div>
      
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex gap-2 flex-wrap mb-1">
            {item.tags.map(tag => (
              <span 
                key={tag} 
                className={`text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full border 
                  ${tag === 'chef' ? 'border-amber/50 text-amber' 
                  : tag === 'popular' ? 'bg-crimson/20 border-crimson/50 text-crimson-light' 
                  : tag === 'premium' ? 'bg-amber/10 border-amber text-amber'
                  : 'border-cream-dim/30 text-cream-dim'}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
          <p className="text-cream-dim text-sm line-clamp-2 leading-relaxed">{item.description}</p>
        </div>
        
        <div className="flex flex-wrap justify-between items-end mt-auto pt-4 pb-1">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-xs uppercase tracking-widest text-cream-dim mr-2 font-bold shrink-0">Peças</span>
            <div className="flex gap-2 flex-wrap">
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={(e) => handleSelect(e, opt)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold font-sans transition-all shrink-0 ${
                    currentQty === opt 
                      ? 'bg-crimson border-crimson text-cream shadow-[0_0_12px_rgba(139,26,26,0.6)] scale-105' 
                      : 'border-amber-dim/50 text-amber hover:bg-amber-dim/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
