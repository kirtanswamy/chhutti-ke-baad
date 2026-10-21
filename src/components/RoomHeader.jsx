import React from 'react';
import { Sun, LampCeiling, Moon, Users } from 'lucide-react';

const MODES = [
  { id: 'afternoon', time: '4:30 pm', label: 'Golden Hour', icon: Sun },
  { id: 'evening', time: '6:30 pm', label: 'Tubelight', icon: LampCeiling },
  { id: 'night', time: '9:00 pm', label: 'Lights Off', icon: Moon },
];

export default function RoomHeader({ roomMode, setRoomMode, viewerCount = 4 }) {
  const currentMode = MODES.find((m) => m.id === roomMode) || MODES[0];

  const cycleRoomMode = () => {
    const nextIndex = (MODES.findIndex((m) => m.id === roomMode) + 1) % MODES.length;
    setRoomMode(MODES[nextIndex].id);
  };

  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-4 w-full max-w-6xl mx-auto">
      {/* Left: Time Badge & Live Viewers */}
      <div className="flex items-center gap-3">
        <button
          onClick={cycleRoomMode}
          title="Click to change time of day (Shortcut: L)"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md bg-black/20 text-amber-100 border border-white/15 hover:bg-black/35 transition cursor-pointer"
        >
          <currentMode.icon className="w-3.5 h-3.5 text-amber-300" />
          <span>{currentMode.time}</span>
          <span className="opacity-60 hidden sm:inline">• {currentMode.label}</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md bg-black/20 text-emerald-300 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Users className="w-3.5 h-3.5 opacity-80" />
          <span>{viewerCount} in front of the TV</span>
        </div>
      </div>

      {/* Center/Right: Classic "School Ke Baad" Title */}
      <div className="text-right">
        <h1 className="font-serif-retro text-3xl sm:text-4xl tracking-wide text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          School Ke Baad
        </h1>
      </div>
    </header>
  );
}