
import React, { useState, useEffect } from 'react';

interface SealLoadingAnimationProps {
  onComplete: () => void;
}

const SealLoadingAnimation: React.FC<SealLoadingAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'hover' | 'descend' | 'contact' | 'lift' | 'done'>('hover');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // 1. Hover state
    timers.push(setTimeout(() => setPhase('descend'), 500));
    
    // 2. Slow descend (take 2s) -> Contact
    timers.push(setTimeout(() => setPhase('contact'), 2500));
    
    // 3. Contact dwell (ink spreading) -> Lift
    timers.push(setTimeout(() => setPhase('lift'), 4000));
    
    // 4. Lift off -> Done
    timers.push(setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 1000);
    }, 5500));

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#F9F9F9] transition-opacity duration-1000 ${phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
       
       {/* Simple Background Grid (Matching the main app) */}
       <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[1px] h-full bg-black absolute left-1/3"></div>
          <div className="w-[1px] h-full bg-black absolute right-1/3"></div>
          <div className="h-[1px] w-full bg-black absolute top-1/3"></div>
          <div className="h-[1px] w-full bg-black absolute bottom-1/3"></div>
       </div>

       <div className="relative w-64 h-64 flex items-center justify-center">
          
          {/* The Ink Mark (On the paper) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-[2000ms] ease-out ${
                (phase === 'contact' || phase === 'lift' || phase === 'done') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
             {/* Inner diffusion simulation */}
             <div className={`w-32 h-32 bg-[#C83F49] mask-image-seal transition-all duration-[3000ms] ease-out ${
                 phase === 'contact' ? 'blur-[2px] scale-95 opacity-80' : 'blur-[0px] scale-100 opacity-100'
             }`}
                style={{
                    maskImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")',
                    WebkitMaskImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")'
                }}
             >
                <span className="flex items-center justify-center w-full h-full text-white font-serif text-7xl font-bold">
                    樂
                </span>
             </div>
          </div>

          {/* The Seal Object (Moving up and down) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-white shadow-xl border border-gray-100 transition-all ease-in-out z-10 ${
                phase === 'hover' ? 'translate-y-[-40px] shadow-2xl scale-105' : 
                phase === 'descend' ? 'duration-[2000ms] translate-y-0 shadow-lg scale-100' :
                phase === 'contact' ? 'duration-[300ms] translate-y-[2px] shadow-sm scale-[0.99]' : // Slight press
                'duration-[1500ms] translate-y-[-60px] shadow-2xl scale-105 opacity-0' // Lift away
            }`}
          >
             {/* Seal Body Visuals */}
             <div className="absolute bottom-0 w-32 h-32 border-4 border-[#C83F49] bg-[#C83F49] flex items-center justify-center">
                <span className="text-white font-serif text-7xl font-bold opacity-30 rotate-y-180">樂</span>
             </div>
             {/* Side reflection/sheen */}
             <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 pointer-events-none"></div>
          </div>

       </div>
       
       {/* Caption */}
       <div className={`absolute bottom-20 transition-opacity duration-1000 ${phase === 'done' ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-[10px] tracking-[0.5em] text-gray-400 font-serif">正在排版...</span>
       </div>

    </div>
  );
};

export default SealLoadingAnimation;
