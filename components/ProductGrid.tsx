
import React from 'react';
import { Product, ThemeMode } from '../types';
import { PRODUCTS } from '../constants';

interface ProductGridProps {
  onAcquire: (product: Product) => void;
  theme: ThemeMode;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAcquire, theme }) => {
  const isDark = theme === 'dark';
  const isGrand = theme === 'card';
  const isAvant = theme === 'light';

  // Base Styles
  let containerBorder = "";
  let itemBorder = "";
  let hoverEffect = "";
  let textColor = "";
  let descColor = "";
  let buttonStyle = "";
  let overlayStyle = "";

  if (isDark) {
    containerBorder = "border-zinc-800";
    itemBorder = "border-zinc-800";
    hoverEffect = "hover:bg-zinc-950";
    textColor = "text-zinc-100";
    descColor = "text-zinc-500";
    buttonStyle = "border-zinc-700 text-zinc-300 hover:border-red-600 hover:text-red-500";
    overlayStyle = "bg-red-900/10 group-hover:bg-transparent";
  } else if (isGrand) {
    containerBorder = "border-[#bf953f]/30";
    itemBorder = "border-[#bf953f]/30";
    hoverEffect = "hover:bg-[#3d0e0e]";
    textColor = "text-[#fceabb]"; // Gold-ish white
    descColor = "text-[#bf953f]/80"; // Muted gold
    buttonStyle = "border-[#bf953f] text-[#bf953f] hover:bg-[#bf953f] hover:text-[#2b0a0a]";
    overlayStyle = "bg-[#2b0a0a]/40 group-hover:bg-transparent";
  } else {
    // Avant-Garde (Light/Pop)
    containerBorder = "border-black";
    itemBorder = "border-black";
    hoverEffect = "hover:shadow-[inset_0_0_0_4px_#54C7FC]"; // Inner blue glow
    textColor = "text-black";
    descColor = "text-zinc-600";
    buttonStyle = "border-2 border-black bg-[#FBBF24] text-black font-black hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_black] transition-transform";
    overlayStyle = "bg-transparent mix-blend-normal";
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-y transition-colors duration-500 ${containerBorder}`}>
      {PRODUCTS.map((product, idx) => (
        <div 
          key={product.id} 
          className={`relative group p-8 transition-all duration-700 overflow-hidden ${hoverEffect} ${idx % 2 === 0 ? `border-r ${itemBorder}` : `md:border-r ${itemBorder}`} ${idx < 4 ? `border-b ${itemBorder} lg:border-b-0` : ''}`}
        >
          {/* Background Decorative Text */}
          <div className={`absolute top-4 right-4 writing-vertical font-['Noto_Serif_TC'] text-3xl transition-opacity duration-500 ${isDark ? 'opacity-10 group-hover:opacity-30' : (isGrand ? 'opacity-20 text-[#bf953f]' : 'opacity-10 text-black group-hover:text-[#22C55E]')}`}>
            {product.calligraphy}
          </div>
          
          <div className="aspect-[2/3] overflow-hidden mb-6 relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isDark ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110' : (isGrand ? 'sepia-[0.5] contrast-125 opacity-80 group-hover:sepia-0 group-hover:opacity-100' : 'grayscale opacity-100 group-hover:grayscale-0 group-hover:scale-105')}`}
            />
            {/* Overlay Filter */}
            <div className={`absolute inset-0 transition-colors pointer-events-none ${overlayStyle}`} />
            
            {/* Avant-Garde specific tag */}
            {isAvant && (
              <div className="absolute bottom-0 left-0 bg-[#D62828] text-white text-[10px] font-bold px-2 py-1 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                NEW ARRIVAL
              </div>
            )}
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-xl font-bold font-['Noto_Serif_TC'] tracking-tight leading-none italic transition-colors ${textColor}`}>
                {product.name}
              </h3>
              <span className={`font-mono text-sm font-bold ${isGrand ? 'text-[#bf953f]' : 'text-red-700'}`}>{product.price}</span>
            </div>
            <p className={`text-sm leading-relaxed mb-6 font-['Noto_Serif_TC'] transition-colors ${descColor}`}>
              {product.description}
            </p>
            
            <button 
              onClick={() => onAcquire(product)}
              className={`w-full py-3 px-6 text-xs tracking-widest uppercase transition-all duration-300 font-['Noto_Serif_TC'] font-bold ${buttonStyle}`}
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
