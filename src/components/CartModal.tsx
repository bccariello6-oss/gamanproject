import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface Props {
  onClose: () => void;
  onSubmit: (tableNumber: string, observations: string) => Promise<void> | void;
}

export default function CartModal({ onClose, onSubmit }: Props) {
  const { state, dispatch } = useCart();
  const [tableNumber, setTableNumber] = useState('');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const numItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = async () => {
    if (!tableNumber) {
      setError('Por favor, informe o número da sua mesa.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
      // Save to history before clearing
      localStorage.setItem('gaman_last_order', JSON.stringify(state.items));
      await onSubmit(tableNumber, observations);
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-primary/90 backdrop-blur" onClick={onClose} />
      
      <div className="relative bg-secondary w-full max-w-3xl max-h-full flex flex-col rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] border border-amber-dim/30 animate-[fadeInUp_0.3s_ease_out]">
        
        {/* Header */}
        <div className="p-6 border-b border-amber-dim/20 flex justify-between items-center bg-card rounded-t-xl shrink-0">
          <h2 className="font-display text-2xl text-cream tracking-wider flex items-center gap-3">
            <span className="text-amber">🛒</span> Resumo do Pedido
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => dispatch({ type: 'CLEAR' })}
              className="text-xs uppercase tracking-widest text-crimson hover:text-crimson-light transition-colors font-bold hidden sm:block"
            >
              Limpar Tudo
            </button>
            <button 
              onClick={onClose}
              className="text-cream-dim hover:text-crimson transition-colors w-8 h-8 flex items-center justify-center text-xl"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-cream-dim text-lg">Seu carrinho está vazio.</p>
              <button 
                onClick={onClose}
                className="mt-6 text-amber hover:text-amber-dim underline"
              >
                Voltar ao cardápio
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map(cartItem => (
                <div key={cartItem.id} className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg border border-ink">
                  <div className="w-16 h-16 shrink-0 rounded bg-ink overflow-hidden border border-amber-dim/20 relative">
                    <img 
                      src={cartItem.image} 
                      alt={cartItem.name} 
                      onError={handleImageError}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-cream">{cartItem.name}</h3>
                    <p className="text-sm text-cream-dim">{cartItem.category}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 sm:mt-0 bg-secondary px-2 py-1 rounded shrink-0 border border-ink">
                    <button 
                      onClick={() => {
                        dispatch({ type: 'SET_QTY', payload: { item: cartItem, quantity: Math.max(0, cartItem.quantity - 1) } });
                      }}
                      className="w-8 h-8 flex items-center justify-center text-cream-dim hover:text-cream bg-card rounded"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-amber">{cartItem.quantity}</span>
                    <button 
                      onClick={() => dispatch({ type: 'SET_QTY', payload: { item: cartItem, quantity: cartItem.quantity + 1 } })}
                      className="w-8 h-8 flex items-center justify-center text-cream-dim hover:text-cream bg-card rounded"
                    >
                      +
                    </button>
                    
                    <button 
                      onClick={() => dispatch({ type: 'SET_QTY', payload: { item: cartItem, quantity: 0 } })}
                      className="ml-2 w-8 h-8 flex items-center justify-center text-xs text-crimson hover:text-crimson-light"
                      title="Remover"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-6 border-t border-amber-dim/20 bg-card rounded-b-xl flex flex-col gap-6 shrink-0">
            <div className="flex justify-between items-end">
              <span className="text-cream-dim uppercase tracking-widest text-sm font-bold">Total Peças</span>
              <span className="text-4xl font-serif text-amber italic font-bold">{numItems}</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream-dim mb-1 font-bold">Observações (Opcional)</label>
                <textarea 
                  value={observations}
                  onChange={e => setObservations(e.target.value)}
                  className="w-full bg-secondary border border-amber/30 rounded p-3 text-cream focus:border-amber focus:outline-none transition-colors"
                  placeholder="Ex: Sem wasabi em tudo, alergia a camarão..."
                  rows={2}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full relative">
                  <label className="block text-xs uppercase tracking-widest text-cream-dim mb-1 font-bold">Número da Mesa *</label>
                  <input 
                    type="number"
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-full bg-secondary border border-amber/30 rounded p-3 text-2xl text-cream focus:border-amber focus:outline-none transition-colors text-center"
                    placeholder="00"
                    required
                  />
                  {error && <p className="text-crimson-light text-xs mt-1 absolute -bottom-5">{error}</p>}
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full sm:w-2/3 py-4 mt-5 sm:mt-0 rounded-lg font-bold tracking-widest uppercase transition-all shadow-lg text-lg flex items-center justify-center h-[64px]
                    ${isSubmitting 
                      ? 'bg-amber-dim text-cream cursor-not-allowed'
                      : 'bg-green-700 hover:bg-green-600 text-white active:scale-95'}`}
                >
                  {isSubmitting ? (
                    <span className="animate-spin text-2xl mr-2">⟳</span>
                  ) : '✓ Enviar para Cozinha'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
