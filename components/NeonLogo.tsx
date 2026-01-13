
import React from 'react';
import { ThemeMode } from '../types';

interface NeonLogoProps {
  theme: ThemeMode;
}

const NeonLogo: React.FC<NeonLogoProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className={`text-4xl md:text-6xl font-black tracking-tighter font-serif uppercase transition-all duration-500
        ${isDark 
          ? 'text-white neon-flicker' 
          : 'text-black drop-shadow-none scale-105'
        }`}>
        Midnight
      </h1>
      <h2 className={`text-2xl md:text-4xl font-bold tracking-[0.2em] mt-[-0.5rem] transition-colors duration-500
        ${isDark 
          ? 'text-red-600 opacity-80' 
          : 'text-red-700 opacity-100'
        }`}>
        九龍午夜
      </h2>
    </div>
  );
};

export default NeonLogo;
