
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  label?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'shop' | 'about' | 'search' | 'wishlist' | 'profile' | 'assistant';
