
import React, { useEffect, useState } from 'react';
import { ThemeMode } from '../types';

interface OpeningAnimationProps {
  onComplete: () => void;
  theme: ThemeMode;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete, theme }) => {
  const [stage, setStage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isDark = theme === 'dark';

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
    const timer4 = setTimeout(() => onComplete(), 6500);

    return () => {
      [timer1, timer2, timer3, timer4].forEach(clearTimeout);
    };
  }, [onComplete]);

  const cornerClass = "fixed z-[110] font-['Noto_Serif_TC'] text-5xl md:text-7xl font-black select-none transition-all duration-1000";
  
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-[1500ms] ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isDark ? 'bg-[#050505]' : 'bg-[#f4f4f0]'}`}>
      {/* Corner Characters: 快樂印刷 - Solid Ink Style */}
      <div className={`${cornerClass} top-8 left-8 ${isDark ? 'text-red-700' : 'text-red-900'} ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>快</div>
      <div className={`${cornerClass} top-8 right-8 ${isDark ? 'text-red-700' : 'text-red-900'} ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>樂</div>
      <div className={`${cornerClass} bottom-8 left-8 ${isDark ? 'text-red-700' : 'text-red-900'} ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>印</div>
      <div className={`${cornerClass} bottom-8 right-8 ${isDark ? 'text-red-700' : 'text-red-900'} ${stage >= 1 ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}>刷</div>

      {/* Subtitle / Quote in Center */}
      <div className={`absolute transition-all duration-[1500ms] px-8 text-center ${stage >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'}`}>
        <p className={`font-['Noto_Serif_TC'] font-bold text-lg md:text-2xl tracking-[0.3em] leading-loose ${isDark ? 'text-zinc-200' : 'text-black'}`}>
          所有的記憶<br/>都是潮濕的油墨
        </p>
      </div>

      {/* Atmospheric Overlay - Paper texture hint */}
      <div className={`fixed inset-0 mix-blend-multiply transition-opacity duration-[3000ms] ${stage >= 1 ? 'opacity-100' : 'opacity-0'} ${isDark ? 'bg-zinc-900/10' : 'bg-zinc-200/50'}`} />
      
      {/* Film Grain */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
};

export default OpeningAnimation;
