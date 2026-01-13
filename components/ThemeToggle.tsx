
import React from 'react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  
  return (
    <button 
      onClick={onToggle}
      className={`fixed top-6 right-6 z-[120] flex items-center gap-3 px-4 py-2 border transition-all duration-500 font-['Noto_Serif_TC'] font-bold text-xs tracking-widest uppercase
        ${isDark 
          ? 'bg-black text-white border-zinc-800 hover:border-red-600' 
          : 'bg-[#f4f4f0] text-red-900 border-black hover:bg-black hover:text-white'
        }`}
    >
      <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-600 animate-pulse' : 'bg-black'}`}></span>
      {isDark ? '切換至白晝' : '切換至黑夜'}
    </button>
  );
};

export default ThemeToggle;
