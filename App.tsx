
import React, { useState, useEffect } from 'react';
import NeonLogo from './components/NeonLogo';
import HappyPrintingLogo from './components/HappyPrintingLogo';
import GreetingCardKV from './components/GreetingCardKV';
import CalligraphySection from './components/CalligraphySection';
import ProductGrid from './components/ProductGrid';
import Marquee from './components/Marquee';
import OpeningAnimation from './components/OpeningAnimation';
import CheckoutPage from './components/CheckoutPage';
import FadeIn from './components/FadeIn';
import ThemeToggle from './components/ThemeToggle';
import { GoogleGenAI } from "@google/genai";
import { Product, ThemeMode } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'leading' | 'checkout'>('intro');
  // Default 'light' (Day/Paper mode)
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  // Animation State for Light/Card modes
  // 0: Init, 1: Draw Strokes/Card Enter, 2: Fill Text, 3: Show Hero Content, 4: Complete
  const [lightModeStage, setLightModeStage] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiMessage, setAiMessage] = useState<string>("文字的重量，取決於墨水的濃度...");
  const [loadingAi, setLoadingAi] = useState(false);

  // Initial Boot Logic
  useEffect(() => {
    // If starting in Light or Card Mode, bypass 'intro' view and start integrated animation
    if (theme !== 'dark') {
      setView('leading');
      setLightModeStage(1);
    }
  }, []);

  // Handle Sequence when stage changes (For Light and Card modes)
  useEffect(() => {
    if (theme === 'dark') return;

    if (lightModeStage === 1) {
      // Stage 1: Strokes draw / Card enters (2.0s)
      const timer = setTimeout(() => setLightModeStage(2), 2000);
      return () => clearTimeout(timer);
    }
    if (lightModeStage === 2) {
      // Stage 2: Text fills (1.5s)
      const timer = setTimeout(() => setLightModeStage(3), 1500);
      return () => clearTimeout(timer);
    }
    if (lightModeStage === 3) {
      // Stage 3: Content fades in
      const timer = setTimeout(() => setLightModeStage(4), 1000);
      return () => clearTimeout(timer);
    }
  }, [lightModeStage, theme]);

  // Theme Switch Handler
  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      // Switching TO Dark Mode -> Trigger Cinematic Intro
      setView('intro');
      setLightModeStage(0);
    } else {
      // Switching TO Light or Card Mode -> Reset to leading view and restart animation sequence
      setView('leading');
      setLightModeStage(0);
      // Small delay to allow reset to take effect before starting animation
      setTimeout(() => setLightModeStage(1), 50);
    }
  };

  const fetchAiMood = async () => {
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a short, melancholic, Wong Kar-wai style line in Traditional Chinese (Hong Kong cantonese flavor) about letterpress printing, lead type, heavy ink, paper texture, or fading memories. Max 15 words.",
        config: { temperature: 0.9 }
      });
      if (response.text) {
        setAiMessage(response.text.trim());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAcquire = (product: Product) => {
    setSelectedProduct(product);
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('leading');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Define Theme Colors
  const isDark = theme === 'dark';
  const styles = {
    bg: isDark ? 'bg-[#050505]' : 'bg-[#f4f4f0]', // Dark vs Paper White
    textMain: isDark ? 'text-zinc-200' : 'text-black',
    textSub: isDark ? 'text-zinc-400' : 'text-zinc-600',
    border: isDark ? 'border-zinc-900' : 'border-black',
    accent: isDark ? 'text-red-800' : 'text-red-700',
    goldAccent: isDark ? 'text-red-900' : 'text-yellow-700',
    buttonBg: isDark ? 'bg-red-800 hover:bg-white' : 'bg-red-700 hover:bg-black',
    selection: isDark ? 'selection:bg-red-600 selection:text-white' : 'selection:bg-black selection:text-white',
    inputBorder: isDark ? 'focus-within:border-red-900' : 'focus-within:border-yellow-600',
  };

  if (view === 'checkout') {
    return <CheckoutPage product={selectedProduct} onBack={handleBack} theme={theme} />;
  }

  const CornerLabel = ({ char, position }: { char: string, position: string }) => {
    // Fade in during Stage 3 for non-dark modes
    const opacity = !isDark && lightModeStage < 3 ? 'opacity-0' : 'opacity-100';
    return (
      <div className={`fixed z-[100] font-['Noto_Serif_TC'] text-3xl md:text-5xl font-black select-none pointer-events-none transition-all duration-1000 ${opacity} ${position} ${isDark ? 'text-red-900/60' : 'text-red-700/80'}`}>
        {char}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden transition-colors duration-700 ${styles.bg} ${styles.selection} ${view === 'intro' ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Dark Mode Overlay Intro */}
      {view === 'intro' && isDark && (
        <OpeningAnimation onComplete={() => setView('leading')} theme={theme} />
      )}
      
      <ThemeToggle theme={theme} onToggle={handleThemeChange} />

      {/* Corner Branding Persistence */}
      <CornerLabel char="快" position="top-6 left-6" />
      <CornerLabel char="樂" position="top-6 right-6" />
      <CornerLabel char="印" position="bottom-6 left-6" />
      <CornerLabel char="刷" position="bottom-6 right-6" />

      {/* Hero Section */}
      <header className={`relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden border-b transition-colors duration-500 ${styles.border}`}>
        {/* Background Image / Texture */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${(!isDark && lightModeStage < 3) ? 'opacity-0' : 'opacity-100'}`}>
          <img 
            src="https://images.unsplash.com/photo-1511413342084-c57930101869?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className={`w-full h-full object-cover scale-110 animate-[pulse_10s_infinite] transition-all duration-1000 ${isDark ? 'opacity-30 brightness-50' : 'opacity-10 brightness-110 saturate-0'}`}
          />
          <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'wkw-gradient' : 'bg-[#f4f4f0]/80 mix-blend-lighten'}`} />
          {/* Paper Texture Overlay for Light/Card Mode */}
          {!isDark && (
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
          )}
        </div>

        {/* Side Calligraphy (Vertical) */}
        <div className={`transition-opacity duration-1000 ${(!isDark && lightModeStage < 3) ? 'opacity-0' : 'opacity-100'}`}>
          <CalligraphySection text="活版" theme={theme} className="absolute left-20 top-1/2 -translate-y-1/2 hidden lg:block" />
          <CalligraphySection text="排版" theme={theme} className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block" />
        </div>

        <FadeIn className="relative z-10 text-center flex flex-col items-center">
          {/* KEY VISUAL SWITCHER */}
          <div className="flex items-center justify-center min-h-[400px]">
            {theme === 'dark' ? (
              <NeonLogo theme={theme} />
            ) : theme === 'card' ? (
              <GreetingCardKV stage={lightModeStage} />
            ) : (
              <HappyPrintingLogo 
                theme={theme} 
                animate={true} 
                stage={lightModeStage} 
                className="scale-75 md:scale-100" 
              />
            )}
          </div>

          {/* Hero Text & Button (Fade in last) */}
          <div className={`max-w-md mt-12 transition-all duration-1000 ${(!isDark && lightModeStage < 3) ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <p className={`text-lg md:text-xl font-['Noto_Serif_TC'] italic leading-relaxed mb-12 drop-shadow-sm transition-colors duration-500 ${styles.textSub}`}>
              "如果記憶可以排版成鉛字，我希望這行字永遠不會被拆解。"
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('essences');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold tracking-widest text-xs uppercase transition-all duration-500 text-black font-['Noto_Serif_TC'] ${styles.buttonBg}`}
            >
              <span className={`relative z-10 ${isDark ? 'text-black' : 'text-white'}`}>開始檢字</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
            </button>
          </div>
        </FadeIn>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 ${(!isDark && lightModeStage < 3) ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 animate-pulse font-['Noto_Serif_TC']">往下滑動以壓印</span>
          <div className={`w-[1px] h-12 bg-gradient-to-b from-transparent to-transparent ${isDark ? 'via-red-900' : 'via-black'}`}></div>
        </div>
      </header>

      <Marquee theme={theme} />

      <main className={`relative z-10 border-x transition-colors duration-500 mx-0 md:mx-6 ${styles.border} ${styles.bg}`}>
        <section className={`py-40 px-8 md:px-24 grid md:grid-cols-2 gap-24 items-center border-b transition-colors duration-500 ${styles.border}`}>
          <FadeIn className="relative">
            <h2 className={`text-5xl md:text-7xl font-serif font-black italic leading-none mb-10 font-['Noto_Serif_TC'] transition-colors duration-500 ${styles.accent}`}>
              字裏行間。<br />千鈞一髮。
            </h2>
            <p className={`font-['Noto_Serif_TC'] text-lg leading-loose mb-10 max-w-sm transition-colors duration-500 ${styles.textSub}`}>
              "其實了解一個人並不代表什麼，人是會變的。今天他喜歡宋體，明天他可以喜歡黑體。我們只負責將你此刻的重量壓進紙張的紋理。"
            </p>
            <div className={`p-8 border-l-4 backdrop-blur-sm flex flex-col gap-6 transition-colors duration-500 ${isDark ? 'border-red-900 bg-zinc-950/50' : 'border-black bg-white/50'}`}>
              <p className={`text-sm italic font-['Noto_Serif_TC'] transition-opacity duration-1000 ${styles.textMain} ${loadingAi ? 'opacity-30' : 'opacity-100'}`}>
                "{aiMessage}"
              </p>
              <button 
                onClick={fetchAiMood}
                disabled={loadingAi}
                className={`text-[10px] uppercase tracking-[0.4em] font-black transition-colors self-start border-b pb-1 font-['Noto_Serif_TC'] ${isDark ? 'text-red-700 hover:text-white border-red-900/30' : 'text-red-700 hover:text-black border-red-700/30'}`}
              >
                {loadingAi ? '正在鑄字...' : '重排版面'}
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={200} className="relative group">
            <div className={`absolute -inset-4 border transition-colors duration-1000 ${isDark ? 'border-zinc-800 group-hover:border-red-900/50' : 'border-zinc-300 group-hover:border-black'}`}></div>
            <img 
              src="https://images.unsplash.com/photo-1518112166137-859095696144?q=80&w=2000&auto=format&fit=crop" 
              alt="Atmospheric" 
              className={`relative z-10 w-full aspect-[4/5] object-cover transition-all duration-[2000ms] ease-out ${isDark ? 'grayscale brightness-[0.4] group-hover:brightness-100' : 'grayscale contrast-125 brightness-110 group-hover:grayscale-0'}`} 
            />
            <div className={`absolute inset-0 z-20 bg-gradient-to-t opacity-60 ${isDark ? 'from-black to-transparent' : 'from-[#f4f4f0] via-transparent to-transparent'}`}></div>
          </FadeIn>
        </section>

        <section id="essences" className={`transition-colors duration-500 ${isDark ? 'bg-[#080808]' : 'bg-[#fff]'}`}>
          <FadeIn className={`px-10 py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b transition-colors duration-500 ${styles.border}`}>
            <div>
              <div className={`text-[10px] uppercase tracking-[0.6em] font-bold mb-2 font-['Noto_Serif_TC'] ${styles.goldAccent}`}>絕版鉛字</div>
              <h2 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter font-['Noto_Serif_TC'] transition-colors duration-500 ${styles.textMain}`}>遺失的字模</h2>
            </div>
            <div className={`text-[10px] tracking-widest font-bold uppercase px-4 py-2 border transition-colors duration-500 ${isDark ? 'text-zinc-600 bg-zinc-900/50 border-zinc-800' : 'text-black bg-white border-black'}`}>
              22.31° N / 114.17° E
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <ProductGrid onAcquire={handleAcquire} theme={theme} />
          </FadeIn>
        </section>

        <section className={`py-60 px-8 flex flex-col items-center text-center relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-[#e8e6dc]'}`}>
          <FadeIn className="relative z-10 max-w-3xl">
            <h3 className={`text-3xl md:text-5xl font-['Noto_Serif_TC'] italic mb-16 leading-tight transition-colors duration-500 ${isDark ? 'text-zinc-200' : 'text-black'}`}>"以前我以為有一種墨一開始印就會滲到紙背，原來它什麼痕跡都沒有留下，那行字一開始就已經乾了。"</h3>
            <p className={`mb-12 font-['Noto_Serif_TC'] tracking-widest text-sm uppercase transition-colors duration-500 ${styles.textSub}`}>輸入你的地址，我們會把那塊鉛字寄給你。</p>
            <div className={`flex flex-col md:flex-row gap-0 w-full border transition-all duration-700 ${styles.border} ${styles.inputBorder}`}>
              <input 
                type="email" 
                placeholder="LONELY.SOUL@KOWLOON.COM" 
                className={`flex-grow bg-transparent px-10 py-6 outline-none font-serif text-lg transition-colors duration-500 ${styles.textMain} placeholder:opacity-30`}
              />
              <button className={`px-16 py-6 font-black uppercase tracking-[0.4em] text-xs transition-all duration-500 font-['Noto_Serif_TC'] ${isDark ? 'bg-red-900 text-black hover:bg-white' : 'bg-black text-white hover:bg-red-700'}`}>
                郵寄鉛華
              </button>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className={`py-32 px-10 border-t relative z-20 transition-colors duration-500 ${styles.border} ${isDark ? 'bg-zinc-950' : 'bg-[#f4f4f0]'}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] tracking-[0.4em] font-black uppercase font-['Noto_Serif_TC'] ${styles.textSub}`}>
          <div className="flex items-center gap-8">
            <span>© 1960-2046</span>
            <span className={`w-8 h-[1px] ${isDark ? 'bg-zinc-800' : 'bg-black'}`}></span>
            <span>快樂活版印刷公司</span>
          </div>
          <div className={`${isDark ? 'text-red-950' : 'text-red-700'} tracking-[0.8em]`}>專為傷心人排版</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
