
import React from 'react';
import { ThemeMode } from '../types';

interface MarqueeProps {
  theme: ThemeMode;
}

const Marquee: React.FC<MarqueeProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  
  // Light mode: Black BG, Gold Text (for "Black/Gold line" feel). Dark mode: Red BG, Black Text.
  const containerClass = isDark 
    ? 'bg-red-700 text-black border-black' 
    : 'bg-black text-[#d4af37] border-black';

  return (
    <div className={`${containerClass} py-2 overflow-hidden whitespace-nowrap border-y uppercase font-bold text-xs tracking-[0.4em] flex transition-colors duration-500`}>
      <div className="animate-marquee inline-block px-4 font-['Noto_Serif_TC']">
        * 限量發售 * 悲情城市恕不退款 * 九龍午夜 * 找回你的記憶 * 快樂印刷 * 
      </div>
      <div className="animate-marquee2 inline-block px-4 absolute top-2 font-['Noto_Serif_TC']">
        * 限量發售 * 悲情城市恕不退款 * 九龍午夜 * 找回你的記憶 * 快樂印刷 * 
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
