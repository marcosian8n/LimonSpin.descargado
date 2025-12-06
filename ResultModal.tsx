import React from 'react';
import { Prize } from '../types';
import { Sparkles, Citrus, Beer, PartyPopper, Heart, XCircle } from 'lucide-react';

interface ResultModalProps {
  prize: Prize;
  message: string | null;
  onClose: () => void;
  isLoadingMessage: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({ prize, message, onClose, isLoadingMessage }) => {
  
  const getIcon = () => {
    if (prize.isGrandPrize) return <Sparkles className="w-16 h-16 text-white animate-spin-slow drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />;
    if (prize.isBoobyPrize) return <Citrus className="w-16 h-16 text-yellow-400" />;
    if (prize.id.includes('pico')) return <Heart className="w-16 h-16 text-lime-400 animate-pulse" />;
    if (prize.id.includes('shot')) return <Beer className="w-16 h-16 text-emerald-400" />;
    return <PartyPopper className="w-16 h-16 text-lime-300" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md transition-opacity">
      <div className="bg-[#051a10] border border-lime-800/50 rounded-none p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        {/* Organic Glow Background Effect */}
        <div className={`absolute inset-0 opacity-10 ${prize.isGrandPrize ? 'bg-white animate-pulse' : 'bg-lime-600'}`}></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          {getIcon()}
          
          <h2 className="text-xs uppercase tracking-[0.3em] text-lime-100/60 font-bold">Tu Premio</h2>
          <h1 className="text-3xl font-black text-white font-display uppercase leading-tight drop-shadow-lg">
            {prize.label}
          </h1>

          <div className="h-0.5 w-1/2 bg-gradient-to-r from-transparent via-lime-500 to-transparent my-2 opacity-50"></div>

          <div className="min-h-[80px] flex items-center justify-center">
            {isLoadingMessage ? (
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
              </div>
            ) : (
              <p className="text-lg text-lime-50 italic font-medium leading-snug">
                "{message}"
              </p>
            )}
          </div>

          <button 
            onClick={onClose}
            className="mt-6 w-full py-4 bg-gradient-to-r from-lime-600 to-emerald-700 hover:from-lime-500 hover:to-emerald-600 rounded-none skew-x-[-6deg] font-bold text-white shadow-lg active:scale-95 transition-all uppercase tracking-[0.2em] text-sm"
          >
            <span className="skew-x-[6deg] inline-block">Girar de nuevo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;