
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col gap-3 group">
      <div className="relative w-full aspect-[4/5] bg-[#ececec] dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-sm">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        {product.label && (
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-1/2 flex flex-col items-center text-center pointer-events-none">
            <span className="serif-text text-[10px] tracking-[0.2em] text-black/60 uppercase">Fioridia</span>
            <span className="text-[6px] tracking-widest text-black/40 mt-0.5 uppercase">{product.label}</span>
          </div>
        )}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Quick Add
        </button>
      </div>
      <div className="flex flex-col items-center text-center">
        <h3 className="serif-text text-lg font-normal">{product.name}</h3>
        <p className="text-primary text-sm font-semibold mt-0.5">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};
