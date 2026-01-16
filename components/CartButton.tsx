import React, { useState } from 'react';
import { ThemeMode } from '../types';

interface CartButtonProps {
  itemCount: number;
  checkoutUrl: string | null;
  loading?: boolean;
  theme: ThemeMode;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, checkoutUrl, loading, theme }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isDark = theme === 'dark';
  const isCompany = theme === 'company';
  const isSeal = theme === 'seal';
  const isCard = theme === 'card';

  // Theme-specific styles
  const getButtonStyles = () => {
    if (isDark) {
      return 'bg-red-900/90 hover:bg-red-800 border-red-700 text-red-100';
    }
    if (isCompany || isSeal) {
      return 'bg-[#C83F49] hover:bg-[#B03540] border-[#C83F49] text-white';
    }
    if (isCard) {
      return 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white';
    }
    // Light mode
    return 'bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-white';
  };

  const getBadgeStyles = () => {
    if (isDark) {
      return 'bg-red-500 text-white';
    }
    if (isCompany || isSeal) {
      return 'bg-[#B08D57] text-white';
    }
    return 'bg-red-500 text-white';
  };

  const handleClick = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={loading || itemCount === 0}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        border-2 shadow-lg
        transition-all duration-300
        ${getButtonStyles()}
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${itemCount === 0 ? 'opacity-60' : 'hover:scale-110'}
      `}
      title={itemCount > 0 ? `購物車 (${itemCount}) - 點擊結帳` : '購物車'}
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span
          className={`
            absolute -top-1 -right-1
            min-w-[20px] h-5 px-1
            rounded-full
            flex items-center justify-center
            text-xs font-bold
            ${getBadgeStyles()}
            transition-transform duration-300
            ${isHovered ? 'scale-110' : ''}
          `}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
};

export default CartButton;
