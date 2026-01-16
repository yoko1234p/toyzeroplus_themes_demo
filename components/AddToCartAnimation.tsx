import React, { useEffect } from 'react';

interface AddToCartAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({ show, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-bounce-up bg-[#C83F49] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <svg className="w-5 h-5 animate-spin-once" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-bold">已加入購物車</span>
      </div>
      <style>{`
        @keyframes bounce-up {
          0% { transform: translateY(100px); opacity: 0; }
          20% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        @keyframes spin-once {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-bounce-up { animation: bounce-up 1.5s ease-out forwards; }
        .animate-spin-once { animation: spin-once 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AddToCartAnimation;
