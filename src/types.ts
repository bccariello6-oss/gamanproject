export interface Category {
  id: string;
  label: string;
  kanji: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  composition: string[];
  price: number;
  serves: string | null;
  units: string | null;
  tags: string[];
  image: string;
}

export interface MenuData {
  categories: Category[];
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: number;
  table: string;
  items: CartItem[];
  observations: string;
  timestamp: string;
  status: 'pending' | 'completed';
}
