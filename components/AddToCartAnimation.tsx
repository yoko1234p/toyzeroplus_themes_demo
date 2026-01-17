import React, { useEffect, useState } from 'react';

interface AddToCartAnimationProps {
  show: boolean;
  onComplete: () => void;
  startPosition?: { x: number; y: number };
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({
  show,
  onComplete,
  startPosition
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (show) {
      // 設定起始位置
      if (startPosition) {
        setPosition(startPosition);
      }

      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete, startPosition]);

  if (!show) return null;

  // 購物車圖標位置（右上角）
  const cartPosition = typeof window !== 'undefined'
    ? { x: window.innerWidth - 40, y: 28 }
    : { x: 0, y: 0 };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div
        className="absolute w-4 h-4 bg-[#C83F49] rounded-full shadow-lg animate-fly-to-cart"
        style={{
          '--start-x': `${position.x}px`,
          '--start-y': `${position.y}px`,
          '--end-x': `${cartPosition.x}px`,
          '--end-y': `${cartPosition.y}px`,
        } as React.CSSProperties}
      />
      <style>{`
        @keyframes fly-to-cart {
          0% {
            left: var(--start-x);
            top: var(--start-y);
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          80% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            left: var(--end-x);
            top: var(--end-y);
            transform: scale(0.3);
            opacity: 0;
          }
        }
        .animate-fly-to-cart {
          animation: fly-to-cart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
};

export default AddToCartAnimation;
