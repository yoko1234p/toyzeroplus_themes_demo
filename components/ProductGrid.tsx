
import React from 'react';
import { Product, ThemeMode } from '../types';
import { PRODUCTS } from '../constants';

interface ProductGridProps {
  onAcquire: (product: Product) => void;
  theme: ThemeMode;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAcquire, theme }) => {
  const isDark = theme === 'dark';
  const borderColor = isDark ? 'border-zinc-800' : 'border-black';
  const hoverBg = isDark ? 'hover:bg-zinc-950' : 'hover:bg-[#f2f2eb]';
  const textColor = isDark ? 'text-zinc-100' : 'text-black';
  const subTextColor = isDark ? 'text-zinc-500' : 'text-zinc-600';
  const buttonBorder = isDark ? 'border-zinc-700 hover:border-red-600 hover:text-red-500' : 'border-black hover:bg-black hover:text-white';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-y transition-colors duration-500 ${borderColor}`}>
      {PRODUCTS.map((product, idx) => (
        <div 
          key={product.id} 
          className={`relative group p-8 transition-all duration-700 overflow-hidden ${hoverBg} ${borderColor} ${idx % 2 === 0 ? 'border-r' : 'md:border-r'} ${idx < 4 ? 'border-b lg:border-b-0' : ''}`}
        >
          {/* Background Decorative Text */}
          <div className={`absolute top-4 right-4 writing-vertical font-['Noto_Serif_TC'] text-3xl transition-opacity duration-500 ${isDark ? 'opacity-10 group-hover:opacity-30' : 'opacity-5 text-red-900 group-hover:opacity-10'}`}>
            {product.calligraphy}
          </div>
          
          <div className="aspect-[2/3] overflow-hidden mb-6 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isDark ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110' : 'grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 contrast-125'}`}
            />
            {/* Overlay Filter */}
            <div className={`absolute inset-0 transition-colors pointer-events-none ${isDark ? 'bg-red-900/10 group-hover:bg-transparent' : 'bg-yellow-900/5 mix-blend-multiply group-hover:bg-transparent'}`} />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-xl font-bold font-['Noto_Serif_TC'] tracking-tight leading-none italic transition-colors ${textColor}`}>
                {product.name}
              </h3>
              <span className="text-red-700 font-mono text-sm font-bold">{product.price}</span>
            </div>
            <p className={`text-sm leading-relaxed mb-6 font-['Noto_Serif_TC'] transition-colors ${subTextColor}`}>
              {product.description}
            </p>
            
            <button 
              onClick={() => onAcquire(product)}
              className={`w-full border py-3 px-6 text-xs tracking-widest uppercase transition-all duration-300 font-['Noto_Serif_TC'] font-bold ${buttonBorder}`}
            >
              收藏記憶
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
