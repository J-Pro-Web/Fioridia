
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, cartCount }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <span 
              className="material-symbols-outlined cursor-pointer text-charcoal dark:text-white"
              onClick={() => onViewChange('assistant')}
            >
              auto_awesome
            </span>
          </div>
          <h1 
            className="serif-text text-2xl font-semibold tracking-tight text-charcoal dark:text-white cursor-pointer"
            onClick={() => onViewChange('home')}
          >
            Fioridia
          </h1>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined cursor-pointer text-charcoal dark:text-white" onClick={() => onViewChange('search')}>search</span>
            <div className="relative cursor-pointer" onClick={() => onViewChange('shop')}>
              <span className="material-symbols-outlined text-charcoal dark:text-white">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] text-white">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Secondary Nav */}
        <div className="flex justify-center gap-8 pb-3 text-[11px] uppercase tracking-[0.2em] font-medium text-gray-500 dark:text-gray-400">
          <button onClick={() => onViewChange('shop')} className={`hover:text-primary transition-colors ${activeView === 'shop' ? 'text-primary' : ''}`}>Shop</button>
          <button onClick={() => onViewChange('about')} className={`hover:text-primary transition-colors ${activeView === 'about' ? 'text-primary' : ''}`}>About</button>
          <button className="hover:text-primary transition-colors">Journals</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-8 pb-8 pt-3 flex justify-between items-center z-50">
        <button 
          onClick={() => onViewChange('home')}
          className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'home' ? "'FILL' 1" : "" }}>home</span>
          <span className="text-[10px] font-bold">HOME</span>
        </button>
        <button 
          onClick={() => onViewChange('shop')}
          className={`flex flex-col items-center gap-1 ${activeView === 'shop' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'shop' ? "'FILL' 1" : "" }}>grid_view</span>
          <span className="text-[10px] font-bold">SHOP</span>
        </button>
        <button 
          onClick={() => onViewChange('wishlist')}
          className={`flex flex-col items-center gap-1 ${activeView === 'wishlist' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'wishlist' ? "'FILL' 1" : "" }}>favorite</span>
          <span className="text-[10px] font-bold">WISHLIST</span>
        </button>
        <button 
          onClick={() => onViewChange('profile')}
          className={`flex flex-col items-center gap-1 ${activeView === 'profile' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeView === 'profile' ? "'FILL' 1" : "" }}>person</span>
          <span className="text-[10px] font-bold">PROFILE</span>
        </button>
      </nav>
      {/* Home Indicator */}
      <div className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-700 rounded-full z-[60]"></div>
    </div>
  );
};
