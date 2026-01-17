/**
 * Cart Page Component
 * 購物車頁面
 * 支援數量更新及移除產品
 */

import React from 'react';
import { ThemeMode } from '../types';
import { ShopifyCart, ShopifyCartLineItem } from '../services/shopify';

interface CartPageProps {
  cart: ShopifyCart | null;
  loading: boolean;
  onBack: () => void;
  onUpdateItem: (lineId: string, quantity: number) => Promise<void>;
  onRemoveItem: (lineId: string) => Promise<void>;
  theme?: ThemeMode;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  loading,
  onBack,
  onUpdateItem,
  onRemoveItem,
  theme = 'seal',
}) => {
  const isSeal = theme !== 'dark';
  const isDark = theme === 'dark';

  const getStyles = () => {
    if (isDark) {
      return {
        bg: 'bg-[#050505]',
        cardBg: 'bg-zinc-900',
        text: 'text-zinc-200',
        textSub: 'text-zinc-400',
        textSubHover: 'hover:text-zinc-200',
        border: 'border-zinc-800',
        accent: 'text-red-600',
        accentHover: 'hover:text-red-600',
        button: 'bg-red-800 hover:bg-red-700 text-white',
        buttonOutline: 'border-red-800 text-red-600 hover:bg-red-800 hover:text-white',
        hover: 'hover:bg-zinc-800',
      };
    }
    if (isSeal) {
      return {
        bg: 'bg-[#F9F9F9]',
        cardBg: 'bg-white',
        text: 'text-[#333333]',
        textSub: 'text-[#333333]/60',
        textSubHover: 'hover:text-[#333333]',
        border: 'border-[#EAEAEA]',
        accent: 'text-[#C83F49]',
        accentHover: 'hover:text-[#C83F49]',
        button: 'bg-[#C83F49] hover:bg-[#B03A42] text-white',
        buttonOutline: 'border-[#C83F49] text-[#C83F49] hover:bg-[#C83F49] hover:text-white',
        hover: 'hover:bg-[#F0F0F0]',
      };
    }
    return {
      bg: 'bg-[#f4f4f0]',
      cardBg: 'bg-white',
      text: 'text-black',
      textSub: 'text-zinc-600',
      textSubHover: 'hover:text-black',
      border: 'border-zinc-300',
      accent: 'text-red-700',
      accentHover: 'hover:text-red-700',
      button: 'bg-red-700 hover:bg-red-800 text-white',
      buttonOutline: 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white',
      hover: 'hover:bg-zinc-100',
    };
  };

  const styles = getStyles();

  // 格式化價格
  const formatPrice = (amount: string, currencyCode: string) => {
    const num = parseFloat(amount);
    if (currencyCode === 'HKD') {
      return `HK$${num.toFixed(0)}`;
    }
    return `${currencyCode} ${num.toFixed(2)}`;
  };

  // 取得 cart items
  const cartItems = cart?.lines?.edges?.map((edge) => edge.node) || [];
  const totalAmount = cart?.cost?.totalAmount;
  const checkoutUrl = cart?.checkoutUrl;

  // 處理數量更新
  const handleQuantityChange = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await onRemoveItem(lineId);
    } else {
      await onUpdateItem(lineId, newQuantity);
    }
  };

  // 空購物車狀態
  if (!cart || cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${styles.bg} py-8 px-4 md:px-8`}>
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`mb-8 flex items-center gap-2 text-sm font-lhkk ${styles.textSub} ${styles.textSubHover} transition-colors`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          回主頁
        </button>

        <div className="max-w-2xl mx-auto text-center py-20">
          <div className={`text-6xl mb-6 ${styles.textSub}`}>
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold mb-4 font-lhkk ${styles.text}`}>購物車係空嘅</h1>
          <p className={`mb-8 ${styles.textSub}`}>快啲去揀啲心水嘢啦！</p>
          <button
            onClick={onBack}
            className={`px-8 py-3 font-bold tracking-wider transition-all duration-300 ${styles.button}`}
          >
            繼續購物
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${styles.bg} py-8 px-4 md:px-8`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`mb-8 flex items-center gap-2 text-sm font-lhkk ${styles.textSub} ${styles.textSubHover} transition-colors`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        回主頁
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 font-lhkk ${styles.text}`}>購物車</h1>

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Cart Items */}
        <div className={`${styles.cardBg} border ${styles.border} divide-y ${styles.border}`}>
          {cartItems.map((item: ShopifyCartLineItem) => {
            const { merchandise } = item;
            const imageUrl = merchandise.image?.url;
            const productTitle = merchandise.product.title;
            const variantTitle = merchandise.title !== 'Default Title' ? merchandise.title : null;
            const price = merchandise.price;

            return (
              <div key={item.id} className="p-4 md:p-6 flex gap-4 md:gap-6">
                {/* Product Image */}
                <div className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border ${styles.border} p-2 flex items-center justify-center`}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={productTitle}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${styles.textSub}`}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold font-lhkk ${styles.text}`}>{productTitle}</h3>
                    {variantTitle && (
                      <p className={`text-sm ${styles.textSub}`}>{variantTitle}</p>
                    )}
                  </div>
                  <p className={`font-bold ${styles.accent}`}>
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    disabled={loading}
                    className={`p-1 ${styles.textSub} ${styles.accentHover} transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="移除產品"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className={`flex items-center border ${styles.border}`}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={loading}
                      className={`w-8 h-8 flex items-center justify-center ${styles.hover} transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-lg">-</span>
                    </button>
                    <span className={`w-10 text-center font-mono text-sm ${styles.text}`}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={loading}
                      className={`w-8 h-8 flex items-center justify-center ${styles.hover} transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-lg">+</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className={`mt-6 ${styles.cardBg} border ${styles.border} p-6`}>
          <div className="flex justify-between items-center mb-6">
            <span className={`text-lg ${styles.text}`}>總計</span>
            <span className={`text-2xl font-bold ${styles.accent}`}>
              {totalAmount ? formatPrice(totalAmount.amount, totalAmount.currencyCode) : '-'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBack}
              disabled={loading}
              className={`flex-1 py-3 px-6 border font-bold tracking-wider transition-all duration-300 ${styles.buttonOutline} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              繼續購物
            </button>
            <button
              onClick={() => {
                if (checkoutUrl) {
                  window.open(checkoutUrl, '_blank');
                }
              }}
              disabled={!checkoutUrl || loading}
              className={`flex-1 py-3 px-6 font-bold tracking-wider transition-all duration-300 ${styles.button} ${!checkoutUrl || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              前往結帳
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className={`mt-8 flex flex-wrap justify-center gap-6 text-sm ${styles.textSub}`}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            安全付款
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            支援多種付款方式
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
