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

      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete, startPosition]);

  if (!show) return null;

  // 購物車按鈕位置（右下角 fixed bottom-6 right-6, w-14 h-14）
  // bottom-6 = 24px, right-6 = 24px, 按鈕大小 = 56px
  // 中心點: x = innerWidth - 24 - 28, y = innerHeight - 24 - 28
  const cartPosition = typeof window !== 'undefined'
    ? { x: window.innerWidth - 52, y: window.innerHeight - 52 }
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
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          25% {
            transform: scale(1.3) translateY(-30px);
            opacity: 1;
          }
          50% {
            transform: scale(1.1) translateY(-15px);
            opacity: 1;
          }
          75% {
            transform: scale(0.9);
            opacity: 1;
          }
          90% {
            left: var(--end-x);
            top: var(--end-y);
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            left: var(--end-x);
            top: var(--end-y);
            transform: scale(0);
            opacity: 0;
          }
        }
        .animate-fly-to-cart {
          animation: fly-to-cart 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AddToCartAnimation;
