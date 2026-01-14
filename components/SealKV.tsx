import React, { useState, useEffect } from 'react';

interface SealKVProps {
  stage: number; // 1: Start animation, 2: Complete, 3: Show content
}

const SealKV: React.FC<SealKVProps> = ({ stage }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const brandName = '快樂印刷';
  const tagline = '字裏行間，皆是時光';

  // Character by character reveal animation
  useEffect(() => {
    if (stage < 1) return;

    const totalChars = brandName.length;
    const interval = setInterval(() => {
      setVisibleChars(prev => {
        if (prev >= totalChars) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 280); // Each character appears every 280ms

    return () => clearInterval(interval);
  }, [stage]);

  const isComplete = stage >= 2;
  const showTagline = visibleChars >= brandName.length || isComplete;

  // Metal/Lead Texture Style
  const leadBlockStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #e6e6e6, #d1d1d1)',
    boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff',
  };

  // Individual character block style (like movable type blocks)
  const TypeBlock: React.FC<{ char: string; index: number; visible: boolean }> = ({
    char,
    index,
    visible,
  }) => (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
        visible
          ? 'opacity-100 translate-y-0 rotate-0'
          : 'opacity-0 -translate-y-24 rotate-3'
      }`}
      style={{
        transitionDelay: `${index * 120}ms`,
        width: 'clamp(3rem, 10vw, 6rem)',
        height: 'clamp(3rem, 10vw, 6rem)',
      }}
    >
      {/* Type block 3D body */}
      <div
        className={`absolute inset-0 rounded-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={leadBlockStyle}
      >
        {/* Metallic Shine (pseudo-element simulation) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-sm" />
        {/* Dirty Lead Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
      </div>

      {/* The character (Reverse/Mirrored like actual type, then corrected? No, let's keep it readable but styled) */}
      <span
        className="relative z-10 font-serif font-black text-[#333333] leading-none"
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          textShadow: '0 1px 1px rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.2)',
          filter: 'contrast(1.2)'
        }}
      >
        {char}
      </span>
      
      {/* Heavy drop dust effect */}
      {visible && (
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-2 bg-[#000]/20 blur-md rounded-full animate-[ping_0.4s_cubic-bezier(0,0,0.2,1)]"
          style={{ animationDelay: `${index * 120 + 200}ms` }}
        />
      )}
    </div>
  );

  return (
    <div className="relative flex flex-col items-center justify-center py-12 md:py-32">
      {/* Decorative vertical lines (Typesetting Grid) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05] flex justify-center gap-1">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-[1px] h-full bg-[#333333]"
          />
        ))}
      </div>

      {/* Main brand text - movable type animation */}
      <div className="relative flex items-center gap-2 md:gap-4 mb-12 md:mb-20">
        {brandName.split('').map((char, i) => (
          <TypeBlock key={i} char={char} index={i} visible={i < visibleChars || isComplete} />
        ))}
      </div>

      {/* Small decorative seal stamp */}
      <div
        className={`relative w-16 h-16 md:w-20 md:h-20 mb-8 md:mb-12 transition-all duration-700 cubic-bezier(0.68, -0.55, 0.27, 1.55) ${
          showTagline ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
        }`}
      >
        <div className="absolute inset-0 border-[3px] border-[#C83F49] rounded-md" />
        <div className="absolute inset-1 border border-[#C83F49]/50 rounded-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[#C83F49] font-serif font-bold text-3xl"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            印
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div
        className={`relative transition-all duration-1000 delay-300 ${
          showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p
          className="text-base md:text-xl tracking-[0.5em] text-[#333333]/80 font-serif"
          style={{
            fontFamily: "'Noto Serif TC', serif",
            textShadow: '0 1px 0 rgba(255,255,255,1)'
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Decorative horizontal rule */}
      <div
        className={`flex items-center gap-6 mt-12 md:mt-16 transition-all duration-1000 delay-500 ${
          showTagline ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      >
        <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-[#B08D57] to-transparent" />
        <div className="text-[#B08D57] text-xs">◆</div>
        <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-[#B08D57] to-transparent" />
      </div>

      {/* Background watermark character */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none transition-all duration-[3000ms] ${
          stage >= 2 ? 'opacity-[0.03] scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'
        }`}
      >
        <span
          className="text-[300px] md:text-[600px] text-[#333333] font-serif font-black leading-none"
          style={{ fontFamily: "'Noto Serif TC', serif" }}
        >
          活
        </span>
      </div>
    </div>
  );
};

export default SealKV;