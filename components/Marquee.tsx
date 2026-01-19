import React from 'react';
import { ThemeMode } from '../types';

interface MarqueeProps {
  theme: ThemeMode;
}

const Marquee: React.FC<MarqueeProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const containerClass = isDark
    ? 'bg-red-700 text-black border-black'
    : 'bg-black text-[#d4af37] border-black';

  return (
    <div className={`${containerClass} py-2 overflow-hidden whitespace-nowrap border-y uppercase font-bold text-xs tracking-[0.4em] flex transition-colors duration-500 relative w-full max-w-[100vw]`}>
      <div className="animate-marquee inline-block px-4 font-lhkk flex-shrink-0">
        快樂印刷公司・Since 1977
      </div>
      <div className="animate-marquee inline-block px-4 font-lhkk flex-shrink-0">
        快樂印刷公司・Since 1977
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
