import { useState, useEffect } from 'react';
import { Send, CheckCircle2, Heart, Users, MessageSquare, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createWhatsAppRsvpUrl, createEmailRsvpMailto, WEDDING_CONTACT, WEDDING_TABLES } from '../utils/calendar';

export function RsvpSection() {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [companions, setCompanions] = useState(1);
  const [eventChoice, setEventChoice] = useState<'all' | 'religious_reception' | 'reception' | 'civil'>('all');
  const [table, setTable] = useState('');
  const [message, setMessage] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [lastSentMethod, setLastSentMethod] = useState<'whatsapp' | 'email' | null>(null);

  // Load from localStorage if previously confirmed
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvp_status');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.confirmed) {
          setHasConfirmed(true);
          setGuestName(parsed.guestName || '');
          setCompanions(parsed.companions || 1);
        }
      }
    } catch {
      // Ignored
    }
  }, []);

  const saveLocalState = (method: 'whatsapp' | 'email') => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#25D366', '#d4af37', '#124237', '#ffffff'],
    });

    try {
      localStorage.setItem(
        'wedding_rsvp_status',
        JSON.stringify({
          confirmed: true,
          guestName,
          companions,
          eventChoice,
          date: new Date().toISOString(),
          method,
        })
      );
      setHasConfirmed(true);
      setLastSentMethod(method);
    } catch {
      // Ignored
    }
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!guestName.trim()) return;

    saveLocalState('whatsapp');

    const url = createWhatsAppRsvpUrl({
      guestName,
      companionCount: companions,
      ceremonyChoice: eventChoice,
      tableNumber: table,
      wishesMessage: message,
    });

    window.open(url, '_blank');
  };

  const handleSendEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!guestName.trim()) return;

    saveLocalState('email');

    const mailtoUrl = createEmailRsvpMailto({
      guestName,
      companionCount: companions,
      ceremonyChoice: eventChoice,
      tableNumber: table,
      wishesMessage: message,
    });

    window.location.href = mailtoUrl;
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-12" id="rsvp">
      <div className="bg-gradient-to-b from-white via-[#fcfbf8] to-[#f7f5ed] rounded-3xl p-6 sm:p-10 border border-[#e3dac9] shadow-lg relative overflow-hidden">
        {/* Decorative corner florals */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#25d366]/5 rounded-bl-full pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f8ee] border border-[#b2e5c6] text-xs font-semibold text-[#187a3e] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Confirmação via WhatsApp & E-mail (RSVP)</span>
          </div>

          <h2 className="font-script text-4xl sm:text-5xl text-[#0e3b31]">
            Confirme a Sua Presença
          </h2>

          <p className="font-cormorant italic text-sm sm:text-base text-[#4f6e62] max-w-md mx-auto mt-1">
            Sua presença tornará a nossa celebração ainda mais abençoada e inesquecível. Por favor, confirme até 05 de Outubro de 2026.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-[#58796c]">
            <span className="px-2.5 py-1 bg-white rounded-full border border-[#d8cdb8] flex items-center gap-1">
              <strong>WhatsApp:</strong> {WEDDING_CONTACT.phoneDisplay}
            </span>
            <span className="px-2.5 py-1 bg-white rounded-full border border-[#d8cdb8] flex items-center gap-1">
              <strong>E-mail:</strong> {WEDDING_CONTACT.email}
            </span>
          </div>
        </div>

        {hasConfirmed && (
          <div className="mb-6 p-4 rounded-xl bg-[#ecf9f0] border border-[#a8e5be] text-xs sm:text-sm text-[#186a3b] space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-[#25d366] shrink-0" />
              <span>Presença registrada com sucesso!</span>
            </div>
            <p className="text-[12px] text-[#2d5f48]">
              Muito obrigado por celebrar connosco, <strong>{guestName}</strong>. Notificação direcionada para <strong>{WEDDING_CONTACT.phoneDisplay}</strong> e <strong>{WEDDING_CONTACT.email}</strong>.
            </p>
          </div>
        )}

        <form onSubmit={handleSendWhatsApp} className="space-y-5">
          {/* Guest Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#345548] mb-1.5">
              Seu Nome Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ex.: Manuel Alberto de Sousa"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#1b3d33] focus:outline-none focus:ring-2 focus:ring-[#1b4e41] focus:border-transparent transition-all placeholder:text-[#9bb2a8]"
            />
          </div>

          {/* Number of Companions & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#345548] mb-1.5">
                Total de Pessoas (Você + Acompanhantes)
              </label>
              <div className="flex items-center gap-3 bg-white border border-[#d6ccb9] rounded-xl px-3 py-2">
                <Users className="w-4 h-4 text-[#66877a]" />
                <select
                  value={companions}
                  onChange={(e) => setCompanions(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-[#1b3d33] focus:outline-none"
                >
                  <option value={1}>1 pessoa (apenas eu)</option>
                  <option value={2}>2 pessoas (eu + 1 acompanhante)</option>
                  <option value={3}>3 pessoas (família/grupo)</option>
                  <option value={4}>4 pessoas (família/grupo)</option>
                  <option value={5}>5 ou mais pessoas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#345548] mb-1.5">
                Seu Telefone / WhatsApp (Opcional)
              </label>
              <input
                type="tel"
                placeholder="+244 9..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#1b3d33] focus:outline-none focus:ring-2 focus:ring-[#1b4e41] transition-all placeholder:text-[#9bb2a8]"
              />
            </div>
          </div>

          {/* Event selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#345548] mb-1.5">
              Em qual evento você estará presente?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setEventChoice('all')}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${
                  eventChoice === 'all'
                    ? 'border-[#1b4e41] bg-[#1b4e41]/10 text-[#123e33] font-semibold ring-1 ring-[#1b4e41]'
                    : 'border-[#ddd3c0] bg-white text-[#556e64] hover:bg-[#faf7f0]'
                }`}
              >
                <div className="font-bold">Todos os Eventos</div>
                <div className="text-[11px] opacity-80 mt-0.5">Civil, Religiosa e Copo d'Água</div>
              </button>

              <button
                type="button"
                onClick={() => setEventChoice('religious_reception')}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${
                  eventChoice === 'religious_reception'
                    ? 'border-[#996d13] bg-[#996d13]/10 text-[#614407] font-semibold ring-1 ring-[#996d13]'
                    : 'border-[#ddd3c0] bg-white text-[#556e64] hover:bg-[#faf7f0]'
                }`}
              >
                <div className="font-bold">Religiosa + Festa</div>
                <div className="text-[11px] opacity-80 mt-0.5">15/10 · Paróquia & Salão MUJA</div>
              </button>

              <button
                type="button"
                onClick={() => setEventChoice('reception')}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${
                  eventChoice === 'reception'
                    ? 'border-[#1b4e41] bg-[#1b4e41]/10 text-[#123e33] font-semibold ring-1 ring-[#1b4e41]'
                    : 'border-[#ddd3c0] bg-white text-[#556e64] hover:bg-[#faf7f0]'
                }`}
              >
                <div className="font-bold">Apenas Copo d'Água</div>
                <div className="text-[11px] opacity-80 mt-0.5">15/10 · SALÃO MUJA (20h00)</div>
              </button>

              <button
                type="button"
                onClick={() => setEventChoice('civil')}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${
                  eventChoice === 'civil'
                    ? 'border-[#1b4e41] bg-[#1b4e41]/10 text-[#123e33] font-semibold ring-1 ring-[#1b4e41]'
                    : 'border-[#ddd3c0] bg-white text-[#556e64] hover:bg-[#faf7f0]'
                }`}
              >
                <div className="font-bold">Apenas Civil</div>
                <div className="text-[11px] opacity-80 mt-0.5">14/10 · Conservatória (08h30)</div>
              </button>
            </div>
          </div>

          {/* Table selection from the 15 Virtuous Tables */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#345548]">
                Mesa Designada no Salão MUJA
              </label>
              <span className="text-[11px] text-[#856314] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>15 Mesas Virtuosas</span>
              </span>
            </div>

            <div className="space-y-2">
              <select
                value={table}
                onChange={(e) => setTable(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#1b3d33] focus:outline-none focus:ring-2 focus:ring-[#1b4e41] transition-all"
              >
                <option value="">-- Selecione uma das 15 mesas (ou deixe em branco se não souber) --</option>
                {WEDDING_TABLES.map((t) => (
                  <option key={t.id} value={`Mesa ${t.id} - ${t.name}`}>
                    Mesa {t.id} - {t.name}
                  </option>
                ))}
                <option value="A confirmar pelos Noivos">Ainda não sei / A confirmar pelos Noivos</option>
                <option value="Outra indicação">Outra indicação</option>
              </select>

              {table === 'Outra indicação' && (
                <input
                  type="text"
                  placeholder="Escreva a indicação da sua mesa"
                  onChange={(e) => setTable(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-[#d6ccb9] bg-white text-[#1b3d33] focus:outline-none focus:ring-1 focus:ring-[#1b4e41]"
                />
              )}
            </div>
          </div>

          {/* Sweet message / wishes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#345548] mb-1.5">
              Mensagem ou Desejo Aos Noivos (Opcional)
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Deixe uma palavra de bênção ou carinho para Paulino & Ana..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d6ccb9] bg-white text-sm text-[#1b3d33] focus:outline-none focus:ring-2 focus:ring-[#1b4e41] transition-all placeholder:text-[#9bb2a8]"
              />
              <MessageSquare className="w-4 h-4 text-[#8ea89e] absolute right-3 bottom-3 pointer-events-none" />
            </div>
          </div>

          {/* Dual Submit Buttons (WhatsApp & Email) */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] text-[#0d3b1e] hover:bg-[#20bd5a] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Confirmar Presença pelo WhatsApp (939 785 068)</span>
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              disabled={!guestName.trim()}
              className={`w-full py-3 px-6 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                guestName.trim()
                  ? 'bg-white border-[#1b4e41] text-[#1b4e41] hover:bg-[#f2f7f4] shadow-xs cursor-pointer'
                  : 'bg-[#faf8f3] border-[#e0d6c4] text-[#93a69e] cursor-not-allowed'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Enviar Confirmação por E-mail (ngalelo2022@gmail.com)</span>
            </button>

            <p className="text-center text-[11px] text-[#6d8a7f] mt-1 font-cormorant italic">
              Ao escolher, a mensagem será enviada diretamente aos noivos no WhatsApp (+244 939 785 068) ou por E-mail (ngalelo2022@gmail.com).
            </p>
          </div>
        </form>

        {/* Quick direct contact note */}
        <div className="mt-8 pt-6 border-t border-[#e2d8c5] text-center text-xs text-[#527063]">
          <div className="flex items-center justify-center gap-1.5 mb-1 font-medium">
            <Heart className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Contacto dos Noivos & Assessoria</span>
          </div>
          <p className="text-[11px] text-[#718b80]">
            WhatsApp: <strong className="text-[#1b4e41]">{WEDDING_CONTACT.phoneDisplay}</strong> · E-mail: <strong className="text-[#1b4e41]">{WEDDING_CONTACT.email}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

