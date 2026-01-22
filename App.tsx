
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ProductCard } from './components/ProductCard';
import { PRODUCTS, FOUNDERS } from './constants';
import { View, Product, CartItem } from './types';
import { getSkincareRecommendation } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [concerns, setConcerns] = useState('');
  const [aiResult, setAiResult] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleGetAiRoutine = async () => {
    if (!concerns.trim()) return;
    setIsAiLoading(true);
    const result = await getSkincareRecommendation(concerns);
    setAiResult(result);
    setIsAiLoading(false);
  };

  const renderHome = () => (
    <div className="max-w-xl mx-auto pb-24">
      {/* Hero Section */}
      <section className="relative flex min-h-[560px] flex-col items-center justify-end overflow-hidden bg-cover bg-center p-8 text-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(20, 14, 27, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhRu7GLbhr976KAsAj4fCI8XCV3Lq6xneWt2Faa_MrM3zb_MafEDpLyEAleCrw3wpwUh2tsAoHVOOFIFuk18gHO-fDxKzhahEtUmt806RcIuB0M1S4UVjaqsq85kbMDdlEY4eiCKBsnSMyzPo0FHEj76miGjL7OccLadWnCfkiB22D505Z53n45rwBppJls0wa2QZrc9wMGRvpLe1e3hAYa7amn-LGZe5r0nO7-h6mOH1-JSlAs9kSZ2QnIPKvxcbbR6RyIU7219M")`
        }}>
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="serif-text text-white text-4xl leading-tight sm:text-5xl">
            Botanical Science, <br/><span className="italic text-white/90">Refined.</span>
          </h1>
          <p className="text-white/90 text-sm font-light tracking-wide sm:text-base">
            Experience the intersection of nature and clinical luxury.
          </p>
        </div>
        <button 
          onClick={() => setActiveView('shop')}
          className="flex min-w-[200px] items-center justify-center rounded-full h-12 px-8 bg-primary text-white text-sm font-bold uppercase tracking-[0.1em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Shop the Collection
        </button>
      </section>

      {/* Featured Products */}
      <section className="px-6 pt-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="serif-text text-3xl text-charcoal dark:text-white">Summer Favorites</h2>
          <button onClick={() => setActiveView('shop')} className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/30 pb-1">View All</button>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {PRODUCTS.slice(4, 6).map(product => (
            <div key={product.id} className="flex flex-col gap-4 group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-beige-soft dark:bg-gray-800 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url("${product.image}")` }}></div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 p-2 rounded-full shadow-md text-primary"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-charcoal dark:text-white text-lg font-medium serif-text">{product.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-tighter">{product.description.slice(0, 30)}...</p>
                </div>
                <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-beige-soft dark:bg-gray-900/50 my-16 py-16 px-6 rounded-3xl mx-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="serif-text text-charcoal dark:text-white text-4xl leading-tight">The Fioridia Standard</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base font-light leading-relaxed">
              Our philosophy is rooted in purity, efficacy, and timeless elegance. We believe beauty should be effortless and ethically sourced.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <div>
                <h3 className="text-charcoal dark:text-white text-lg font-bold">Sustainable Sourcing</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Partnering with small-scale flower farms to preserve biodiversity.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <div>
                <h3 className="text-charcoal dark:text-white text-lg font-bold">Botanical Science</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Clinical results powered by cold-pressed floral extractions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-xl mx-auto pb-24">
      <section className="pt-10 pb-6 px-6 text-center">
        <h2 className="serif-text text-3xl font-medium tracking-tight mb-2">Essential Collection</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Clean, conscious beauty for your daily ritual.</p>
      </section>

      <section className="mb-6">
        <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
          {['All Products', 'Skincare', 'Serums', 'Oils'].map(cat => (
            <button key={cat} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-gray-700 px-5 shadow-sm text-sm font-medium">
              {cat}
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center px-6 py-2 border-y border-gray-100 dark:border-gray-800 mt-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{PRODUCTS.length} Products</span>
          <button className="flex items-center gap-1 text-[11px] uppercase tracking-widest font-bold">
            Filter & Sort
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>
      </section>

      <section className="px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-xl mx-auto pb-24 px-6 bg-stone-soft/50 dark:bg-background-dark">
      <section className="text-center py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">The Minds Behind Fioridia</p>
        <p className="serif-text text-lg italic text-gray-600 dark:text-gray-400 leading-relaxed px-4">
          "Where botanical science meets the art of living well."
        </p>
      </section>

      {FOUNDERS.map((founder, idx) => (
        <section key={founder.name} className="mb-24 space-y-8">
          <div className="relative group">
            <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-sm bg-beige-soft dark:bg-gray-800">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
            </div>
            <div className={`absolute -bottom-4 ${idx % 2 === 0 ? '-right-4' : '-left-4'} w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-beige-soft dark:border-gray-800`}>
              <span className="serif-text text-4xl italic text-primary/40 leading-none">{founder.initial}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="serif-text text-3xl tracking-tight dark:text-white">{founder.name}</h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold">{founder.role}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
              {founder.bio}
            </p>
          </div>
        </section>
      ))}

      <section className="mt-32 mb-12 py-16 border-t border-beige-soft dark:border-gray-800 text-center">
        <p className="serif-text text-2xl leading-relaxed italic text-charcoal dark:text-white">
          "True beauty is a reflection of the care we give to ourselves and the world we inhabit."
        </p>
        <div className="mt-8 space-y-2">
          <div className="h-px w-12 bg-primary/30 mx-auto mb-6"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold dark:text-white">Fioridia Cosmética</p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Milan — Paris — New York</p>
        </div>
      </section>
    </div>
  );

  const renderAssistant = () => (
    <div className="max-w-xl mx-auto px-6 py-12 pb-32">
      <div className="text-center mb-10">
        <span className="material-symbols-outlined text-4xl text-primary mb-4">auto_awesome</span>
        <h2 className="serif-text text-3xl mb-2">AI Skin Consultant</h2>
        <p className="text-gray-500 text-sm">Describe your skin concerns for a personalized Fioridia routine.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Skin Status / Concerns</label>
        <textarea 
          className="w-full h-32 p-4 rounded-xl border-gray-100 dark:border-gray-700 dark:bg-gray-900 focus:ring-primary focus:border-primary text-sm"
          placeholder="e.g. Dry skin with some redness around the nose, looking for anti-aging results..."
          value={concerns}
          onChange={(e) => setConcerns(e.target.value)}
        />
        <button 
          onClick={handleGetAiRoutine}
          disabled={isAiLoading || !concerns.trim()}
          className="w-full mt-4 h-12 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isAiLoading ? 'Analyzing...' : 'Generate Ritual'}
        </button>
      </div>

      {aiResult && (
        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center">
            <h3 className="serif-text text-2xl mb-2 italic">"{aiResult.routineName}"</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{aiResult.description}</p>
          </div>
          
          <div className="space-y-4">
            {aiResult.steps.map((step: any) => (
              <div key={step.step} className="flex gap-4 items-center bg-beige-soft/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-serif italic text-xl">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-bold text-sm dark:text-white uppercase tracking-wider">{step.product}</h4>
                  <p className="text-xs text-gray-500">{step.action}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setActiveView('shop')}
            className="w-full py-4 border-2 border-primary/20 rounded-xl text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-colors"
          >
            Explore the Collection
          </button>
        </div>
      )}
    </div>
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderContent = () => {
    switch (activeView) {
      case 'home': return renderHome();
      case 'shop': return renderShop();
      case 'about': return renderAbout();
      case 'assistant': return renderAssistant();
      default: return renderHome();
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView} cartCount={cartCount}>
      {renderContent()}
    </Layout>
  );
};

export default App;
