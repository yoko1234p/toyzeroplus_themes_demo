
import React, { useState, useEffect, useRef } from 'react';

interface SealKVProps {
  stage: number;
}

const SealKV: React.FC<SealKVProps> = ({ stage }) => {
  const [activeCell, setActiveCell] = useState(-1);
  const hasAnimatedRef = useRef(false);
  const brandChars = ['快', '樂', '印', '刷'];

  useEffect(() => {
    if (stage < 1 || hasAnimatedRef.current) return;

    // Mark animation as started
    hasAnimatedRef.current = true;

    // Animate cells appearing one by one along the grid
    let i = 0;
    const interval = setInterval(() => {
        if (i > brandChars.length) {
            clearInterval(interval);
            return;
        }
        setActiveCell(i);
        i++;
    }, 400); // Faster cadence for a lighter feel

    return () => clearInterval(interval);
  }, [stage]);

  const isRevealed = (idx: number) => activeCell >= idx;

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center">
      
      {/* The Typesetting Chase (Outer Frame) */}
      <div className="relative p-2 md:p-4 bg-white shadow-2xl transition-all duration-1000 ease-out transform">
        
        {/* Animated Borders */}
        <div className={`absolute top-0 left-0 w-full h-[4px] bg-[#333] origin-left transition-transform duration-1000 ease-out ${stage >= 1 ? 'scale-x-100' : 'scale-x-0'}`} />
        <div className={`absolute top-0 right-0 w-[4px] h-full bg-[#333] origin-top transition-transform duration-1000 delay-300 ease-out ${stage >= 1 ? 'scale-y-100' : 'scale-y-0'}`} />
        <div className={`absolute bottom-0 right-0 w-full h-[4px] bg-[#333] origin-right transition-transform duration-1000 delay-500 ease-out ${stage >= 1 ? 'scale-x-100' : 'scale-x-0'}`} />
        <div className={`absolute bottom-0 left-0 w-[4px] h-full bg-[#333] origin-bottom transition-transform duration-1000 delay-700 ease-out ${stage >= 1 ? 'scale-y-100' : 'scale-y-0'}`} />

        {/* Inner Grid Container */}
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-[#333] border border-[#333]">
           {brandChars.map((char, idx) => (
             <div 
               key={idx} 
               className={`relative w-36 h-36 md:w-40 md:h-40 bg-[#F9F9F9] flex items-center justify-center overflow-hidden`}
             >
                {/* Character with "Light Stamp" Animation */}
                <div
                    className={`relative z-10 font-serif font-black text-6xl md:text-7xl text-[#333] leading-none transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) ${
                        isRevealed(idx) 
                            ? 'opacity-100 scale-100 blur-0 translate-y-0' 
                            : 'opacity-0 scale-110 blur-sm -translate-y-2'
                    }`}
                    style={{ fontFamily: "'Noto Serif TC', serif" }}
                >
                    {char}
                    {/* Ink Bleed Texture Overlay */}
                    <div 
                        className={`absolute inset-0 pointer-events-none mix-blend-screen opacity-50 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]`}
                    />
                </div>

                {/* Corner Decoration (Red Seal Mark style) */}
                {idx === 3 && isRevealed(3) && (
                    <div className="absolute bottom-3 right-3 w-5 h-5 border border-[#C83F49] flex items-center justify-center opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
                        <div className="w-2.5 h-2.5 bg-[#C83F49] rounded-full animate-[ping_0.5s_ease-out]"></div>
                    </div>
                )}
             </div>
           ))}
        </div>

        {/* Decorative Specs Text */}
        <div className={`absolute -bottom-12 left-0 text-[9px] tracking-[0.2em] font-mono text-[#333]/50 transition-opacity duration-1000 delay-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            TYPE: MOVABLE LEAD<br/>
            SIZE: 40pt / 2.5kg
        </div>
        
        <div className={`absolute -right-12 top-0 text-[9px] tracking-[0.2em] font-mono text-[#333]/50 writing-vertical-rl transition-opacity duration-1000 delay-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            BATCH: 2024-HK-KW
        </div>

      </div>

      <style>{`
        .writing-vertical-rl { writing-mode: vertical-rl; }
        @keyframes fade-in { to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default SealKV;
