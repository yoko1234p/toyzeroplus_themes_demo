import React, { useState, useEffect } from 'react';

interface SealLoadingAnimationProps {
  onComplete: () => void;
}

const SealLoadingAnimation: React.FC<SealLoadingAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'floating' | 'stamping' | 'spreading' | 'fading'>('floating');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Floating (seal appears and hovers) - 800ms
    timers.push(setTimeout(() => setPhase('stamping'), 800));

    // Phase 2: Stamping (seal falls and impacts) - 400ms
    timers.push(setTimeout(() => setPhase('spreading'), 1200));

    // Phase 3: Spreading (ink spreads out) - 600ms
    timers.push(setTimeout(() => setPhase('fading'), 2000));

    // Phase 4: Fading (transition out) - 800ms
    timers.push(setTimeout(() => onComplete(), 2800));

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#F9F9F9]">
       <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-4px, -4px); }
          20%, 40%, 60%, 80% { transform: translate(4px, 4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes ink-spread {
          0% { opacity: 1; transform: scale(0.2); }
          100% { opacity: 0; transform: scale(2.5); }
        }
        .animate-ink {
          animation: ink-spread 1.5s ease-out forwards;
        }
      `}</style>
      
      {/* Subtle rice paper texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Camera Shake Container */}
      <div className={`relative flex items-center justify-center w-full h-full ${phase === 'stamping' ? 'animate-shake' : ''}`}>
        
        {/* Seal Container */}
        <div
          className={`relative transition-all duration-300 ease-in ${
            phase === 'floating'
              ? 'opacity-100 scale-110 -translate-y-20 shadow-2xl'
              : phase === 'stamping'
              ? 'opacity-100 scale-100 translate-y-0 shadow-none'
              : 'opacity-100 scale-100 translate-y-0 shadow-none'
          } ${phase === 'fading' ? 'opacity-0 scale-110 blur-sm duration-700' : ''}`}
        >
          {/* Main Seal Body */}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* The Seal Stamp Itself (Visible only when floating/stamping) */}
            <div className={`absolute inset-0 border-[6px] border-[#C83F49] bg-[#C83F49] text-[#F9F9F9] flex items-center justify-center transition-opacity duration-100 ${phase === 'spreading' || phase === 'fading' ? 'opacity-0' : 'opacity-100'}`}>
               <span className="font-serif text-8xl md:text-9xl font-black select-none" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                樂
               </span>
            </div>

            {/* The Imprint (Visible after stamping) */}
             <div className={`absolute inset-0 border-[6px] border-[#C83F49] flex items-center justify-center transition-all duration-100 ${phase === 'spreading' || phase === 'fading' ? 'opacity-100' : 'opacity-0'}`}
                  style={{ maskImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")' }} // Texture mask simulation
             >
               <span className="font-serif text-8xl md:text-9xl font-black text-[#C83F49] select-none" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                樂
               </span>
            </div>

            {/* Ink Splatters on Impact */}
            {phase !== 'floating' && (
              <>
                 <div className="absolute -top-4 -right-4 w-2 h-2 bg-[#C83F49] rounded-full animate-[ping_0.5s_ease-out_forwards]" />
                 <div className="absolute -bottom-2 -left-6 w-3 h-3 bg-[#C83F49] rounded-full animate-[ping_0.6s_ease-out_0.1s_forwards]" />
                 <div className="absolute top-1/2 -right-8 w-1 h-1 bg-[#C83F49] rounded-full animate-[ping_0.4s_ease-out_forwards]" />
              </>
            )}
          </div>

          {/* Ink spreading ripples */}
          {(phase === 'spreading' || phase === 'fading') && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#C83F49]/10 rounded-full animate-ink mix-blend-multiply filter blur-md" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-4 border-[#C83F49]/5 rounded-full animate-ink animation-delay-100" style={{ animationDelay: '0.1s' }} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom text */}
      <div
        className={`absolute bottom-20 text-center transition-all duration-700 ${
          phase === 'fading' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <p
          className="text-xs tracking-[1em] text-[#333333]/40 font-serif uppercase"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
        >
          活版印刷
        </p>
      </div>
    </div>
  );
};

export default SealLoadingAnimation;