import { useState, useEffect } from 'react';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { TopNavbar } from './components/TopNavbar';
import { HeroInvitation } from './components/HeroInvitation';
import { CountdownTimer } from './components/CountdownTimer';
import { PhotoGallery } from './components/PhotoGallery';
import { EventLocations } from './components/EventLocations';
import { RsvpSection } from './components/RsvpWhatsAppModal';
import { CalendarModal } from './components/CalendarModal';
import { GuestbookAndDetails } from './components/GuestbookAndDetails';
import { MobileQuickBar } from './components/MobileQuickBar';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { MAP_LOCATIONS } from './utils/calendar';
import { weddingAudio } from './utils/audio';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(() => weddingAudio.getIsPlaying());
  const [calendarDefaultEvent, setCalendarDefaultEvent] = useState<'civil' | 'religiosa' | 'reception'>('religiosa');

  useEffect(() => {
    weddingAudio.initFromStorage();
  }, []);

  const handleToggleAudio = () => {
    const active = weddingAudio.toggle();
    setIsPlayingAudio(active);
  };

  const handleOpenMap = (type: 'civil' | 'religiosa' | 'reception') => {
    const loc = MAP_LOCATIONS[type];
    window.open(loc.mapsUrl, '_blank');
  };

  const handleOpenCalendar = (type: 'civil' | 'religiosa' | 'reception' = 'religiosa') => {
    setCalendarDefaultEvent(type);
    setCalendarModalOpen(true);
  };

  const handleScrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToLocations = () => {
    const el = document.getElementById('locais');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#2c3e38] font-sans relative selection:bg-[#cbe2d7] selection:text-[#133e32]">
      {/* 1. Opening Animation (Interactive Digital Envelope) */}
      {!envelopeOpened && (
        <EnvelopeOpening onOpenComplete={() => {
          setEnvelopeOpened(true);
          setIsPlayingAudio(true);
        }} />
      )}

      {/* 2. Top Navigation Bar */}
      <TopNavbar
        onReopenEnvelope={() => setEnvelopeOpened(false)}
        onOpenRsvp={handleScrollToRsvp}
        onOpenAudioModal={() => setAudioModalOpen(true)}
      />

      {/* Subtle background ambient watercolor textures */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#82a592]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#3a8ba5]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pt-4 pb-24 md:pb-16">
        {/* Hero Wedding Invitation Document */}
        <HeroInvitation
          onOpenMap={handleOpenMap}
          onOpenCalendar={handleOpenCalendar}
          onOpenRsvp={handleScrollToRsvp}
        />

        {/* Live Countdown Timer */}
        <CountdownTimer />

        {/* Romantic Photo Gallery */}
        <PhotoGallery />

        {/* Event Locations & Google Maps */}
        <EventLocations />

        {/* WhatsApp RSVP Confirmation Form */}
        <RsvpSection />

        {/* Guestbook, Dress Code, Gift List & Share */}
        <GuestbookAndDetails />
      </main>

      {/* Calendar Add Modal */}
      <CalendarModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        defaultEvent={calendarDefaultEvent}
      />

      {/* Audio Player & Music Settings Modal */}
      <AudioPlayerModal
        isOpen={audioModalOpen}
        onClose={() => setAudioModalOpen(false)}
        isPlaying={isPlayingAudio}
        onTogglePlay={handleToggleAudio}
      />

      {/* Mobile Sticky Bottom Quick Action Bar */}
      <MobileQuickBar
        onOpenRsvp={handleScrollToRsvp}
        onOpenMap={handleScrollToLocations}
        onOpenCalendar={() => handleOpenCalendar('reception')}
        onOpenAudioModal={() => setAudioModalOpen(true)}
      />

      {/* Elegant Footer */}
      <footer className="relative z-10 border-t border-[#e2d8c5] bg-[#f4eee2] py-10 px-4 text-center text-xs text-[#5f7d70]">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-[#0d382f]">
            <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
            <span className="font-script text-2xl">Paulino & Ana</span>
            <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
          </div>
          <p className="font-cormorant italic text-sm text-[#4e6b5f]">
            "Assim, já não são dois, mas uma só carne. Portanto, o que Deus uniu, não o separe o homem."
          </p>
          <div className="pt-2 text-[11px] text-[#789689] flex items-center justify-center gap-3">
            <span>14 & 15 de Outubro de 2026</span>
            <span>·</span>
            <span>Lubango, Huíla, Angola</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                setEnvelopeOpened(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#d6ccb9] text-[11px] text-[#426456] hover:bg-[#faf7f0] transition-colors cursor-pointer"
            >
              <MailOpen className="w-3 h-3 text-[#d4af37]" />
              <span>Reabrir envelope</span>
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
            </button>

            <button
              onClick={() => setAudioModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#d6ccb9] text-[11px] text-[#426456] hover:bg-[#faf7f0] transition-colors cursor-pointer"
            >
              <span>Canon in D (Música)</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
