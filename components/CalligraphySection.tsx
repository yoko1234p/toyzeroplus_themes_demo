
import React from 'react';
import { ThemeMode } from '../types';

interface CalligraphySectionProps {
  text: string;
  className?: string;
  theme: ThemeMode;
}

const CalligraphySection: React.FC<CalligraphySectionProps> = ({ text, className, theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`writing-vertical font-['Noto_Serif_TC'] text-5xl md:text-7xl font-black tracking-widest select-none transition-all duration-500 ${className} 
      ${isDark ? 'text-red-700 opacity-30' : 'text-red-900 opacity-10'}`}>
      {text}
    </div>
  );
};

export default CalligraphySection;
