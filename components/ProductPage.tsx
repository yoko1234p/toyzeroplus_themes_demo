/**
 * Product Detail Page Component
 * 產品詳情頁面
 */

import React, { useState, useEffect } from 'react';
import { MaximProduct, PRODUCTS } from '../data/products';
import { ThemeMode } from '../types';

interface ProductPageProps {
  product: MaximProduct;
  onBack: () => void;
  onAddToCart?: (product: MaximProduct) => void;
  onProductClick?: (product: MaximProduct) => void;
  theme?: ThemeMode;
}

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onProductClick,
  theme = 'seal'
}) => {
  // 取得其他產品（排除當前產品）
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // 確保 images array 存在，fallback 到單一 image
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  // Scroll to top when product page opens or product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [product.id]);

  // 所有非 Dark mode 都使用 Seal 樣式嘅產品頁
  const isSeal = theme !== 'dark';
  const isDark = theme === 'dark';

  // 只有當 originalPrice 存在且大於 price 時才計算折扣
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // 格式化價格顯示 (處理 number 和 string 兩種類型)
  const formatPrice = (value: number | string) => {
    if (typeof value === 'number') {
      return `HK$${value}`;
    }
    // 如果已經有 HK$ 前綴就直接返回
    if (typeof value === 'string' && value.startsWith('HK$')) {
      return value;
    }
    return `HK$${value}`;
  };

  const getStyles = () => {
    if (isDark) {
      return {
        bg: 'bg-[#050505]',
        cardBg: 'bg-zinc-900',
        text: 'text-zinc-200',
        textSub: 'text-zinc-400',
        border: 'border-zinc-800',
        accent: 'text-red-600',
        button: 'bg-red-800 hover:bg-red-700 text-white',
        buttonOutline: 'border-red-800 text-red-600 hover:bg-red-800 hover:text-white',
      };
    }
    if (isSeal) {
      return {
        bg: 'bg-[#F9F9F9]',
        cardBg: 'bg-white',
        text: 'text-[#333333]',
        textSub: 'text-[#333333]/60',
        border: 'border-[#EAEAEA]',
        accent: 'text-[#C83F49]',
        button: 'bg-[#C83F49] hover:bg-[#B03A42] text-white',
        buttonOutline: 'border-[#C83F49] text-[#C83F49] hover:bg-[#C83F49] hover:text-white',
      };
    }
    return {
      bg: 'bg-[#f4f4f0]',
      cardBg: 'bg-white',
      text: 'text-black',
      textSub: 'text-zinc-600',
      border: 'border-zinc-300',
      accent: 'text-red-700',
      button: 'bg-red-700 hover:bg-red-800 text-white',
      buttonOutline: 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white',
    };
  };

  const styles = getStyles();

  return (
    <div className={`min-h-screen ${styles.bg} py-8 px-4 md:px-8`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`mb-8 flex items-center gap-2 text-sm font-lhkk ${styles.textSub} hover:${styles.text} transition-colors`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        回主頁
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className={`aspect-square ${styles.cardBg} border ${styles.border} p-4 flex items-center justify-center`}>
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="flex gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 border-2 p-1 transition-colors ${
                    selectedImageIndex === index
                      ? `${styles.accent} border-current`
                      : `${styles.border} hover:border-current`
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Price */}
          <div>
            <p className={`text-xs tracking-widest uppercase mb-2 ${styles.textSub}`}>
              {product.category === 'turnip-pudding' ? '蘿蔔糕' : '芋頭糕'}
            </p>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-2 font-lhkk ${styles.text}`}
            >
              {product.name}
            </h1>
            <p className={`text-sm ${styles.textSub}`}>{product.nameEn}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className={`text-3xl font-bold ${styles.accent}`}>
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <>
                <span className={`text-lg line-through ${styles.textSub}`}>
                  {formatPrice(product.originalPrice!)}
                </span>
                <span className={`px-2 py-1 text-xs font-bold bg-red-100 ${styles.accent}`}>
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {product.detailedDescription && (
            <div className={`py-6 border-t border-b ${styles.border}`}>
              <p className={`text-base leading-relaxed font-lhkk ${styles.text}`}>
                {product.detailedHighlightText && product.detailedDescription.includes(product.detailedHighlightText) ? (
                  <>
                    {product.detailedDescription.split(product.detailedHighlightText)[0]}
                    <span className="product-highlight-text">{product.detailedHighlightText}</span>
                    {product.detailedDescription.split(product.detailedHighlightText).slice(1).join(product.detailedHighlightText)}
                  </>
                ) : (
                  product.detailedDescription
                )}
              </p>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3
                className={`text-sm font-bold mb-3 font-lhkk ${styles.text}`}
              >
                產品特色
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${styles.textSub}`}>
                    <span className={styles.accent}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pickup Methods */}
          {product.pickupMethods && product.pickupMethods.length > 0 && (
            <div className={`${styles.cardBg} border ${styles.border} p-4`}>
              <h3
                className={`text-sm font-bold mb-3 font-lhkk ${styles.text}`}
              >
                取貨方式
              </h3>
              {product.pickupMethods.map(method => (
                <div key={method.id} className="flex items-start gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <p className={`font-medium ${styles.text}`}>{method.name}</p>
                    <p className={`text-sm ${styles.textSub}`}>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Redemption Info */}
          {(product.redemptionPeriod || product.redemptionLocations || product.weight || product.madeIn) && (
            <div className={`text-sm ${styles.textSub} space-y-2`}>
              {product.redemptionPeriod && (
                <p><strong className={styles.text}>換領期：</strong>{product.redemptionPeriod}</p>
              )}
              {product.redemptionLocations && product.redemptionLocations.length > 0 && (
                <>
                  <p><strong className={styles.text}>換領地點：</strong></p>
                  <ul className="list-disc list-inside pl-2">
                    {product.redemptionLocations.map((loc, i) => (
                      <li key={i}>{loc}</li>
                    ))}
                  </ul>
                </>
              )}
              {product.weight && (
                <p><strong className={styles.text}>重量：</strong>{product.weight}</p>
              )}
              {product.dimensions && (
                <p><strong className={styles.text}>尺寸：</strong>{product.dimensions}</p>
              )}
              {product.madeIn && (
                <p><strong className={styles.text}>產地：</strong>{product.madeIn}</p>
              )}
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className={`flex items-center border ${styles.border}`}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className={`px-4 py-3 ${styles.textSub} hover:${styles.text}`}
              >
                -
              </button>
              <span className={`px-6 py-3 ${styles.text} font-medium`}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className={`px-4 py-3 ${styles.textSub} hover:${styles.text}`}
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart?.(product)}
              className={`flex-1 py-3 px-8 font-bold tracking-widest text-sm transition-colors font-lhkk ${styles.button}`}
            >
              加入購物車
            </button>
          </div>

          {/* Made in HK Badge */}
          <div className="flex items-center gap-2 pt-4">
            <span className="text-2xl">🇭🇰</span>
            <span className={`text-sm ${styles.textSub}`}>100% 香港製造</span>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      {product.ingredients && (
        <div className={`max-w-6xl mx-auto mt-16 pt-8 border-t ${styles.border}`}>
          <h2
            className={`text-xl font-bold mb-4 font-lhkk ${styles.text}`}
          >
            主要成分
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing, i) => (
              <span
                key={i}
                className={`px-3 py-1 text-sm border ${styles.border} ${styles.textSub}`}
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 你可能還感興趣的 - Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className={`max-w-6xl mx-auto mt-16 pt-8 border-t ${styles.border}`}>
          <h2
            className={`text-xl font-bold mb-6 font-lhkk ${styles.text}`}
          >
            你可能還感興趣的
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                onClick={() => onProductClick?.(relatedProduct)}
                className={`group cursor-pointer flex gap-4 p-4 border ${styles.border} ${styles.cardBg} hover:shadow-lg transition-all duration-300`}
              >
                {/* Product Image */}
                <div className={`w-24 h-24 flex-shrink-0 border ${styles.border} p-2 flex items-center justify-center`}>
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className={`text-xs tracking-widest uppercase mb-1 ${styles.textSub}`}>
                    {relatedProduct.category === 'turnip-pudding' ? '蘿蔔糕' : '芋頭糕'}
                  </p>
                  <h3
                    className={`text-lg font-bold mb-1 font-lhkk ${styles.text} group-hover:${styles.accent} transition-colors`}
                  >
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${styles.accent}`}>{formatPrice(relatedProduct.price)}</span>
                    {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                      <span className={`text-sm line-through ${styles.textSub}`}>{formatPrice(relatedProduct.originalPrice)}</span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div className={`flex items-center ${styles.textSub} group-hover:${styles.accent} transition-colors`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        /* Product Description Highlight - 淡色版本，只 target 重點文字 */
        .product-highlight-text {
          background: linear-gradient(120deg, ${isSeal ? 'rgba(176, 141, 87, 0.35)' : isDark ? 'rgba(153, 27, 27, 0.4)' : 'rgba(176, 141, 87, 0.35)'} 0%, ${isSeal ? 'rgba(212, 175, 55, 0.35)' : isDark ? 'rgba(220, 38, 38, 0.4)' : 'rgba(212, 175, 55, 0.35)'} 100%);
          background-repeat: no-repeat;
          background-size: 100% 40%;
          background-position: 0 88%;
          padding: 2px 4px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
