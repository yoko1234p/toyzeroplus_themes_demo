import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS, MaximProduct } from '../data/products';

// Helper function to render text with highlighted portion
const renderHighlightedText = (text: string, highlightText?: string) => {
  if (!highlightText || !text.includes(highlightText)) {
    return <>{text}</>;
  }
  const parts = text.split(highlightText);
  return (
    <>
      {parts[0]}
      <span className="highlight-text">{highlightText}</span>
      {parts.slice(1).join(highlightText)}
    </>
  );
};

interface SealModeSectionsProps {
  onProductClick?: (product: MaximProduct) => void;
  showTextSections?: boolean;
}

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

const GridBox: React.FC<{ children: React.ReactNode; className?: string; delay?: string; onClick?: () => void }> = ({ children, className = '', delay = '0s', onClick }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div ref={ref} onClick={onClick} className={`relative bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: delay }}>
            {children}
        </div>
    );
};

const SealModeSections: React.FC<SealModeSectionsProps> = ({ onProductClick, showTextSections = false }) => {
  // 使用美心產品數據
  const products = PRODUCTS;

  return (
    <div className="bg-transparent relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 py-24 space-y-24 md:space-y-32">
      
      {/* Introduction Block - Modified for CNY */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-b border-[#B08D57]/30">
        {/* Red Title Block */}
        <div className="md:col-span-3 p-8 border-r border-[#B08D57]/30 flex items-center justify-center bg-[#C83F49]/5 relative overflow-hidden">
             {/* Decorative Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C83F49_1px,transparent_1px)] [background-size:16px_16px]"></div>
             
             <div className="relative z-10 border-2 border-[#C83F49] p-4">
                <h2 className="text-4xl md:text-5xl font-lhkk font-black tracking-widest writing-vertical-rl text-[#C83F49]">
                    歲月滋味
                </h2>
             </div>
        </div>
        
        {/* Text Block */}
        <div className="md:col-span-9 p-8 md:p-12 flex flex-col justify-center bg-white/90 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-6">
                <span className="text-[#B08D57] font-mono text-xs tracking-[0.3em] uppercase border border-[#B08D57] px-2 py-1">Lunar New Year Collection</span>
                <div className="h-px flex-grow bg-[#B08D57]/20"></div>
             </div>
             <p className="font-lhkk text-lg leading-loose text-[#333]/80 mb-8 max-w-xl">
                味覺是記憶的鑰匙。新春將至，我們以傳統活版印刷的精神，打磨每一份糕點。
                <br/>
                不只是食物，更是對來年最厚重的祝福。
             </p>
             <div className="flex gap-2">
                 <div className="w-2 h-2 bg-[#C83F49]"></div>
                 <div className="w-2 h-2 bg-[#B08D57]"></div>
             </div>
        </div>
      </section>

      {/* CNY Product Grid - "Voucher Style" */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p, i) => (
            <GridBox key={p.id} className="group cursor-pointer flex flex-col h-full" delay={`${i*0.2}s`} onClick={() => onProductClick?.(p)}>
                {/* The "Ticket" Container */}
                <div className="flex-grow border-2 border-[#EAEAEA] group-hover:border-[#B08D57] transition-colors duration-500 relative bg-[#F9F9F9] p-2">

                    {/* Type Tag - 放喺 overflow-hidden 外面確保唔會被 clip */}
                    <div className="absolute -top-2 -right-2 bg-[#C83F49] text-white text-[10px] py-1 px-2 font-serif tracking-widest writing-vertical-rl h-16 shadow-md z-20">
                        {p.category === 'turnip-pudding' ? '蘿蔔糕' : '芋頭糕'}
                    </div>

                    {/* Inner Border (Double Line) */}
                    <div className="h-full border border-[#333]/10 p-4 flex flex-col relative overflow-hidden">

                        {/* Cutout Circles (Ticket effect) */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full border border-[#EAEAEA]"></div>
                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full border border-[#EAEAEA]"></div>

                        {/* Image Area */}
                        <div className="w-full aspect-square mb-6 overflow-hidden transition-all duration-700 relative bg-gradient-to-b from-[#f5f5f0] to-[#e8e6dc] flex items-center justify-center">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-[#B08D57]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"></div>
                        </div>

                        {/* Content */}
                        <div className="text-center mt-auto">
                            <h3 className="text-2xl font-lhkk font-black text-[#333] mb-1">{p.name}</h3>
                            <p className="text-[10px] text-[#B08D57] tracking-[0.2em] uppercase mb-4 font-mono">{p.nameEn}</p>

                            <div className="w-8 h-px bg-[#333]/20 mx-auto mb-4"></div>

                            <p className="text-sm text-[#333]/80 leading-relaxed font-serif mb-6 line-clamp-3">
                                {renderHighlightedText(p.description, p.highlightText)}
                            </p>
                        </div>

                        {/* Price / Action */}
                        <div className="mt-4 pt-4 border-t border-dashed border-[#333]/20 flex justify-between items-center">
                             <span className="font-mono text-lg font-bold text-[#333]">HKD {p.price}</span>
                             <button onClick={() => onProductClick?.(p)} className="text-xs text-[#C83F49] font-bold border-b border-[#C83F49] pb-0.5 hover:text-[#B08D57] hover:border-[#B08D57] transition-colors">
                                 立即訂購
                             </button>
                        </div>
                    </div>
                </div>
            </GridBox>
        ))}
      </section>


      {/* Footer / End Seal */}
      <footer className="flex flex-col items-center justify-center py-20 border-t border-[#333]/20">
          <div className="w-24 h-24 border border-[#C83F49] rounded-full flex items-center justify-center p-1 mb-6">
              <div className="w-full h-full border border-[#C83F49] rounded-full flex items-center justify-center border-dashed">
                 <span className="text-[#C83F49] font-lhkk font-black text-3xl">完</span>
              </div>
          </div>
          <p className="text-[10px] tracking-[0.5em] text-[#333]/40 uppercase font-mono">End of Paper</p>
      </footer>

      <style>{`
        .writing-vertical-rl { writing-mode: vertical-rl; }

        /* Marker Highlight Animation - 淡色版本，只 target 重點文字 */
        .highlight-text {
          background: linear-gradient(120deg, rgba(176, 141, 87, 0.35) 0%, rgba(212, 175, 55, 0.35) 100%);
          background-repeat: no-repeat;
          background-size: 0% 100%;
          background-position: 0 88%;
          transition: background-size 0.4s ease;
          padding: 2px 4px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .group:hover .highlight-text {
          background-size: 100% 40%;
        }
      `}</style>
    </div>
  );
};

export default SealModeSections;