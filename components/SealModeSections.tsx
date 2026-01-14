
import React, { useEffect, useRef, useState } from 'react';

interface SealModeSectionsProps {
  onProductClick?: (productId: string) => void;
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

const GridBox: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className = '', delay = '0s' }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div ref={ref} className={`relative border border-[#333]/10 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: delay }}>
            {children}
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#333] opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#333] opacity-20"></div>
        </div>
    );
};

const SealModeSections: React.FC<SealModeSectionsProps> = ({ onProductClick }) => {
  const products = [
    {
      id: '1',
      name: '鉛字套裝',
      price: 'HKD 1,280',
      description: '傳承百年的活字工藝，每一顆鉛字都由老師傅手工鑄造。重量十足，手感溫潤。',
      image: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      name: '手作信箋',
      price: 'HKD 320',
      description: '特選棉紙，吸墨性極佳。適合鋼筆書寫或活版印刷，呈現獨特的凹凸質感。',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop',
    },
  ];

  const craftImages = [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518112166137-859095696144?w=600&auto=format&fit=crop',
  ];

  return (
    <div className="bg-transparent relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 py-24 space-y-32">
      
      {/* Introduction Block */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-b border-[#333]">
        <div className="md:col-span-4 p-8 border-r border-[#333] flex items-center justify-center bg-[#f4f4f0]">
             <h2 className="text-4xl font-serif font-black tracking-widest writing-vertical-rl text-[#333] h-64" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                文字的重量
             </h2>
        </div>
        <div className="md:col-span-8 p-12 flex flex-col justify-center bg-white/80 backdrop-blur-sm">
             <p className="font-serif text-lg leading-loose text-[#333]/80 mb-8 max-w-lg" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                在這個數碼化的時代，我們依然堅持鉛字的溫度。每一行排版，都是與時間的對話；每一次壓印，都是對紙張的承諾。
             </p>
             <div className="w-16 h-px bg-[#C83F49]"></div>
        </div>
      </section>

      {/* Product Grid - "The Gallery" */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {products.map((p, i) => (
            <GridBox key={p.id} className="group cursor-pointer hover:shadow-2xl hover:border-[#333]/30 transition-shadow duration-500" delay={`${i*0.2}s`}>
                <div className="aspect-[4/3] overflow-hidden border-b border-[#333]/10 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-mono tracking-widest border border-[#333]">{p.id.padStart(3, '0')}</div>
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-baseline mb-4">
                        <h3 className="text-2xl font-serif font-bold text-[#333]" style={{ fontFamily: "'Noto Serif TC', serif" }}>{p.name}</h3>
                        <span className="font-mono text-sm text-[#333]/60">{p.price}</span>
                    </div>
                    <p className="text-sm text-[#333]/60 leading-relaxed font-serif mb-6">{p.description}</p>
                    <button 
                        onClick={() => onProductClick?.(p.id)}
                        className="w-full py-3 border border-[#333] text-[#333] text-xs tracking-[0.3em] hover:bg-[#333] hover:text-white transition-colors uppercase"
                    >
                        Acquire Object
                    </button>
                </div>
            </GridBox>
        ))}
      </section>

      {/* Craftsmanship - "The Process" */}
      <section className="relative py-12">
          <div className="absolute left-1/2 -top-12 -translate-x-1/2 bg-[#F9F9F9] px-6 py-2 border border-[#333] z-10">
              <span className="font-mono text-xs tracking-[0.4em] uppercase">Process</span>
          </div>
          <div className="grid grid-cols-3 gap-px bg-[#333] border border-[#333]">
              {craftImages.map((img, i) => (
                  <div key={i} className="aspect-[3/4] relative group overflow-hidden bg-white">
                      <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                          <span className="text-white font-serif text-xl tracking-widest">STEP {i+1}</span>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Footer / End Seal */}
      <footer className="flex flex-col items-center justify-center py-20 border-t border-[#333]/20">
          <div className="w-24 h-24 border border-[#C83F49] rounded-full flex items-center justify-center p-1 mb-6">
              <div className="w-full h-full border border-[#C83F49] rounded-full flex items-center justify-center border-dashed">
                 <span className="text-[#C83F49] font-serif font-black text-3xl" style={{ fontFamily: "'Noto Serif TC', serif" }}>完</span>
              </div>
          </div>
          <p className="text-[10px] tracking-[0.5em] text-[#333]/40 uppercase font-mono">End of Paper</p>
      </footer>

      <style>{`
        .writing-vertical-rl { writing-mode: vertical-rl; }
      `}</style>
    </div>
  );
};

export default SealModeSections;
