
import React, { useState } from 'react';
import { Product, ThemeMode } from '../types';

interface CheckoutPageProps {
  product: Product | null;
  onBack: () => void;
  theme: ThemeMode;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ product, onBack, theme }) => {
  const [purchased, setPurchased] = useState(false);
  const isDark = theme === 'dark';

  if (!product) return null;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchased(true);
  };

  const styles = {
    bg: isDark ? 'bg-black' : 'bg-[#f4f4f0]',
    textMain: isDark ? 'text-zinc-200' : 'text-black',
    textSub: isDark ? 'text-zinc-500' : 'text-zinc-600',
    border: isDark ? 'border-zinc-800' : 'border-black',
    accent: isDark ? 'text-red-700' : 'text-red-700',
    inputBorder: isDark ? 'focus-within:border-red-600' : 'focus-within:border-yellow-600',
    button: isDark ? 'bg-red-700 text-black hover:bg-white' : 'bg-black text-white hover:bg-red-700',
  };

  if (purchased) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-8 text-center ${styles.bg}`}>
        <div className="font-lhkk text-8xl text-red-700 mb-8 animate-pulse">遺忘</div>
        <h2 className={`text-4xl font-serif italic mb-4 font-lhkk ${styles.textMain}`}>交易已永恆</h2>
        <p className={`font-lhkk max-w-md mb-12 ${styles.textSub}`}>
          "這件物品現在屬於你了。但想擁有它的那份記憶......它屬於這座城市。"
        </p>
        <button 
          onClick={onBack}
          className={`border ${styles.border} px-12 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-900 hover:text-white transition-all font-lhkk ${styles.textMain}`}
        >
          回到雨中
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-500 ${styles.bg}`}>
      {/* Left Side: Product Image & Cinematic Vibe */}
      <div className={`lg:w-1/2 relative h-64 lg:h-screen overflow-hidden border-r ${styles.border}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-1000 ${isDark ? 'grayscale brightness-50' : 'grayscale contrast-125'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-transparent to-black opacity-60' : 'from-[#f4f4f0] via-transparent to-transparent opacity-30'}`} />
        <div className={`absolute inset-0 mix-blend-color ${isDark ? 'bg-red-900/10' : 'bg-yellow-900/5'}`} />
        
        <div className="absolute top-12 left-12">
          <button onClick={onBack} className={`flex items-center gap-4 group ${isDark ? 'text-white' : 'text-black'}`}>
            <span className="text-2xl group-hover:-translate-x-2 transition-transform">←</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold font-lhkk">撤回</span>
          </button>
        </div>

        <div className="absolute bottom-12 left-12 right-12">
          <div className={`writing-vertical absolute -right-4 bottom-0 text-9xl font-lhkk ${isDark ? 'text-white opacity-10' : 'text-red-900 opacity-5'}`}>
            {product.calligraphy}
          </div>
          <h1 className={`text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 font-lhkk ${styles.accent}`}>
            {product.name}
          </h1>
          <p className={`font-lhkk italic max-w-sm text-lg ${isDark ? 'text-zinc-400' : 'text-black'}`}>
            "{product.description}"
          </p>
        </div>
      </div>

      {/* Right Side: Brutalist Checkout Form */}
      <div className="lg:w-1/2 p-8 md:p-24 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <header className={`mb-12 border-b pb-8 ${styles.border}`}>
            <div className={`text-[10px] uppercase tracking-[0.5em] mb-2 font-lhkk ${styles.textSub}`}>結帳程序</div>
            <div className="flex justify-between items-end">
              <h2 className={`text-3xl font-serif italic font-lhkk ${styles.textMain}`}>最終清單</h2>
              <span className="text-red-600 font-mono text-xl">
                {product.formattedPrice || (typeof product.price === 'number' ? `HK$${product.price}` : product.price)}
              </span>
            </div>
          </header>

          <form onSubmit={handlePurchase} className="space-y-8">
            <div className="space-y-6">
              <div className={`group border-b transition-colors py-2 ${styles.border} ${styles.inputBorder}`}>
                <label className={`block text-[10px] uppercase tracking-widest mb-1 transition-colors font-lhkk ${styles.textSub} group-focus-within:text-red-500`}>
                  身份 / 電郵
                </label>
                <input 
                  required
                  type="email" 
                  placeholder="LONELY.SOUL@CITY.COM"
                  className={`w-full bg-transparent outline-none text-xl font-serif py-2 placeholder:opacity-20 ${styles.textMain}`}
                />
              </div>

              <div className={`group border-b transition-colors py-2 ${styles.border} ${styles.inputBorder}`}>
                <label className={`block text-[10px] uppercase tracking-widest mb-1 transition-colors font-lhkk ${styles.textSub} group-focus-within:text-red-500`}>
                  傳送座標
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="九龍 2046 號"
                  className={`w-full bg-transparent outline-none text-xl font-lhkk py-2 placeholder:opacity-20 ${styles.textMain}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className={`group border-b transition-colors py-2 ${styles.border} ${styles.inputBorder}`}>
                  <label className={`block text-[10px] uppercase tracking-widest mb-1 transition-colors font-lhkk ${styles.textSub} group-focus-within:text-red-500`}>
                    遺跡代碼
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="XXXX XXXX"
                    className={`w-full bg-transparent outline-none text-xl font-mono py-2 tracking-widest placeholder:opacity-20 ${styles.textMain}`}
                  />
                </div>
                <div className={`group border-b transition-colors py-2 ${styles.border} ${styles.inputBorder}`}>
                  <label className={`block text-[10px] uppercase tracking-widest mb-1 transition-colors font-lhkk ${styles.textSub} group-focus-within:text-red-500`}>
                    期限
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="MM/YY"
                    className={`w-full bg-transparent outline-none text-xl font-mono py-2 placeholder:opacity-20 ${styles.textMain}`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-12">
              <button 
                type="submit"
                className={`w-full py-6 font-black uppercase tracking-[0.4em] text-sm transition-all shadow-[0_10px_30px_rgba(185,28,28,0.3)] font-lhkk ${styles.button}`}
              >
                封存記憶
              </button>
              <p className={`mt-6 text-center text-[10px] uppercase tracking-widest font-lhkk ${styles.textSub}`}>
                通過虛空安全加密。雨停後不設退換。
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
