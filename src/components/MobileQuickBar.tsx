import { Send, MapPin, Calendar, Music, Music2 } from 'lucide-react';
import { weddingAudio } from '../utils/audio';
import { useState } from 'react';

interface MobileQuickBarProps {
  onOpenRsvp: () => void;
  onOpenMap: () => void;
  onOpenCalendar: () => void;
}

export function MobileQuickBar({
  onOpenRsvp,
  onOpenMap,
  onOpenCalendar,
}: MobileQuickBarProps) {
  const [isPlaying, setIsPlaying] = useState(() => weddingAudio.getIsPlaying());

  const handleToggleMusic = () => {
    const active = weddingAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-[#d8ccb9] px-3 py-2 shadow-lg md:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto gap-2">
        {/* WhatsApp RSVP */}
        <button
          onClick={onOpenRsvp}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-[#25D366] text-[#0b3319] font-bold text-[11px] px-2 py-1 shadow-xs active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1">
            <Send className="w-3.5 h-3.5" />
            <span>RSVP</span>
          </div>
          <span className="text-[9px] font-normal opacity-90">WhatsApp</span>
        </button>

        {/* Google Maps */}
        <button
          onClick={onOpenMap}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-[#1b4e41] text-white font-medium text-[11px] px-2 py-1 shadow-xs active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#fae596]" />
            <span>Locais</span>
          </div>
          <span className="text-[9px] text-[#b0cec2]">Google Maps</span>
        </button>

        {/* Calendar */}
        <button
          onClick={onOpenCalendar}
          className="flex-1 min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-[#faf6ed] border border-[#dcd1be] text-[#20493c] font-medium text-[11px] px-2 py-1 shadow-2xs active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#9e7617]" />
            <span>Salvar</span>
          </div>
          <span className="text-[9px] text-[#718b80]">Calendário</span>
        </button>

        {/* Music Sound Toggle */}
        <button
          onClick={handleToggleMusic}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center rounded-xl bg-white border border-[#dfd6c5] text-[#3d5f52] text-[10px] p-1 active:scale-95 transition-transform"
          aria-label="Controle de música"
        >
          {isPlaying ? (
            <Music className="w-4 h-4 text-[#1b4e41] animate-bounce" />
          ) : (
            <Music2 className="w-4 h-4 text-[#789387]" />
          )}
          <span className="text-[8px] text-[#69867b] mt-0.5">{isPlaying ? 'Som On' : 'Som'}</span>
        </button>
      </div>
    </div>
  );
}
