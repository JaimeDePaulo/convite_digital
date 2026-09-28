import { useState, useEffect } from 'react';
import { Gift, Sparkles, Heart, MessageCircle, Copy, Check, Share2, Send, Mail, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createWhatsAppWishUrl, createEmailWishMailto, WEDDING_CONTACT, WEDDING_TABLES } from '../utils/calendar';

interface WishMessage {
  id: string;
  author: string;
  text: string;
  date: string;
}

const INITIAL_MESSAGES: WishMessage[] = [
  {
    id: '1',
    author: 'Catarina & Manuel Joaquim',
    text: 'Que o Senhor Jesus continue a abençoar essa união com sabedoria, paz e muita cumplicidade. Orgulho imenso de vocês!',
    date: '2026-09-20',
  },
  {
    id: '2',
    author: 'Tia Rosa & Família',
    text: 'Queridos Paulino e Ana, que a alegria deste enlace se renove a cada amanhecer. Vocês foram feitos um para o outro!',
    date: '2026-09-22',
  },
  {
    id: '3',
    author: 'Alberto de Paulo & Elsa',
    text: 'Nossos corações transbordam de amor por ver a nossa menina construir uma linda família. Que Deus vos guarde sempre.',
    date: '2026-09-24',
  },
];

export function GuestbookAndDetails() {
  const [messages, setMessages] = useState<WishMessage[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [authorName, setAuthorName] = useState('');
  const [newWish, setNewWish] = useState('');
  const [copiedGift, setCopiedGift] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lastPosted, setLastPosted] = useState<WishMessage | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_guestbook_messages', JSON.stringify(messages));
    } catch {
      // Ignored
    }
  }, [messages]);

  const addMessageToState = (author: string, text: string): WishMessage => {
    const newMsg: WishMessage = {
      id: Date.now().toString(),
      author: author.trim(),
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    setMessages([newMsg, ...messages]);
    setAuthorName('');
    setNewWish('');
    setLastPosted(newMsg);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d4af37', '#82a592', '#e8d8c8'],
    });

    return newMsg;
  };

  const handlePostOnly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !newWish.trim()) return;
    addMessageToState(authorName, newWish);
  };

  const handlePostAndSendWhatsApp = () => {
    if (!authorName.trim() || !newWish.trim()) return;
    const author = authorName;
    const text = newWish;
    addMessageToState(author, text);
    const url = createWhatsAppWishUrl(author, text);
    window.open(url, '_blank');
  };

  const handlePostAndSendEmail = () => {
    if (!authorName.trim() || !newWish.trim()) return;
    const author = authorName;
    const text = newWish;
    addMessageToState(author, text);
    const mailto = createEmailWishMailto(author, text);
    window.location.href = mailto;
  };

  const copyIban = () => {
    navigator.clipboard.writeText('AO06.0040.0000.1234.5678.9012.3');
    setCopiedGift(true);
    setTimeout(() => setCopiedGift(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Casamento Paulino Joaquim & Ana da Cruz',
      text: 'Você foi convidado para o casamento de Paulino & Ana no Lubango! Veja todos os detalhes no convite digital:',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-12" id="informacoes">
      {/* Information Cards (Dress Code & Gift Suggestions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Dress Code */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4ddce] shadow-xs">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#547b6a] font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Traje Sugerido</span>
          </div>
          <h3 className="font-cormorant font-bold text-2xl text-[#143e33] mb-2">
            Passeio Completo / Esporte Fino
          </h3>
          <p className="text-xs sm:text-sm text-[#4f6b5f] leading-relaxed mb-4">
            Para celebrar connosco com toda elegância, sugerimos trajes formais. Convidamos também os presentes a prestigiarem a nossa paleta de <strong>tons pastéis, verde eucalipto e dourado suave</strong>.
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-[#f0ebd9]">
            <span className="text-[11px] text-[#6b857a] font-medium">Paleta da festa:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#82a592] border border-white shadow-2xs" title="Verde Eucalipto" />
              <span className="w-5 h-5 rounded-full bg-[#3a8ba5] border border-white shadow-2xs" title="Azul Pastel" />
              <span className="w-5 h-5 rounded-full bg-[#e8cf7e] border border-white shadow-2xs" title="Dourado Suave" />
              <span className="w-5 h-5 rounded-full bg-[#f4ece1] border border-[#d6cbba] shadow-2xs" title="Champagne / Marfim" />
            </div>
          </div>
        </div>

        {/* Gift Suggestion / IBAN */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4ddce] shadow-xs">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#996d13] font-semibold mb-2">
            <Gift className="w-4 h-4 text-[#996d13]" />
            <span>Lista de Presentes</span>
          </div>
          <h3 className="font-cormorant font-bold text-2xl text-[#143e33] mb-2">
            Nossa Casa Nova & Lua de Mel
          </h3>
          <p className="text-xs sm:text-sm text-[#4f6b5f] leading-relaxed mb-4">
            O maior presente é a sua presença e oração! Para quem desejar nos agraciar com um mimo ou contribuição para o nosso novo lar:
          </p>

          <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#ebe4d6] flex items-center justify-between gap-2">
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-[#8a6b1f] block">Transferência Bancária (IBAN - Angola):</span>
              <span className="font-mono text-[#244b3e] font-semibold text-xs sm:text-sm">
                AO06.0040.0000.1234.5678.9012.3
              </span>
              <span className="text-[10px] text-[#789689] block mt-0.5">Titular: Paulino Joaquim & Ana da Cruz (BFA)</span>
            </div>
            <button
              onClick={copyIban}
              className="p-2 rounded-lg bg-white border border-[#d8cdb8] text-[#557b6b] hover:bg-[#edf5f1] transition-colors shrink-0"
              title="Copiar IBAN"
            >
              {copiedGift ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* As 15 Mesas Temáticas & Virtudes do Copo d'Água (Salão MUJA) */}
      <div className="bg-gradient-to-b from-[#fcfbf7] to-[#f7f4ec] rounded-3xl p-6 sm:p-8 border border-[#ded5c4] shadow-xs mb-12">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#996d13] font-semibold mb-1">
            <Users className="w-3.5 h-3.5 text-[#996d13]" />
            <span>Distribuição das 15 Mesas · SALÃO MUJA</span>
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>
          <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#123e32]">
            Mesas Nomeadas pelas Virtudes
          </h3>
          <p className="font-cormorant italic text-xs sm:text-sm text-[#547366] max-w-lg mx-auto mt-1">
            No copo d'água, as mesas dos convidados foram batizadas com as nobres virtudes que fortalecem a caminhada a dois:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WEDDING_TABLES.map((t) => (
            <div
              key={t.id}
              className="bg-white p-3.5 rounded-xl border border-[#e8dfcb] hover:border-[#996d13]/60 transition-all flex items-start gap-3 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#f4ede1] border border-[#d8ccb8] flex items-center justify-center font-cormorant font-bold text-xs text-[#133e32] shrink-0 mt-0.5">
                {t.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-cormorant font-bold text-base text-[#113a30] leading-snug">
                  {t.id} - {t.name}
                </div>
                <div className="text-[11px] text-[#638075] font-cormorant italic mt-0.5 leading-tight">
                  "{t.virtueDescription}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guestbook / Mural de Mensagens */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e3dac9] shadow-sm mb-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#557b6b] font-semibold mb-2">
            <MessageCircle className="w-4 h-4 text-[#557b6b]" />
            <span>Mural de Bênçãos</span>
            <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
          </div>
          <h3 className="font-script text-4xl sm:text-5xl text-[#0d382f]">
            Recados & Votos de Felicidades
          </h3>
          <p className="font-cormorant italic text-sm text-[#526f63] mt-1 max-w-md mx-auto">
            Deixe palavras de carinho e fé para que os noivos guardem no coração para sempre.
          </p>
        </div>

        {/* Leave a wish form */}
        <form onSubmit={handlePostOnly} className="bg-[#faf8f4] rounded-2xl p-4 sm:p-6 border border-[#e8e2d4] mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#496b5e] mb-1">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                placeholder="Ex.: Família Silva"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#d6ccb9] text-[#1b3d33] focus:outline-none focus:ring-1 focus:ring-[#1b4e41]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#496b5e] mb-1">
                Sua Mensagem aos Noivos *
              </label>
              <input
                type="text"
                required
                placeholder="Desejamos infinitas bênçãos e alegrias nessa nova etapa..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#d6ccb9] text-[#1b3d33] focus:outline-none focus:ring-1 focus:ring-[#1b4e41]"
              />
            </div>
          </div>

          {/* Action buttons to send to WhatsApp, Email or Mural */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#eee7d8]">
            <button
              type="button"
              onClick={handlePostAndSendWhatsApp}
              disabled={!authorName.trim() || !newWish.trim()}
              className="px-3.5 py-2 rounded-xl bg-[#25D366] text-[#0d3b1e] hover:bg-[#20bd5a] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar & Enviar no WhatsApp (939 785 068)</span>
            </button>

            <button
              type="button"
              onClick={handlePostAndSendEmail}
              disabled={!authorName.trim() || !newWish.trim()}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#1b4e41] text-[#1b4e41] hover:bg-[#f2f7f4] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enviar por E-mail (ngalelo2022@gmail.com)</span>
            </button>

            <button
              type="submit"
              disabled={!authorName.trim() || !newWish.trim()}
              className="px-3.5 py-2 rounded-xl bg-[#1b4e41] text-white text-xs font-medium hover:bg-[#256857] transition-all disabled:opacity-50 cursor-pointer"
            >
              Apenas Publicar no Mural
            </button>
          </div>
        </form>

        {lastPosted && (
          <div className="mb-4 p-3 bg-[#eef8f2] border border-[#b2e5c6] rounded-xl text-xs text-[#1c643b] flex items-center justify-between gap-2">
            <span>
              Recado de <strong>{lastPosted.author}</strong> registrado! Notificação configurada para <strong>{WEDDING_CONTACT.phoneDisplay}</strong> e <strong>{WEDDING_CONTACT.email}</strong>.
            </span>
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>
        )}

        {/* List of Messages */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {messages.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#fdfcfa] border border-[#eee8db] text-xs sm:text-sm text-[#3b574c] hover:border-[#82a592]/50 transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-semibold text-[#184539]">{item.author}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#86a195] font-mono">{item.date}</span>
                  <a
                    href={createWhatsAppWishUrl(item.author, item.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-[#25D366] hover:bg-[#eaf8ee]"
                    title="Enviar este recado para o WhatsApp dos noivos (939 785 068)"
                  >
                    <Send className="w-3 h-3" />
                  </a>
                  <a
                    href={createEmailWishMailto(item.author, item.text)}
                    className="p-1 rounded text-[#1b4e41] hover:bg-[#edf5f1]"
                    title="Enviar este recado para o e-mail dos noivos (ngalelo2022@gmail.com)"
                  >
                    <Mail className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="font-cormorant italic text-sm sm:text-base text-[#466559] leading-relaxed">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Share Invitation Banner */}
      <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-[#edf4f0] via-[#f8f5ee] to-[#edf4f0] border border-[#d8e5de] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="font-cormorant font-bold text-lg text-[#143e33]">
            Compartilhe este convite com amigos e familiares
          </h4>
          <p className="text-xs text-[#5f7d71]">
            Envie para quem também fará parte deste momento abençoado no Lubango.
          </p>
        </div>

        <button
          onClick={handleShare}
          className="px-5 py-2.5 rounded-full bg-white border border-[#cadad1] text-xs font-semibold text-[#194b3e] hover:bg-[#194b3e] hover:text-white transition-all flex items-center gap-2 shadow-xs shrink-0"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar Convite</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
