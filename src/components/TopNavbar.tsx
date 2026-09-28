import { Music, Music2, MailOpen } from 'lucide-react';
import { weddingAudio } from '../utils/audio';
import { useState } from 'react';

interface TopNavbarProps {
  onReopenEnvelope: () => void;
  onOpenRsvp: () => void;
}

export function TopNavbar({ onReopenEnvelope, onOpenRsvp }: TopNavbarProps) {
  const [isPlaying, setIsPlaying] = useState(() => weddingAudio.getIsPlaying());

  const handleToggleMusic = () => {
    const active = weddingAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbfaf6]/90 backdrop-blur-md border-b border-[#e5decb] px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-script text-2xl sm:text-3xl text-[#0e3b31] font-normal tracking-wide whitespace-nowrap hover:opacity-85 transition-opacity"
        >
          Paulino & Ana
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-[#4d6b5e]">
          <a href="#" className="hover:text-[#0e3b31] transition-colors whitespace-nowrap">
            Início
          </a>
          <a href="#locais" className="hover:text-[#0e3b31] transition-colors whitespace-nowrap">
            Locais & Mapa
          </a>
          <a href="#galeria" className="hover:text-[#0e3b31] transition-colors whitespace-nowrap">
            Fotos
          </a>
          <a href="#informacoes" className="hover:text-[#0e3b31] transition-colors whitespace-nowrap">
            Informações
          </a>
          <a href="#rsvp" className="hover:text-[#0e3b31] transition-colors whitespace-nowrap">
            Confirmar Presença
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Audio toggle button */}
          <button
            onClick={handleToggleMusic}
            className="p-2 rounded-full border border-[#d6ccb9] bg-white/80 text-[#36574a] hover:bg-white transition-colors"
            title={isPlaying ? 'Pausar melodia' : 'Tocar melodia suave'}
            aria-label="Controle de música"
          >
            {isPlaying ? (
              <Music className="w-4 h-4 text-[#1b4e41] animate-spin" />
            ) : (
              <Music2 className="w-4 h-4 text-[#738e82]" />
            )}
          </button>

          {/* Re-open envelope button */}
          <button
            onClick={onReopenEnvelope}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4af37]/60 bg-[#faf6ed] text-[#856314] text-xs font-medium hover:bg-[#f5ede0] transition-colors whitespace-nowrap"
            title="Ver animação de abertura do envelope"
          >
            <MailOpen className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Envelope</span>
          </button>

          {/* Primary RSVP Action */}
          <button
            onClick={onOpenRsvp}
            className="px-4 py-2 rounded-full bg-[#1b4e41] text-white text-xs font-semibold hover:bg-[#266857] transition-colors whitespace-nowrap shadow-xs"
          >
            RSVP WhatsApp
          </button>
        </div>
      </div>
    </header>
  );
}
