import React, { useState } from 'react';
import { Sparkles, BookOpen, UtensilsCrossed } from 'lucide-react';

const TIFFIN_SURPRISES = [
  "Mummy ne aaj Tiffin mein thandi Maggi aur Sauce rakha hai! 🍜",
  "Aloo Paratha + Achaar roll! Subah break mein adha bacha liya tha 😋",
  "Poha aur ₹5 wala Orange Cream Biscuit!  biscuits!",
  "Idli Fry with Chutney! Tiffin pura khali karne pe hi TV milega!",
];

export default function StoolAndProps({ onOpenNotebook, roomMode }) {
  const [tiffinToast, setTiffinToast] = useState(null);
  const [isTiffinOpen, setIsTiffinOpen] = useState(false);

  const handleTiffinClick = () => {
    setIsTiffinOpen(true);
    const randomSnack = TIFFIN_SURPRISES[Math.floor(Math.random() * TIFFIN_SURPRISES.length)];
    setTiffinToast(randomSnack);

    setTimeout(() => {
      setIsTiffinOpen(false);
    }, 3500);
  };

  return (
    <div className="relative flex flex-col items-center -mt-1 z-10 select-none">
      {/* Tiffin Pop-up Toast Notification */}
      {tiffinToast && isTiffinOpen && (
        <div className="absolute -top-14 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/95 text-amber-100 border border-amber-400/50 shadow-xl text-xs sm:text-sm animate-bounce">
          <UtensilsCrossed className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{tiffinToast}</span>
        </div>
      )}

      {/* Top Wooden Table Plank (TV rests on this) */}
      <div className="w-[370px] sm:w-[500px] h-5 bg-gradient-to-r from-[#5c3a21] via-[#7c4f2e] to-[#5c3a21] rounded-t-lg border-t-2 border-[#9e6b43] shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />
      <div className="w-[350px] sm:w-[480px] h-3 bg-[#472c18] shadow-inner" />

      {/* Stool Middle Section (Legs + Lower Shelf with School Bag & Tiffin) */}
      <div className="relative w-[330px] sm:w-[450px] h-44 flex justify-between px-4">
        
        {/* Left Wooden Leg */}
        <div className="w-6 h-full bg-gradient-to-r from-[#4a2e19] via-[#694225] to-[#3d2514] -skew-x-3 shadow-lg border-l border-[#855634]/40" />

        {/* Center Lower Shelf Holding Nostalgic Props */}
        <div className="absolute bottom-8 left-4 right-4 flex flex-col items-center">
          
          {/* Props Container Sitting on the Shelf */}
          <div className="relative w-full flex items-end justify-center gap-4 sm:gap-7 px-6 -mb-1 z-20">
            
            {/* 1. Nostalgic Blue & Yellow School Bag */}
            <div
              onClick={onOpenNotebook}
              title="Click School Bag to open Notebook TV Guide!"
              className="group relative cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
            >
              {/* Hover Badge */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 text-amber-200 text-[10px] font-medium border border-white/15">
                <BookOpen className="w-3 h-3 inline mr-1" />
                Homework & Channels
              </span>

              {/* Bag SVG Illustration */}
              <svg width="88" height="78" viewBox="0 0 88 78" className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]">
                {/* Top Handle */}
                <path d="M32 12 C32 2, 56 2, 56 12" stroke="#1e293b" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Main Blue Backpack Body */}
                <rect x="12" y="12" width="64" height="62" rx="14" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2.5" />
                {/* Top Flap (Slouching slightly open) */}
                <path d="M12 24 C12 12, 76 12, 76 24 L74 40 C55 45, 33 45, 14 40 Z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />
                {/* Yellow Front Zip Pocket */}
                <rect x="22" y="44" width="44" height="24" rx="6" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
                {/* Zipper Line */}
                <line x1="25" y1="51" x2="63" y2="51" stroke="#713f12" strokeWidth="1.5" strokeDasharray="3 2" />
                {/* Two Black Buckle Straps */}
                <rect x="27" y="26" width="6" height="18" rx="2" fill="#0f172a" />
                <rect x="55" y="26" width="6" height="18" rx="2" fill="#0f172a" />
                <rect x="26" y="34" width="8" height="5" rx="1" fill="#94a3b8" />
                <rect x="54" y="34" width="8" height="5" rx="1" fill="#94a3b8" />
                {/* White Peeking Homework Notebook Corner */}
                <polygon points="60,12 72,6 75,18 62,18" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              </svg>
            </div>

            {/* 2. Classic 2-Tier Stainless Steel Tiffin Box */}
            <div
              onClick={handleTiffinClick}
              title="Click Tiffin Box to see what Mummy packed!"
              className="group relative cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 text-emerald-200 text-[10px] font-medium border border-white/15">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Open Tiffin
              </span>

              <svg width="64" height="58" viewBox="0 0 64 58" className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]">
                {/* Side Locking Clamps */}
                <path d="M8 18 L8 48 M56 18 L56 48" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                {/* Bottom Steel Dabba */}
                <rect x="11" y="33" width="42" height="20" rx="4" fill="url(#steelGrad)" stroke="#475569" strokeWidth="1.5" />
                {/* Top Steel Dabba */}
                <rect x="11" y="17" width="42" height="16" rx="3" fill="url(#steelGrad)" stroke="#475569" strokeWidth="1.5" />
                {/* Lid (Tilts up when clicked!) */}
                <g className={`transition-transform duration-300 ${isTiffinOpen ? '-translate-y-3 -rotate-6' : ''}`}>
                  <rect x="9" y="12" width="46" height="6" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                  <path d="M25 12 C25 6, 39 6, 39 12" stroke="#475569" strokeWidth="2.5" fill="none" />
                </g>
                <defs>
                  <linearGradient id="steelGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="45%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 3. Classic Red Milton Water Bottle with Hanging Strap */}
            <div className="relative hidden xs:block">
              <svg width="36" height="64" viewBox="0 0 36 64" className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]">
                {/* White Cap */}
                <rect x="11" y="6" width="14" height="9" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Neck */}
                <rect x="9" y="15" width="18" height="5" fill="#dc2626" />
                {/* Red Insulated Body */}
                <rect x="6" y="20" width="24" height="40" rx="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                {/* White Brand Stripe */}
                <rect x="6" y="34" width="24" height="7" fill="#fef2f2" opacity="0.9" />
                {/* Hanging Black Carry Strap */}
                <path d="M27 17 C36 26, 35 48, 28 58" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>

          </div>

          {/* Lower Wooden Shelf Plank */}
          <div className="w-full h-4 bg-gradient-to-r from-[#4d301b] via-[#6e4527] to-[#4d301b] rounded border-t border-[#8c5a36] shadow-md z-10" />
        </div>

        {/* Right Wooden Leg */}
        <div className="w-6 h-full bg-gradient-to-l from-[#4a2e19] via-[#694225] to-[#3d2514] skew-x-3 shadow-lg border-r border-[#855634]/40" />
      </div>

      {/* Floor Shadow Under Stool */}
      <div
        className={`w-[360px] sm:w-[490px] h-5 rounded-full blur-md -mt-2 transition-colors duration-500 ${
          roomMode === 'night' ? 'bg-black/90' : 'bg-black/50'
        }`}
      />
    </div>
  );
}