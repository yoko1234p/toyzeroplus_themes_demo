import React, { useEffect, useRef, useState } from 'react';

interface SealModeSectionsProps {
  onProductClick?: (productId: string) => void;
}

// Scroll-triggered fade-in hook
const useScrollReveal = (threshold = 0.2) => {
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
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Traditional Corner Border
const CornerBorder: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#333333]/20" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#333333]/20" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#333333]/20" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#333333]/20" />
  </div>
);

// Vertical Title Component
const VerticalTitle: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <h3
    className={`font-serif font-black text-4xl md:text-5xl text-[#333333] leading-tight select-none ${className}`}
    style={{ 
      writingMode: 'vertical-rl', 
      fontFamily: "'Noto Serif TC', serif",
      textShadow: '2px 2px 0 rgba(0,0,0,0.1)'
    }}
  >
    {text}
  </h3>
);

const SealSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  showWatermark?: string;
}> = ({ children, className = '', showWatermark }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`relative py-32 md:py-48 px-6 md:px-16 lg:px-24 overflow-hidden ${className}`}
    >
      {/* Background watermark */}
      {showWatermark && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none transition-all duration-[2000ms] ${
            isVisible ? 'opacity-[0.03] scale-100 rotate-0' : 'opacity-0 scale-110 rotate-6'
          }`}
        >
          <span
            className="text-[300px] md:text-[500px] text-[#333333] font-serif font-black leading-none"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            {showWatermark}
          </span>
        </div>
      )}

      {/* Content with fade-in animation */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {children}
      </div>
    </section>
  );
};

const SealModeSections: React.FC<SealModeSectionsProps> = ({ onProductClick }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Sample products
  const products = [
    {
      id: '1',
      name: '鉛字套裝',
      description: '精選百年老鋪傳承的活字印刷鉛字，每一顆都承載著時光的重量。手工鑄造，溫度猶存。',
      image: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      name: '手工信箋',
      description: '以傳統活版印刷工藝製作，紙張的每一處壓痕都是匠心的證明。觸摸得到的凹凸質感。',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop',
    },
  ];

  // Craftsmanship images
  const craftImages = [
    {
      src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop',
      caption: '撿字',
    },
    {
      src: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&auto=format&fit=crop',
      caption: '上墨',
    },
    {
      src: 'https://images.unsplash.com/photo-1518112166137-859095696144?w=600&auto=format&fit=crop',
      caption: '壓印',
    },
    {
      src: 'https://images.unsplash.com/photo-1528916541424-e96faea07a6a?w=600&auto=format&fit=crop',
      caption: '成品',
    },
  ];

  return (
    <div className="bg-[#F9F9F9]">
      {/* Product Section 1 - Vertical Title Left, Image Center, Desc Right */}
      <SealSection showWatermark="字">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-12 md:gap-20">
          
          {/* Vertical Title */}
          <div className="hidden md:flex flex-col justify-start pt-12">
             <VerticalTitle text={products[0].name} />
             <div className="h-24 w-px bg-[#333333] mt-8 mx-auto" />
          </div>
          
          {/* Mobile Title */}
          <h3 className="md:hidden text-3xl font-serif font-black text-[#333333] mb-4 text-center">{products[0].name}</h3>

          {/* Image */}
          <div
            className="flex-grow relative group cursor-pointer"
            onMouseEnter={() => setHoveredProduct(products[0].id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => onProductClick?.(products[0].id)}
          >
            <div className="relative p-4 md:p-6 bg-white shadow-xl rotate-1 transition-transform duration-500 group-hover:rotate-0">
               <CornerBorder />
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={products[0].image}
                  alt={products[0].name}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    hoveredProduct === products[0].id ? 'scale-110 sepia-0' : 'scale-100 sepia-[0.3]'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Description (Vertical on Desktop?) No, let's keep it horizontal but styled elegantly */}
          <div className="md:w-64 flex flex-col justify-end pb-8">
            <p
              className="text-base text-[#333333]/80 leading-loose font-serif text-justify"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              {products[0].description}
            </p>
            <div className="mt-8 flex justify-end">
               <button
                className="group flex items-center gap-3 text-xs tracking-[0.3em] text-[#C83F49] hover:text-[#B08D57] transition-colors duration-300 font-serif"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                <span>收藏</span>
                <span className="w-12 h-px bg-[#C83F49] group-hover:bg-[#B08D57] transition-colors" />
              </button>
            </div>
            {/* Red Seal */}
            <div className="mt-8 self-end w-12 h-12 border-2 border-[#C83F49]/50 rounded-sm flex items-center justify-center">
                 <span className="text-[#C83F49] text-xs font-bold writing-vertical">活字</span>
            </div>
          </div>
        </div>
      </SealSection>

      {/* Product Section 2 - Mirrored */}
      <SealSection className="bg-[#EAEAEA]/30" showWatermark="版">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-stretch gap-12 md:gap-20">
          
          {/* Vertical Title */}
          <div className="hidden md:flex flex-col justify-start pt-12">
             <VerticalTitle text={products[1].name} />
             <div className="h-24 w-px bg-[#333333] mt-8 mx-auto" />
          </div>

           {/* Mobile Title */}
          <h3 className="md:hidden text-3xl font-serif font-black text-[#333333] mb-4 text-center">{products[1].name}</h3>

          {/* Image */}
          <div
            className="flex-grow relative group cursor-pointer"
            onMouseEnter={() => setHoveredProduct(products[1].id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => onProductClick?.(products[1].id)}
          >
            <div className="relative p-4 md:p-6 bg-white shadow-xl -rotate-1 transition-transform duration-500 group-hover:rotate-0">
               <CornerBorder />
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={products[1].image}
                  alt={products[1].name}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    hoveredProduct === products[1].id ? 'scale-110 sepia-0' : 'scale-100 sepia-[0.3]'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:w-64 flex flex-col justify-end pb-8">
            <p
              className="text-base text-[#333333]/80 leading-loose font-serif text-justify"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              {products[1].description}
            </p>
            <div className="mt-8 flex justify-start">
               <button
                className="group flex items-center gap-3 text-xs tracking-[0.3em] text-[#C83F49] hover:text-[#B08D57] transition-colors duration-300 font-serif"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                 <span className="w-12 h-px bg-[#C83F49] group-hover:bg-[#B08D57] transition-colors" />
                <span>收藏</span>
              </button>
            </div>
             {/* Red Seal */}
            <div className="mt-8 self-start w-12 h-12 border-2 border-[#C83F49]/50 rounded-sm flex items-center justify-center">
                 <span className="text-[#C83F49] text-xs font-bold writing-vertical">手作</span>
            </div>
          </div>
        </div>
      </SealSection>

      {/* Craftsmanship Section */}
      <SealSection showWatermark="匠">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20 md:mb-32">
             <div className="h-16 w-px bg-[#333333] mb-8" />
            <h2
              className="text-4xl md:text-6xl font-serif font-black text-[#333333] mb-6"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              百年工藝
            </h2>
            <p
              className="text-sm md:text-base text-[#333333]/60 tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              The Art of Letterpress
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {craftImages.map((img, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center gap-6"
              >
                <div className={`relative w-full aspect-[3/4] overflow-hidden bg-white p-2 shadow-lg transition-transform duration-700 ${i % 2 === 0 ? 'translate-y-8' : ''} group-hover:-translate-y-2`}>
                   <CornerBorder />
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
                <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${i % 2 === 0 ? 'translate-y-8' : ''}`}>
                    <span className="w-px h-8 bg-[#333333]/30" />
                    <span
                      className="text-xl font-serif font-bold text-[#333333]"
                      style={{ fontFamily: "'Noto Serif TC', serif" }}
                    >
                      {img.caption}
                    </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="h-32" /> {/* Spacer for the staggered layout */}
        </div>
      </SealSection>

      {/* CTA Section */}
      <SealSection className="bg-[#333333] text-[#F9F9F9]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-px h-20 bg-white/30 mx-auto mb-12" />
          <h2
            className="text-3xl md:text-5xl font-serif font-bold mb-10 leading-relaxed"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            讓我們為你的故事<br />壓上時光的印記
          </h2>
          <button
            className="group relative inline-flex items-center justify-center px-16 py-6 border border-white/30 hover:border-white transition-colors duration-500"
          >
            <span 
                className="relative z-10 text-sm tracking-[0.4em] font-serif uppercase group-hover:text-[#333333] transition-colors duration-500"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
                進入商店
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>

          {/* Decorative seal at bottom */}
          <div className="mt-24 flex justify-center">
            <div className="relative w-24 h-24 border-4 border-[#C83F49] rounded-lg flex items-center justify-center rotate-12 opacity-80 mix-blend-screen">
              <span
                className="text-[#C83F49] text-4xl font-serif font-black"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                樂
              </span>
            </div>
          </div>
        </div>
      </SealSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#EAEAEA] bg-[#F9F9F9]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-[#333333]/40 tracking-[0.2em] font-serif uppercase">
          <div className="flex items-center gap-4">
            <span>Est. 1960</span>
            <span className="w-4 h-px bg-[#333333]/20" />
            <span style={{ fontFamily: "'Noto Serif TC', serif" }}>快樂活版印刷公司</span>
          </div>
          <div
            className="text-[#C83F49]/60 tracking-[0.4em]"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            字裏行間 · 皆是時光
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SealModeSections;