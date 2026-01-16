
import React, { useEffect, useRef, useState } from 'react';
import { Product, ThemeMode } from '../types';
import { PRODUCTS } from '../constants';
import { PRODUCTS as MAXIM_PRODUCTS, MaximProduct } from '../data/products';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { mapShopifyProducts } from '../services/shopify';

// Helper function to render text with highlighted portion
const renderHighlightedText = (text: string, highlightText?: string) => {
  if (!highlightText || !text.includes(highlightText)) {
    return <>{text}</>;
  }
  const parts = text.split(highlightText);
  return (
    <>
      {parts[0]}
      <span className="card-highlight-text">{highlightText}</span>
      {parts.slice(1).join(highlightText)}
    </>
  );
};

interface ProductGridProps {
  onAcquire: (product: Product) => void;
  theme: ThemeMode;
  onProductClick?: (product: MaximProduct) => void;
  useShopify?: boolean; // 是否使用 Shopify 數據
}

// Hook for scroll reveal animation
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Separate component for Card item to properly use hooks
interface CardItemProps {
  product: Product;
  idx: number;
  onAcquire: (product: Product) => void;
  onProductClick?: (product: MaximProduct) => void;
}

const CardItem: React.FC<CardItemProps> = ({ product, idx, onAcquire, onProductClick }) => {
  const { ref, isVisible } = useScrollReveal();

  // Get MaximProduct to access highlightText
  const maximProduct = MAXIM_PRODUCTS.find(p => p.id === product.id);

  // Handle card click - go to product page if handler provided
  const handleCardClick = () => {
    if (onProductClick && maximProduct) {
      onProductClick(maximProduct);
      return;
    }
    onAcquire(product);
  };

  return (
    <div
      ref={ref}
      onClick={handleCardClick}
      className={`flex-1 group cursor-pointer transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
      }`}
      style={{ transitionDelay: `${idx * 200}ms` }}
    >
      {/* Voucher Style Card */}
      <div className="h-full bg-white border-2 border-[#EAEAEA] hover:border-[#B08D57] transition-colors duration-500 relative">
        {/* Category Tag - 放喺 overflow-hidden 外面 */}
        <div className="absolute -top-2 -right-2 bg-[#C83F49] text-white text-[10px] py-1 px-2 font-lhkk tracking-widest writing-vertical-rl h-16 shadow-md z-20">
          {product.category === '蘿蔔糕' ? '蘿蔔糕' : product.category === '芋頭糕' ? '芋頭糕' : '糕點'}
        </div>

        {/* Inner Container */}
        <div className="h-full border border-[#333]/10 m-2 p-4 flex flex-col relative overflow-hidden">

          {/* Cutout Circles (Voucher effect) */}
          <div className="absolute top-1/2 -left-4 w-6 h-6 bg-[#f4f4f0] rounded-full border border-[#EAEAEA]"></div>
          <div className="absolute top-1/2 -right-4 w-6 h-6 bg-[#f4f4f0] rounded-full border border-[#EAEAEA]"></div>

          {/* Image Area */}
          <div className="w-full aspect-square mb-4 overflow-hidden bg-gradient-to-b from-[#f5f5f0] to-[#e8e6dc] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000"
            />
          </div>

          {/* Content */}
          <div className="text-center mt-auto flex-grow flex flex-col">
            <h3 className="text-xl font-lhkk font-black text-[#333] mb-1">
              {product.name}
            </h3>
            <p className="text-[10px] text-[#B08D57] tracking-[0.2em] uppercase mb-3 font-mono">
              {product.calligraphy}
            </p>

            <div className="w-8 h-px bg-[#333]/20 mx-auto mb-3"></div>

            <p className="text-sm text-[#333]/80 leading-relaxed font-lhkk mb-4 line-clamp-2 flex-grow">
              {renderHighlightedText(product.description, maximProduct?.highlightText)}
            </p>
          </div>

          {/* Price / Action */}
          <div className="mt-4 pt-4 border-t border-dashed border-[#333]/20 flex justify-between items-center">
            <span className="font-mono text-lg font-bold text-[#333]">{product.price}</span>
            <button
              onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
              className="text-xs text-[#C83F49] font-bold border-b border-[#C83F49] pb-0.5 hover:text-[#B08D57] hover:border-[#B08D57] transition-colors font-lhkk"
            >
              立即訂購
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ onAcquire, theme, onProductClick, useShopify = false }) => {
  // Conditionally fetch Shopify data from Happy Printing collection (hook is always called, but count=0 skips actual fetch)
  const { products: shopifyProducts, loading, error } = useShopifyProducts(
    useShopify ? { count: 20, collectionHandle: 'happy-printing' } : { count: 0 }
  );

  // Use Shopify data or static data
  const displayProducts = useShopify && shopifyProducts.length > 0
    ? mapShopifyProducts(shopifyProducts)
    : PRODUCTS;

  const isDark = theme === 'dark';
  const isCard = theme === 'card';
  const borderColor = isDark ? 'border-zinc-800' : 'border-black';
  const hoverBg = isDark ? 'hover:bg-zinc-950' : 'hover:bg-[#f2f2eb]';
  const textColor = isDark ? 'text-zinc-100' : 'text-black';
  const subTextColor = isDark ? 'text-zinc-500' : 'text-zinc-600';
  const buttonBorder = isDark ? 'border-zinc-700 hover:border-red-600 hover:text-red-500' : 'border-black hover:bg-black hover:text-white';

  // Loading state
  if (useShopify && loading) {
    return (
      <div className="py-12 px-4 text-center">
        <div className="font-lhkk text-xl text-[#333]">載入中...</div>
      </div>
    );
  }

  // Error fallback - log warning and use static data
  if (useShopify && error) {
    console.warn('Shopify fetch failed, falling back to static data:', error);
  }

  // Card Mode - Row Layout with 3 products
  if (isCard) {
    return (
      <div className="py-12 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch max-w-6xl mx-auto">
          {displayProducts.slice(0, 3).map((product, idx) => (
            <CardItem key={product.id} product={product} idx={idx} onAcquire={onAcquire} onProductClick={onProductClick} />
          ))}
        </div>

        <style>{`
          .writing-vertical-rl { writing-mode: vertical-rl; }

          /* Card Highlight Animation - 淡色版本，只 target 重點文字 */
          .card-highlight-text {
            background: linear-gradient(120deg, rgba(176, 141, 87, 0.35) 0%, rgba(212, 175, 55, 0.35) 100%);
            background-repeat: no-repeat;
            background-size: 0% 100%;
            background-position: 0 88%;
            transition: background-size 0.4s ease;
            padding: 2px 4px;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
          }
          .group:hover .card-highlight-text {
            background-size: 100% 40%;
          }
        `}</style>
      </div>
    );
  }

  // Default Grid Layout (Dark / Light modes)
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-y transition-colors duration-500 ${borderColor}`}>
      {displayProducts.map((product, idx) => (
        <div
          key={product.id}
          className={`relative group p-8 transition-all duration-700 overflow-hidden ${hoverBg} ${borderColor} ${idx < 2 ? 'border-r' : ''} ${idx < 3 ? 'border-b md:border-b-0' : ''}`}
        >
          {/* Background Decorative Text */}
          <div className={`absolute top-4 right-4 writing-vertical font-lhkk text-3xl transition-opacity duration-500 ${isDark ? 'opacity-10 group-hover:opacity-30' : 'opacity-5 text-red-900 group-hover:opacity-10'}`}>
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
              <h3 className={`text-xl font-bold font-lhkk tracking-tight leading-none italic transition-colors ${textColor}`}>
                {product.name}
              </h3>
              <span className="text-red-700 font-mono text-sm font-bold">{product.price}</span>
            </div>
            <p className={`text-sm leading-relaxed mb-6 font-lhkk transition-colors ${subTextColor}`}>
              {product.description}
            </p>

            <button
              onClick={() => onAcquire(product)}
              className={`w-full border py-3 px-6 text-xs tracking-widest uppercase transition-all duration-300 font-lhkk font-bold ${buttonBorder}`}
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
