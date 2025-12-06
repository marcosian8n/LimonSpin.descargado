import React, { useState, useEffect, useCallback } from 'react';
import { PRIZES, TOTAL_CHANCES, SPIN_DURATION_MS, ROTATIONS_PER_SPIN } from './constants';
import { Prize } from './types';
import RouletteWheel from './components/RouletteWheel';
import ResultModal from './components/ResultModal';
import { generatePartyMessage } from './services/geminiService';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<{ prize: Prize; message: string | null } | null>(null);
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState({ width: 320 });

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 40, 400); // Max 400px, padding 20px
      setDimensions({ width });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spinWheel = useCallback(async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // --- LOGIC: 1 in 150 Probability for Sernova ---
    const roll = Math.floor(Math.random() * TOTAL_CHANCES) + 1; // 1 to 150
    let winningPrizeIndex = -1;

    // Check for Grand Prize (Sernova)
    const sernovaIndex = PRIZES.findIndex(p => p.id === 'sernova');
    
    if (roll === 1 && sernovaIndex !== -1) {
       // JACKPOT!
       winningPrizeIndex = sernovaIndex;
    } else {
       // Filter out Sernova from the remaining pool to pick randomly
       const regularPrizes = PRIZES.filter(p => p.id !== 'sernova');
       const randomRegular = regularPrizes[Math.floor(Math.random() * regularPrizes.length)];
       winningPrizeIndex = PRIZES.findIndex(p => p.id === randomRegular.id);
    }
    // ------------------------------------------------

    // --- MATH FIX for Rotation alignment ---
    const sliceAngle = 360 / PRIZES.length;
    const centerAngle = (winningPrizeIndex * sliceAngle) + (sliceAngle / 2);
    
    // Add random jitter within 80% of the slice
    const jitterRange = sliceAngle * 0.8;
    const randomOffset = (Math.random() * jitterRange) - (jitterRange / 2);
    
    const targetAngleInCircle = centerAngle + randomOffset;
    
    const minAddedRotation = 360 * ROTATIONS_PER_SPIN;
    let nextRotation = rotation + minAddedRotation;
    
    // Adjust to land on target
    const currentRemainder = nextRotation % 360;
    let adjustment = targetAngleInCircle - currentRemainder;
    if (adjustment < 0) {
      adjustment += 360;
    }
    
    const finalRotation = nextRotation + adjustment;
    setRotation(finalRotation);

    // Wait for animation to finish
    setTimeout(async () => {
      const wonPrize = PRIZES[winningPrizeIndex];
      setIsSpinning(false);
      
      // Show modal immediately with loader
      setIsLoadingMessage(true);
      setResult({ prize: wonPrize, message: null });

      // Fetch AI Message
      const aiMsg = await generatePartyMessage(wonPrize);
      setResult({ prize: wonPrize, message: aiMsg });
      setIsLoadingMessage(false);

    }, SPIN_DURATION_MS);

  }, [isSpinning, rotation]);

  const closeModal = () => {
    setResult(null);
  };

  return (
    // Updated Background: Deep Green Gradient with a hint of black
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900 via-[#022c22] to-black text-white flex flex-col overflow-hidden selection:bg-lime-500 selection:text-black">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative pb-8 pt-8">
        
        {/* Ambient Background Lights */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-lime-600 rounded-full blur-[140px] opacity-20 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-700 rounded-full blur-[140px] opacity-20 pointer-events-none"></div>

        <div className="z-10 flex flex-col items-center gap-8 perspective-container w-full max-w-md px-4">
          
          {/* Main Titles */}
          <div className="text-center space-y-2 relative">
             {/* Decorative lines */}
             <div className="w-16 h-1 bg-lime-500 mx-auto mb-4 rounded-full opacity-80 shadow-[0_0_10px_#84cc16]"></div>
            
            <h1 className="text-5xl font-black font-display tracking-tight leading-none drop-shadow-2xl">
              <span 
                 className="block"
                 style={{
                   background: 'linear-gradient(to bottom, #fefce8 0%, #facc15 40%, #a16207 60%, #422006 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   filter: 'drop-shadow(0 2px 0px rgba(0,0,0,0.5))'
                 }}
              >
                LIMON
              </span>
              <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                SPIN
              </span>
            </h1>
            
            <div className="mt-4 inline-block px-4 py-1 border border-lime-500/30 rounded-full bg-black/30 backdrop-blur-sm">
              <p className="text-lime-300 text-xs tracking-[0.2em] uppercase font-bold">
                Probá tu suerte
              </p>
            </div>
          </div>

          <div className="relative group mt-2">
             {/* Wheel Container */}
             <RouletteWheel 
                prizes={PRIZES} 
                rotation={rotation} 
                isSpinning={isSpinning} 
                size={dimensions.width}
             />
             
             {/* Glow behind wheel */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full bg-gradient-to-tr from-lime-500/30 to-emerald-500/10 blur-2xl -z-10"></div>
          </div>

          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`
              w-full max-w-[280px]
              relative px-8 py-5 rounded-none skew-x-[-10deg] font-black text-xl tracking-[0.2em] uppercase font-display border border-lime-400/30
              transition-all duration-300 transform
              ${isSpinning 
                ? 'bg-black/50 text-slate-500 cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-lime-600 to-emerald-800 text-white hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(132,204,22,0.3)] hover:shadow-[0_0_50px_rgba(132,204,22,0.5)]'
              }
            `}
          >
            <span className="skew-x-[10deg] inline-block drop-shadow-md">
              {isSpinning ? 'Girando...' : 'Jugar Ahora'}
            </span>
          </button>
          
          <div className="text-[10px] text-lime-100/40 max-w-xs text-center tracking-wider uppercase font-medium">
             LIMON SABADOS • @limonsabados
             <br/>
             CRE.AR PRODUCCIONES
          </div>

        </div>
      </main>

      {/* Result Modal */}
      {result && (
        <ResultModal 
          prize={result.prize} 
          message={result.message} 
          isLoadingMessage={isLoadingMessage}
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default App;