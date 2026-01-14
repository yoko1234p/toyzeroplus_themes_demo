
import React, { useState, useEffect } from 'react';

interface SealKVProps {
  stage: number;
}

const SealKV: React.FC<SealKVProps> = ({ stage }) => {
  const [activeCell, setActiveCell] = useState(-1);
  const brandChars = ['快', '樂', '印', '刷'];

  useEffect(() => {
    if (stage < 1) return;
    
    // Animate cells appearing one by one along the grid
    let i = 0;
    const interval = setInterval(() => {
        if (i > 4) {
            clearInterval(interval);
            return;
        }
        setActiveCell(i);
        i++;
    }, 600);
    
    return () => clearInterval(interval);
  }, [stage]);

  const isRevealed = (idx: number) => activeCell >= idx;

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center">
      
      {/* The Typesetting Chase (Outer Frame) */}
      <div className="relative border-4 border-[#333] p-2 md:p-4 bg-white shadow-2xl transition-all duration-1000 ease-out transform">
        
        {/* Inner Grid Container */}
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-[#333] border border-[#333]">
           {brandChars.map((char, idx) => (
             <div 
               key={idx} 
               className={`relative w-24 h-24 md:w-40 md:h-40 bg-[#F9F9F9] flex items-center justify-center overflow-hidden`}
             >
                {/* Grid Lines Animation inside cell */}
                <div className={`absolute inset-0 border border-transparent transition-all duration-1000 ${isRevealed(idx) ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-900/10 scale-x-0 origin-left animate-[grow-x_1s_ease-out_forwards]" style={{ animationDelay: `${idx * 0.2}s` }}></div>
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-red-900/10 scale-y-0 origin-top animate-[grow-y_1s_ease-out_forwards]" style={{ animationDelay: `${idx * 0.2 + 0.3}s` }}></div>
                </div>

                {/* Character */}
                <span 
                    className={`font-serif font-black text-5xl md:text-7xl text-[#333] transition-all duration-1000 transform ${
                        isRevealed(idx) ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
                    }`}
                    style={{ fontFamily: "'Noto Serif TC', serif" }}
                >
                    {char}
                </span>

                {/* Corner Decoration (Red Seal Mark style) */}
                {idx === 3 && isRevealed(3) && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 border border-[#C83F49] flex items-center justify-center opacity-0 animate-[fade-in_1s_ease-out_1s_forwards]">
                        <div className="w-3 h-3 bg-[#C83F49] rounded-full"></div>
                    </div>
                )}
             </div>
           ))}
        </div>

        {/* Decorative Specs Text */}
        <div className="absolute -bottom-12 left-0 text-[9px] tracking-[0.2em] font-mono text-[#333]/50">
            TYPE: MOVABLE LEAD<br/>
            SIZE: 40pt / 2.5kg
        </div>
        
        <div className="absolute -right-12 top-0 text-[9px] tracking-[0.2em] font-mono text-[#333]/50 writing-vertical-rl">
            BATCH: 2024-HK-KW
        </div>

      </div>

      <style>{`
        .writing-vertical-rl { writing-mode: vertical-rl; }
        @keyframes grow-x { to { transform: scaleX(1); } }
        @keyframes grow-y { to { transform: scaleY(1); } }
        @keyframes fade-in { to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default SealKV;
