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
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (show) {
      // 設定起始位置
      if (startPosition) {
        setPosition(startPosition);
      }

      // 計算購物車按鈕位置（右下角 fixed bottom-20 right-6, w-14 h-14）
      if (typeof window !== 'undefined') {
        setCartPosition({
          x: window.innerWidth - 52,
          y: window.innerHeight - 108
        });
      }

      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete, startPosition]);

  if (!show) return null;

  // 計算拋物線參數
  const deltaX = cartPosition.x - position.x;
  const deltaY = cartPosition.y - position.y;
  // 拋物線頂點高度（向上拋）
  const arcHeight = Math.min(150, Math.abs(deltaX) * 0.3);

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
      {/* 外層控制 X 軸移動 (linear) */}
      <div
        className="absolute animate-fly-x"
        style={{
          left: position.x,
          top: 0,
          '--delta-x': `${deltaX}px`,
        } as React.CSSProperties}
      >
        {/* 內層控制 Y 軸移動 (模擬重力拋物線) */}
        <div
          className="animate-fly-y"
          style={{
            '--start-y': `${position.y}px`,
            '--arc-height': `${arcHeight}px`,
            '--end-y': `${cartPosition.y}px`,
          } as React.CSSProperties}
        >
          {/* 紅點 + 縮放效果 */}
          <div className="w-4 h-4 bg-[#C83F49] rounded-full shadow-lg animate-fly-scale">
            <div className="absolute inset-0 bg-[#C83F49] rounded-full animate-ping opacity-75" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fly-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--delta-x));
          }
        }

        @keyframes fly-y {
          0% {
            transform: translateY(var(--start-y));
          }
          40% {
            transform: translateY(calc(var(--start-y) - var(--arc-height)));
          }
          100% {
            transform: translateY(var(--end-y));
          }
        }

        @keyframes fly-scale {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          30% {
            transform: scale(1.4);
            opacity: 1;
          }
          70% {
            transform: scale(1);
            opacity: 1;
          }
          90% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        .animate-fly-x {
          animation: fly-x 0.75s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }

        .animate-fly-y {
          animation: fly-y 0.75s cubic-bezier(0.5, 0, 0.75, 0) forwards;
        }

        .animate-fly-scale {
          animation: fly-scale 0.75s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddToCartAnimation;
