
import React from 'react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: (mode: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  // 在 Shopify 環境隱藏切換器（theme mode 已被鎖定）
  if (typeof window !== 'undefined' && (window as any).THEME_MODE) {
    return null;
  }

  const isDark = theme === 'dark';
  const isSeal = theme === 'seal';
  const isCompany = theme === 'company';

  // Seal mode has its own minimal styling
  const getSelectStyles = () => {
    if (isDark) {
      return 'bg-black text-white border-zinc-800 hover:border-red-600';
    }
    if (isSeal || isCompany) {
      return 'bg-[#F9F9F9] text-[#333333] border-[#EAEAEA] hover:border-[#C83F49]';
    }
    return 'bg-[#f4f4f0] text-red-900 border-black hover:bg-black hover:text-white';
  };

  return (
    <div className="fixed top-6 right-6 z-[120]">
      <div className="relative group">
        <select
          value={theme}
          onChange={(e) => onToggle(e.target.value as ThemeMode)}
          className={`appearance-none pl-8 pr-12 py-3 outline-none border font-lhkk font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-500 ${getSelectStyles()}`}
        >
          <option value="light">白晝模式 (Day)</option>
          <option value="dark">黑夜模式 (Night)</option>
          <option value="card">設計預覽 (Card)</option>
          <option value="seal">印章模式 (Seal)</option>
          <option value="company">公司招牌 (Company)</option>
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
