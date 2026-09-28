import { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingAudio } from '../utils/audio';
import { Sparkles, Heart, Music, Music2 } from 'lucide-react';

interface EnvelopeOpeningProps {
  onOpenComplete: () => void;
}

export function EnvelopeOpening({ onOpenComplete }: EnvelopeOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // Play triumphant classical wedding fanfare and start classical wedding march
    try {
      weddingAudio.playFanfareTriumphant();
      weddingAudio.startClassicalWeddingMarch();
      setMusicEnabled(true);
    } catch {
      // Audio autoplay policy fallback
    }

    // Trigger celebratory confetti in wedding pastel & gold colors
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#82a592', '#e8d8c8', '#4b7f73', '#fdf6e9'],
    });

    // Sequence the opening animations
    setTimeout(() => {
      setIsOpened(true);
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d4af37', '#82a592', '#d9e8e2'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d4af37', '#82a592', '#d9e8e2'],
      });
    }, 1200);

    setTimeout(() => {
      onOpenComplete();
    }, 2400);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = weddingAudio.toggle();
    setMusicEnabled(playing);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#f5f2eb] via-[#faf8f4] to-[#f0ece1] px-4 overflow-hidden select-none">
      {/* Background delicate watercolor glow circles */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#82a592]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      {/* Floating sound toggle at the top right */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#82a592]/30 text-xs text-[#28483e] shadow-sm hover:bg-white transition-colors"
          title={musicEnabled ? 'Silenciar música' : 'Ouvir melodia de casamento'}
        >
          {musicEnabled ? <Music className="w-3.5 h-3.5 text-[#28483e] animate-spin" /> : <Music2 className="w-3.5 h-3.5 text-[#6c867c]" />}
          <span className="font-medium">{musicEnabled ? 'Música Ativa' : 'Música'}</span>
        </button>
      </div>

      {/* Title Header above envelope */}
      <div className="text-center mb-8 max-w-sm mx-auto transition-all duration-700">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#638478] mb-2 font-medium">
          <Heart className="w-3 h-3 fill-[#638478]/30 text-[#638478]" />
          Convite Especial de Casamento
          <Heart className="w-3 h-3 fill-[#638478]/30 text-[#638478]" />
        </div>
        <h1 className="font-script text-4xl sm:text-5xl text-[#0e3b32] font-normal leading-tight">
          Paulino & Ana
        </h1>
        <p className="font-cormorant italic text-base sm:text-lg text-[#557167] mt-1">
          15 de Outubro de 2026 · Lubango, Angola
        </p>
      </div>

      {/* Envelope Container */}
      <div
        onClick={handleOpenEnvelope}
        className="relative w-full max-w-md aspect-[1.42/1] cursor-pointer group perspective-1000 transition-transform duration-300 hover:scale-[1.01]"
        role="button"
        tabIndex={0}
        aria-label="Abrir convite de casamento"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
        }}
      >
        {/* Envelope Back Base */}
        <div className="absolute inset-0 bg-[#ebe5d8] rounded-xl shadow-2xl border border-[#d6ccb9] overflow-hidden">
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ab9f8c_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Inner envelope lining with delicate watercolor mint floral hue */}
          <div className="absolute inset-3 rounded-lg bg-gradient-to-br from-[#f2f7f4] via-[#ffffff] to-[#e4eee9] border border-[#cbdcd4]/60 p-4 flex flex-col items-center justify-center text-center">
            {/* Peeking top of the invitation card */}
            <div
              className={`w-full max-w-[85%] bg-white rounded-md shadow-md border border-[#e3dac9] p-4 text-center transform transition-all duration-1000 ease-out ${
                isOpening ? '-translate-y-28 scale-105 shadow-xl opacity-100' : 'translate-y-2 opacity-90'
              }`}
            >
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6f9084] font-medium">Você é nosso convidado de honra</div>
              <div className="font-script text-2xl text-[#124237] mt-1">Paulino Joaquim & Ana da Cruz</div>
              <div className="w-16 h-[1px] bg-[#d4af37] mx-auto my-1.5" />
              <div className="text-[11px] text-[#556b62] font-cormorant italic">"O maior deles é o amor"</div>
            </div>
          </div>
        </div>

        {/* Envelope Flap (Triangle Top) */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-1000 ease-in-out z-10 ${
            isOpening ? '-rotate-x-180 -z-0' : 'rotate-x-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="w-full h-full drop-shadow-md">
            <polygon points="0,0 100,0 50,55" fill="#f4efe4" stroke="#d5cbba" strokeWidth="0.5" />
            <polygon points="2,0 98,0 50,53" fill="#f8f5ee" />
            {/* Delicate gold inner border triangle */}
            <polyline points="10,2 50,46 90,2" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.6" strokeDasharray="1.5,1.5" />
          </svg>
        </div>

        {/* Envelope Left & Right Side Folds (SVG base layer) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="w-full h-full">
            {/* Left triangle fold */}
            <polygon points="0,0 50,40 0,70" fill="#ebe4d6" stroke="#ded5c4" strokeWidth="0.4" opacity="0.9" />
            {/* Right triangle fold */}
            <polygon points="100,0 50,40 100,70" fill="#ebe4d6" stroke="#ded5c4" strokeWidth="0.4" opacity="0.9" />
            {/* Bottom triangle fold */}
            <polygon points="0,70 50,38 100,70" fill="#f2ede2" stroke="#d8cebc" strokeWidth="0.5" />
            {/* Golden decorative accent line on bottom fold */}
            <line x1="8" y1="67" x2="50" y2="40" stroke="#d4af37" strokeWidth="0.3" opacity="0.5" />
            <line x1="92" y1="67" x2="50" y2="40" stroke="#d4af37" strokeWidth="0.3" opacity="0.5" />
          </svg>
        </div>

        {/* Golden Wax Seal Centerpiece */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ${
            isOpening ? 'scale-125 opacity-0 rotate-12' : 'scale-100 opacity-100'
          }`}
        >
          {/* Outer glowing pulsing aura */}
          <div className="absolute inset-0 rounded-full bg-[#d4af37]/30 blur-md animate-pulse" />

          {/* Golden Wax Seal */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#eecf6d] via-[#c99a2c] to-[#996d13] p-1 shadow-xl flex items-center justify-center border border-[#ffecaa]">
            {/* Wax seal stamped ring */}
            <div className="w-full h-full rounded-full border-2 border-[#ffec99]/60 flex flex-col items-center justify-center bg-gradient-to-tr from-[#b8861d] via-[#dcae3a] to-[#a27111] shadow-inner text-[#fdfbf6]">
              {/* Monogram P & A */}
              <span className="font-cormorant font-bold text-lg sm:text-xl tracking-wider drop-shadow-sm">
                P & A
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#fff4cc] font-sans -mt-0.5">
                2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Instruction Prompt */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#134237] text-white text-sm font-medium tracking-wide shadow-lg shadow-[#134237]/20 hover:bg-[#1b5548] active:scale-95 transition-all animate-pulse-glow"
        >
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>{isOpening ? 'Abrindo Convite...' : 'Toque para Abrir o Convite'}</span>
        </button>

        <button
          onClick={onOpenComplete}
          className="text-xs text-[#638478] hover:text-[#0e3b32] underline-offset-4 hover:underline transition-colors mt-1"
        >
          Ir direto para o convite completo →
        </button>
      </div>

      {/* Bottom Footer Note */}
      <div className="absolute bottom-4 text-center text-xs text-[#7f998f] font-cormorant italic">
        "O amor tudo sofre, tudo crê, tudo espera, tudo suporta."
      </div>
    </div>
  );
}
