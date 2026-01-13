
import React from 'react';
import HappyPrintingLogo from './HappyPrintingLogo';

interface GreetingCardKVProps {
  /**
   * Stage 1: Card Enters / Drawing starts
   * Stage 2: Fill text
   * Stage 3: Complete
   */
  stage: number;
}

const GreetingCardKV: React.FC<GreetingCardKVProps> = ({ stage }) => {
  const isVisible = stage >= 1;
  const startDrawing = stage >= 1;

  // Animation classes
  const containerClass = isVisible 
    ? 'opacity-100 scale-100 rotate-x-0 translate-y-0' 
    : 'opacity-0 scale-90 rotate-x-12 translate-y-12';

  return (
    <div className="relative perspective-[1200px] z-20 flex flex-col items-center justify-center">
      <style>{`
        .bg-paper-texture {
          background-color: #fdfbf7;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          /* Fallback pattern */
          background-image: radial-gradient(#e5e5e5 1px, transparent 1px), url("https://www.transparenttextures.com/patterns/cream-paper.png");
          background-size: 20px 20px, auto;
        }
      `}</style>
      
      {/* 
        The Card Container 
        Simulates a physical invitation/greeting card.
      */}
      <div 
        className={`
          relative w-[340px] md:w-[420px] h-[520px] md:h-[600px] 
          bg-paper-texture shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] 
          flex items-center justify-center
          border-[1px] border-zinc-200
          transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1)
          transform-gpu origin-center
          ${containerClass}
        `}
      >
        {/* Decorative Inner Borders (Classic Invitation Style) */}
        <div className="absolute inset-3 border border-red-900/10 pointer-events-none"></div>
        <div className="absolute inset-5 border border-double border-red-900/20 pointer-events-none"></div>

        {/* Corner Flourishes */}
        <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-red-900/40"></div>
        <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-red-900/40"></div>
        <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-red-900/40"></div>
        <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-red-900/40"></div>

        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[400px] text-red-900 leading-none">喜</span>
        </div>

        {/* The Logo Content */}
        <div className="relative z-10 p-8 transform scale-90 md:scale-100">
          <HappyPrintingLogo 
            animate={startDrawing} 
            stage={stage} 
          />
        </div>

        {/* Card Footer Text */}
        <div className={`absolute bottom-10 text-center transition-opacity duration-1000 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[10px] tracking-[0.4em] text-red-900/60 font-serif uppercase">Est. 1977 Kowloon</p>
        </div>
      </div>

      {/* Shadow / Reflection Element */}
      <div 
        className={`
          absolute -bottom-12 w-[80%] h-4 
          bg-black/20 blur-xl rounded-[100%] 
          transition-all duration-[1200ms] delay-200
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `}
      />
    </div>
  );
};

export default GreetingCardKV;
