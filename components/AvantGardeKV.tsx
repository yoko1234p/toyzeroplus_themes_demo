
import React from 'react';
import HappyPrintingLogo from './HappyPrintingLogo';

interface AvantGardeKVProps {
  stage: number;
}

const AvantGardeKV: React.FC<AvantGardeKVProps> = ({ stage }) => {
  const isVisible = stage >= 1;
  const startDrawing = stage >= 1;

  // Animation constants
  const logoScale = isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-12';
  
  return (
    <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center overflow-hidden bg-transparent">
      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(90deg, #22C55E 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%) rotate(-10deg); opacity: 0; }
          to { transform: translateX(0) rotate(-6deg); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%) rotate(10deg); opacity: 0; }
          to { transform: translateX(0) rotate(6deg); opacity: 1; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Background Decor: Future Green Grid */}
      <div className={`absolute inset-0 bg-grid-pattern opacity-10 transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-150'}`}></div>

      {/* Floating Graphic Elements (Stickers) */}
      <div 
        className={`absolute top-20 left-10 md:left-20 bg-[#FBBF24] text-black px-4 py-2 font-black uppercase tracking-tighter text-xl transform -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
      >
        Since 1977
      </div>

      <div 
        className={`absolute bottom-32 right-10 md:right-32 bg-[#54C7FC] text-black px-6 py-3 font-black uppercase tracking-tighter text-2xl transform rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
      >
        New Arrival!
      </div>

      <div 
        className={`absolute top-1/2 right-10 w-24 h-24 rounded-full bg-[#22C55E] flex items-center justify-center text-white font-bold text-xs text-center leading-tight shadow-lg animate-float delay-700 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ animationDelay: '1s' }}
      >
        Hong<br/>Kong<br/>Flavour
      </div>

      {/* Centerpiece: Patterned Logo */}
      <div className={`relative z-10 transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${logoScale}`}>
        <div className="relative">
          {/* Offset Shadow Layer */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-black/10 rounded-xl blur-sm transform scale-95"></div>
          
          <HappyPrintingLogo 
            animate={startDrawing} 
            stage={stage} 
            variant="pattern"
            className="drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Foreground Bold Text Overlay */}
      <div className={`absolute bottom-10 left-0 right-0 text-center pointer-events-none transition-opacity duration-1000 delay-700 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-[12vw] md:text-[8rem] font-black leading-none text-transparent opacity-10 uppercase font-sans tracking-tighter" style={{ WebkitTextStroke: '2px #d62828' }}>
          Avant-Garde
        </h2>
      </div>

    </div>
  );
};

export default AvantGardeKV;
