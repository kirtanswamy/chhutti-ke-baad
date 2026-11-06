import { Volume2, VolumeX, Power } from 'lucide-react';

export default function CrtTelevision({
  isPowerOn,
  setIsPowerOn,
  isStatic,
  currentChannel,
  isMuted,
  setIsMuted,
  roomMode,
}) {
  return (
    <div className="relative flex flex-col items-center z-20">
      {/* Ambient CRT Screen Glow in Dark/Night Mode */}
      {isPowerOn && roomMode === 'night' && (
        <div className="absolute -inset-16 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      )}

      {/* Rabbit-Ear V-Antenna on Top */}
      <div className="relative w-40 h-10 -mb-2 flex justify-center items-end pointer-events-none">
        <div className="w-0.5 h-14 bg-zinc-400 origin-bottom -rotate-35 rounded-full shadow" />
        <div className="w-0.5 h-16 bg-zinc-400 origin-bottom rotate-30 rounded-full shadow" />
        <div className="w-10 h-3 bg-zinc-800 rounded-t-lg border-t border-zinc-600 z-10" />
      </div>

      {/* Main Outer CRT Plastic Body */}
      <div className="relative w-[330px] sm:w-[440px] bg-gradient-to-b from-[#3a3532] via-[#2b2724] to-[#1e1b18] p-4 sm:p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_2px_3px_rgba(255,255,255,0.15)] border-4 border-[#24201d]">
        
        {/* Inner Recessed Dark Bezel + Speaker Grilles */}
        <div className="flex gap-3 items-center bg-[#181513] p-3 rounded-[1.5rem] shadow-inner border border-black/80">
          
          {/* Left Speaker Grille */}
          <div className="hidden sm:flex flex-col gap-1.5 w-5 py-4 opacity-50">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full h-1 bg-black rounded-full shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
            ))}
          </div>

          {/* The Curved Glass CRT Tube */}
          <div className="relative flex-1 aspect-[4/3] bg-[#0c0d0c] rounded-[1.25rem] overflow-hidden crt-scanlines border-4 border-[#111]">
            {!isPowerOn ? (
              /* TV Powered Off State */
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#070807] text-zinc-600">
                <div className="w-2 h-2 rounded-full bg-white/20 animate-ping mb-2" />
                <p className="font-crt text-lg tracking-widest uppercase text-zinc-500">
                  Press Power or Spacebar
                </p>
              </div>
            ) : isStatic ? (
              /* "Rukawat Ke Liye Khed Hai" Static Interruption */
              <div className="w-full h-full tv-static-pattern flex items-center justify-center p-4">
                <div className="bg-blue-900/90 border-2 border-yellow-300 px-4 py-2 text-center shadow-lg">
                  <p className="text-yellow-300 font-bold text-base sm:text-lg tracking-wide">
                    रुकावट के लिए खेद है
                  </p>
                  <p className="font-crt text-white text-xs tracking-widest uppercase">
                    SORRY FOR THE INTERRUPTION
                  </p>
                </div>
              </div>
            ) : (
              /* Active Channel Screen (Step 2 hooks up YouTube IFrame here) */
              <div className="relative w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-black flex flex-col items-center justify-center p-6 text-center">
                {/* Green Retro CRT On-Screen Display (OSD) */}
                <div className="absolute top-3 left-4 z-30 text-left pointer-events-none">
                  <p className="font-crt text-2xl sm:text-3xl text-[#00ff66] drop-shadow-[0_0_8px_rgba(0,255,102,0.8)] leading-none">
                    CH {String(currentChannel.id).padStart(2, '0')}
                  </p>
                  <p className="font-crt text-sm sm:text-base text-[#00ff66]/90 tracking-wider uppercase">
                    {currentChannel.network}
                  </p>
                </div>

                {/* Mute Indicator on OSD */}
                {isMuted && (
                  <div className="absolute top-3 right-4 z-30 font-crt text-xl text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]">
                    MUTE
                  </div>
                )}

                {/* Placeholder Preview until Step 2 YouTube Engine is attached */}
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-crt text-sm mb-2">
                  NOW PLAYING ({currentChannel.era})
                </span>
                <h2 className="font-serif-retro text-2xl sm:text-3xl text-white drop-shadow mb-1">
                  {currentChannel.title}
                </h2>
                <p className="text-xs text-zinc-400 max-w-xs">
                  (YouTube player mounts right inside this tube in Step 2)
                </p>
              </div>
            )}

            {/* Subtle Glass Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none z-20" />
          </div>

          {/* Right Speaker Grille */}
          <div className="hidden sm:flex flex-col gap-1.5 w-5 py-4 opacity-50">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full h-1 bg-black rounded-full shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
            ))}
          </div>
        </div>

        {/* Bottom Control Strip on TV Frame */}
        <div className="mt-3 px-3 flex items-center justify-between">
          {/* Retro Brand Badge */}
          <div className="flex items-center gap-2">
            <span className="font-crt text-sm tracking-[0.25em] text-amber-200/70 font-bold border border-amber-200/20 px-2 py-0.5 rounded bg-black/30">
              BPL-98
            </span>
          </div>

          {/* Physical TV Buttons + Red LED Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              title="Mute / Unmute (M)"
              className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-600 shadow active:translate-y-0.5 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsPowerOn(!isPowerOn)}
              title="Power On/Off (Space)"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-crt tracking-wider border border-zinc-600 shadow active:translate-y-0.5 cursor-pointer"
            >
              <Power className="w-3 h-3 text-red-400" />
              POWER
            </button>

            {/* Power Status LED */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isPowerOn
                  ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                  : 'bg-red-950 border border-red-900/50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* TV Base Feet */}
      <div className="flex justify-between w-64 sm:w-80 px-4">
        <div className="w-10 h-2.5 bg-[#1a1715] rounded-b-md shadow" />
        <div className="w-10 h-2.5 bg-[#1a1715] rounded-b-md shadow" />
      </div>
    </div>
  );
}