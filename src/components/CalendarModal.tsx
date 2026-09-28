import { useState } from 'react';
import { Calendar, Download, ExternalLink, X, Check } from 'lucide-react';
import { WEDDING_EVENTS, generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEvent?: 'civil' | 'religiosa' | 'reception';
}

export function CalendarModal({ isOpen, onClose, defaultEvent = 'religiosa' }: CalendarModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<'civil' | 'religiosa' | 'reception'>(defaultEvent);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  let currentEventData = WEDDING_EVENTS.cerimoniaReligiosa;
  let filename = 'cerimonia-religiosa-paulino-ana.ics';

  if (selectedEvent === 'reception') {
    currentEventData = WEDDING_EVENTS.copoDeAgua;
    filename = 'copo-dagua-paulino-ana.ics';
  } else if (selectedEvent === 'civil') {
    currentEventData = WEDDING_EVENTS.cerimoniaCivil;
    filename = 'cerimonia-civil-paulino-ana.ics';
  }

  const googleUrl = generateGoogleCalendarUrl(currentEventData);

  const handleDownloadIcs = () => {
    downloadIcsFile(currentEventData, filename);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#dfd5c4] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6b857a] hover:bg-[#f2ece2] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f2f7f4] border border-[#d2e5dc] flex items-center justify-center mx-auto mb-3 text-[#184e41]">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-cormorant font-bold text-2xl text-[#123e32]">
            Adicionar à Sua Agenda
          </h3>
          <p className="text-xs text-[#5c7a6e] mt-1 font-cormorant italic">
            Guarde a data para não esquecer este momento sublime.
          </p>
        </div>

        {/* Event selection pills */}
        <div className="flex p-1 bg-[#f4f0e6] rounded-xl mb-6 gap-1">
          <button
            onClick={() => setSelectedEvent('religiosa')}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg transition-all ${
              selectedEvent === 'religiosa'
                ? 'bg-[#996d13] text-white shadow-xs'
                : 'text-[#627a6f] hover:text-[#123e32]'
            }`}
          >
            Religiosa (15 Out)
          </button>
          <button
            onClick={() => setSelectedEvent('reception')}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg transition-all ${
              selectedEvent === 'reception'
                ? 'bg-white text-[#123e32] shadow-xs'
                : 'text-[#627a6f] hover:text-[#123e32]'
            }`}
          >
            Copo d'Água (15 Out)
          </button>
          <button
            onClick={() => setSelectedEvent('civil')}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg transition-all ${
              selectedEvent === 'civil'
                ? 'bg-white text-[#123e32] shadow-xs'
                : 'text-[#627a6f] hover:text-[#123e32]'
            }`}
          >
            Civil (14 Out)
          </button>
        </div>

        {/* Event details summary */}
        <div className="p-4 rounded-2xl bg-[#faf8f4] border border-[#ede7dc] text-xs text-[#355348] mb-6 space-y-2">
          <div className="font-semibold text-sm text-[#143e33]">{currentEventData.title}</div>
          <div className="text-[#648377]">
            {selectedEvent === 'religiosa' && 'Quinta-feira, 15 de Outubro de 2026 às 15h30'}
            {selectedEvent === 'reception' && 'Quinta-feira, 15 de Outubro de 2026 às 20h00'}
            {selectedEvent === 'civil' && 'Quarta-feira, 14 de Outubro de 2026 às 08h30'}
          </div>
          <div className="text-[11px] text-[#789388]">{currentEventData.location}</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Google Calendar Link */}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#1b4e41] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#256857] transition-all shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#fae596]" />
            <span>Adicionar ao Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Apple / Outlook .ics download */}
          <button
            onClick={handleDownloadIcs}
            className="w-full py-3 px-4 rounded-xl bg-white border border-[#cfc4b0] text-[#1c4538] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#fbf9f4] transition-all shadow-2xs"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Arquivo .ics Baixado com Sucesso!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#799689]" />
                <span>Baixar para Apple Calendar / Outlook (.ics)</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[10px] text-[#869f94] mt-4 font-cormorant italic">
          Compatível com iPhone, Android, Mac e Windows.
        </p>
      </div>
    </div>
  );
}
