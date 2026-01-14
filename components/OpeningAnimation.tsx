
import React, { useEffect, useState } from 'react';
import { ThemeMode } from '../types';

interface OpeningAnimationProps {
  onComplete: () => void;
  theme: ThemeMode;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete, theme }) => {
  const [stage, setStage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  // NOTE: This component is now primarily used for the DARK MODE ("Cinematic") intro.
  // Light mode intro is handled directly in App.tsx for seamless integration.

  useEffect(() => {
    // Stage 1: "Happy Printing" appears in corners (Ink style)
    const timer1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Quote appears in center
    const timer2 = setTimeout(() => setStage(2), 2500);
    // Stage 3: Start fade out transition
    const timer3 = setTimeout(() => {
      setStage(3);
      setIsFadingOut(true);
    }, 5000);
    // Stage 4: Complete and unmount
    const timer4 = setTimeout(() => onComplete(), 5200);

    return () => {
      [timer1, timer2, timer3, timer4].forEach(clearTimeout);
    };
  }, [onComplete]);

  const cornerClass = "fixed z-[110] font-lhkk text-5xl md:text-7xl font-black select-none transition-all duration-1000";
  
  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-[1500ms] ease-in-out bg-[#050505] ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Corner Characters: 快樂印刷 - Solid Ink Style */}
      <div className={`${cornerClass} top-8 left-8 text-red-700 ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>快</div>
      <div className={`${cornerClass} top-8 right-8 text-red-700 ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>樂</div>
      <div className={`${cornerClass} bottom-8 left-8 text-red-700 ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>印</div>
      <div className={`${cornerClass} bottom-8 right-8 text-red-700 ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>刷</div>

      {/* Subtitle / Quote in Center */}
      <div className={`absolute transition-all duration-[1500ms] px-8 text-center ${stage >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'}`}>
        <p className="font-lhkk font-bold text-lg md:text-2xl tracking-[0.3em] leading-loose text-zinc-200">
          所有的記憶<br/>都是潮濕的油墨
        </p>
      </div>
      
      {/* Film Grain */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
};

export default OpeningAnimation;
