import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'SET_QTY'; payload: { item: MenuItem; quantity: number } }
  | { type: 'CLEAR' };

const INITIAL_STATE: CartState = {
  items: []
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_QTY': {
      const { item, quantity } = action.payload;
      if (quantity === 0) {
        return { 
          ...state, 
          items: state.items.filter(i => i.id !== item.id) 
        };
      }
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === item.id ? { ...i, quantity } : i)
        };
      }
      return { ...state, items: [...state.items, { ...item, quantity }] };
    }
      
    case 'CLEAR':
      return INITIAL_STATE;
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const init = (): CartState => {
    try {
      const saved = localStorage.getItem('gaman_cart');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return INITIAL_STATE;
  };

  const [state, dispatch] = useReducer(cartReducer, null, init);

  useEffect(() => {
    localStorage.setItem('gaman_cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
