
import React from 'react';
import { ThemeMode } from '../types';

interface HappyPrintingLogoProps {
  theme?: ThemeMode;
  /** 
   * If true, triggers the drawing animation.
   * If false, shows the static full logo.
   */
  animate?: boolean;
  /**
   * 0: Hidden
   * 1: Drawing Outlines
   * 2: Fading in Text
   * 3: Fully Visible (Static)
   */
  stage?: number;
  className?: string;
}

const HappyPrintingLogo: React.FC<HappyPrintingLogoProps> = ({ 
  animate = false, 
  stage = 3,
  className = ""
}) => {
  // Colors
  const redColor = "#d62828";
  const bgColor = "#f4f4f0";

  // If we are not animating (or stage is complete), show everything static
  const isComplete = !animate || stage >= 3;

  // Stroke State
  // Stage 1+: Start drawing stroke
  const strokeClass = (animate && stage >= 1 && !isComplete) ? "animate-draw-stroke" : "";
  const strokeStyle = isComplete ? { strokeDasharray: 'none', strokeDashoffset: 0 } : {};

  // Fill/Text State
  // Stage 2+: Fade in the fills/text
  const fillClass = (animate && stage >= 2 && !isComplete) ? "animate-fade-in-text" : "";
  const fillStyle = isComplete ? { opacity: 1 } : (stage < 2 ? { opacity: 0 } : {});

  return (
    <div className={`relative flex flex-col items-center justify-center font-sans select-none ${className}`}>
      <style>{`
        @keyframes drawStroke {
          0% { stroke-dasharray: 1200; stroke-dashoffset: 1200; }
          100% { stroke-dasharray: 1200; stroke-dashoffset: 0; }
        }
        @keyframes fadeInText {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-draw-stroke {
          animation: drawStroke 2.5s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
        .animate-fade-in-text {
          animation: fadeInText 1.5s ease-out forwards;
        }
      `}</style>

      {/* Main SVG Logo */}
      <svg 
        width="300" 
        height="450" 
        viewBox="0 0 300 450" 
        className="w-full h-auto max-w-[280px] md:max-w-[320px]"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <pattern id="diamondPattern" width="20" height="20" patternUnits="userSpaceOnUse">
             <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="#e8e8e0" fillOpacity="0.5"/>
          </pattern>
        </defs>

        {/* Top Shield Shape */}
        <g transform="translate(0, 10)">
          {/* Background Pattern */}
          <path 
            d="M20 20 H280 L280 140 L150 190 L20 140 Z" 
            fill="url(#diamondPattern)" 
            className={fillClass}
            style={fillStyle}
          />
          {/* Red Outline */}
          <path 
            d="M20 20 H280 L280 140 L150 190 L20 140 Z" 
            fill="none" 
            stroke={redColor} 
            strokeWidth="8"
            strokeLinejoin="round"
            className={strokeClass}
            style={strokeStyle}
          />
          {/* Top Notch Detail */}
          <path 
            d="M130 20 L150 35 L170 20" 
            fill={bgColor} 
            stroke={redColor} 
            strokeWidth="8"
            strokeLinejoin="round"
            className={strokeClass}
            style={strokeStyle}
          />
          
          {/* Calligraphy: 快樂 */}
          <g className={fillClass} style={fillStyle}>
             <text x="80" y="130" fontSize="110" fill={redColor} fontFamily="'Noto Serif TC', serif" fontWeight="900" textAnchor="middle">快</text>
             <text x="220" y="130" fontSize="110" fill={redColor} fontFamily="'Noto Serif TC', serif" fontWeight="900" textAnchor="middle">樂</text>
          </g>
        </g>

        {/* Middle Text: HAPPY PRINTING CO */}
        <g transform="translate(0, 230)" className={fillClass} style={fillStyle}>
           <text x="150" y="0" fontSize="52" fill={redColor} fontFamily="Impact, 'Arial Black', sans-serif" textAnchor="middle" letterSpacing="2">HAPPY</text>
           <text x="150" y="55" fontSize="42" fill={redColor} fontFamily="Impact, 'Arial Black', sans-serif" textAnchor="middle" letterSpacing="4">PRINTING</text>
           <text x="20" y="110" fontSize="40" fill={redColor} fontFamily="Impact, 'Arial Black', sans-serif" textAnchor="start">C</text>
           <text x="280" y="110" fontSize="40" fill={redColor} fontFamily="Impact, 'Arial Black', sans-serif" textAnchor="end">O</text>
        </g>

        {/* Bottom Hexagon */}
        <g transform="translate(0, 360)">
          {/* Background Pattern */}
           <path 
            d="M20 40 L150 0 L280 40 L280 110 L150 130 L130 130 L120 120 L110 130 L100 130 L90 120 L80 130 L20 130 Z" 
            fill="url(#diamondPattern)" 
            className={fillClass}
            style={fillStyle}
          />
           {/* Red Outline */}
          <path 
            d="M20 40 L150 0 L280 40 L280 110 L280 110 L20 110 Z" 
            fill="none" 
            stroke={redColor} 
            strokeWidth="6"
            strokeLinejoin="round"
            className={strokeClass}
            style={strokeStyle}
          />
           <path 
            d="M20 110 L20 130 L80 130 L90 120 L100 130 L110 130 L120 120 L130 130 L150 130 L280 130 L280 110" 
            fill="none" 
            stroke={redColor} 
            strokeWidth="6"
            strokeLinejoin="round"
            className={strokeClass}
            style={strokeStyle}
          />

          {/* Text: SINCE 1977 */}
          <g className={fillClass} style={fillStyle}>
             <text x="150" y="50" fontSize="28" fill={redColor} fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="4">SINCE</text>
             <text x="150" y="95" fontSize="56" fill={redColor} fontFamily="Impact, 'Arial Black', sans-serif" textAnchor="middle" letterSpacing="6">1977</text>
          </g>
        </g>

      </svg>
    </div>
  );
};

export default HappyPrintingLogo;
