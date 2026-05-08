import React, { useState, useEffect, useRef } from 'react';
import { Order } from '../types';
import { playKitchenAlert } from '../utils/audio';

export default function KitchenPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [popup, setPopup] = useState<string | null>(null);
  const prevPendingCount = useRef(0);

  useEffect(() => {
    // Initial fetch
    try {
      const stored = localStorage.getItem('gaman_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrders(parsed);
        prevPendingCount.current = parsed.filter((o: Order) => o.status === 'pending').length;
      }
    } catch(e) {}

    // Polling every 3 seconds as requested
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem('gaman_orders');
        if (stored) {
          const parsed = JSON.parse(stored) as Order[];
          setOrders(parsed);
          
          const pending = parsed.filter(o => o.status === 'pending');
          if (pending.length > prevPendingCount.current) {
            playKitchenAlert();
            // Show popup for latest order
            const latest = pending[pending.length - 1];
            setPopup(`Mesa ${latest.table}`);
            setTimeout(() => setPopup(null), 5000);
          }
          prevPendingCount.current = pending.length;
        }
      } catch (e) {}
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const completedOrders = orders.filter(o => o.status === 'completed').slice(-10); // show last 10

  const markCompleted = (orderId: number) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'completed' as const } : o);
    setOrders(updated);
    localStorage.setItem('gaman_orders', JSON.stringify(updated));
    prevPendingCount.current = updated.filter(o => o.status === 'pending').length;
  };

  return (
    <div className="min-h-screen bg-ink text-cream p-8 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-amber-dim/30 pb-4">
        <div>
          <h1 className="text-4xl font-display text-crimson">Cozinha · GAMAN</h1>
          <p className="text-amber mt-2 text-xl">{pendingOrders.length} pedidos em aberto</p>
        </div>
      </header>

      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-8 right-8 bg-crimson-light text-white p-6 rounded shadow-lg border border-crimson z-50 animate-pulse flex items-center gap-4">
          <span className="text-3xl">🔔</span>
          <div>
            <p className="font-bold text-xl uppercase tracking-wider">Novo Pedido</p>
            <p className="text-lg">{popup}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PENDING ORDERS */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider text-cream-dim">Em Preparo</h2>
          {pendingOrders.length === 0 ? (
            <div className="text-center p-12 bg-secondary rounded border border-amber-dim/20">
              <p className="text-cream-dim text-xl">Nenhum pedido na fila.</p>
            </div>
          ) : (
             pendingOrders.map(order => (
               <div key={order.id} className="bg-secondary rounded p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-amber-dim/30 animate-fade-in-up">
                 <div className="flex justify-between items-center border-b border-ink pb-4 mb-4">
                   <h3 className="text-3xl font-display text-amber">Mesa {order.table}</h3>
                   <span className="text-xl text-cream-dim">{new Date(order.timestamp).toLocaleTimeString()}</span>
                 </div>
                 
                 {order.observations && (
                   <div className="mb-4 bg-amber-dim/20 text-cream p-3 rounded border-l-4 border-amber">
                     <strong>Obs Geral:</strong> {order.observations}
                   </div>
                 )}
                 
                 <ul className="space-y-4 mb-6">
                   {order.items.map((item, idx) => (
                     <li key={idx} className="flex flex-col text-lg">
                       <div className="flex items-start">
                         <span className="bg-crimson text-white font-bold px-3 py-1 rounded mr-4">{item.quantity}</span>
                         <span className="font-bold flex-1">{item.name} <span className="text-sm font-normal text-cream-dim ml-2">({item.category})</span></span>
                       </div>
                     </li>
                   ))}
                 </ul>
                 
                 <div className="flex justify-between items-center border-t border-ink pt-4 mb-4">
                   <span className="text-cream-dim">Total peças:</span>
                   <span className="text-2xl text-amber font-bold">{order.items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                 </div>
                 
                 <button 
                   onClick={() => markCompleted(order.id)}
                   className="w-full py-4 text-xl bg-green-800 hover:bg-green-700 text-white font-bold tracking-wider rounded transition-colors"
                 >
                   ✓ Concluído
                 </button>
               </div>
             ))
          )}
        </div>

        {/* COMPLETED ORDERS */}
        <div>
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider text-cream-dim border-b border-amber-dim/30 pb-2">Histórico (Últimos)</h2>
          <div className="space-y-4 opacity-70">
             {completedOrders.reverse().map(order => (
               <div key={order.id} className="bg-card rounded p-4 border border-ink">
                 <div className="flex justify-between">
                   <span className="font-bold">Mesa {order.table}</span>
                   <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
                 </div>
                 <p className="text-sm mt-2 text-cream-dim">Total: {order.items.reduce((acc, i) => acc + i.quantity, 0)} peças</p>
               </div>
             ))}
             {completedOrders.length === 0 && <p className="text-sm text-cream-dim">Nenhum pedido recente.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
