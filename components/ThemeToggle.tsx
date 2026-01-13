
import React from 'react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: (mode: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed top-6 right-6 z-[120]">
      <div className="relative group">
        <select 
          value={theme}
          onChange={(e) => onToggle(e.target.value as ThemeMode)}
          className={`appearance-none pl-8 pr-12 py-3 outline-none border font-['Noto_Serif_TC'] font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-500
            ${isDark 
              ? 'bg-black text-white border-zinc-800 hover:border-red-600' 
              : 'bg-[#f4f4f0] text-red-900 border-black hover:bg-black hover:text-white'
            }`}
        >
          <option value="light">白晝模式 (Day)</option>
          <option value="dark">黑夜模式 (Night)</option>
          <option value="card">設計預覽 (Card)</option>
        </select>
        
        {/* Custom Arrow Indicator */}
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] transition-colors duration-500 ${isDark ? 'text-red-600' : 'text-current'}`}>
          ▼
        </div>
        
        {/* Status Dot */}
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none transition-colors duration-500 ${isDark ? 'bg-red-600 animate-pulse' : 'bg-current'}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;
