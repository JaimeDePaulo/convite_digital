import { useState } from 'react';
import { FloralMonogram } from './FloralMonogram';
import { Calendar, MapPin, Users, Heart, Sparkles, X, Check } from 'lucide-react';
import { WEDDING_TABLES } from '../utils/calendar';

interface HeroInvitationProps {
  guestName?: string;
  tableNumber?: string;
  onSelectTable?: (table: string) => void;
  onOpenMap: (type: 'civil' | 'religiosa' | 'reception') => void;
  onOpenCalendar: (type: 'civil' | 'religiosa' | 'reception') => void;
  onOpenRsvp: () => void;
}

export function HeroInvitation({
  guestName: _guestName,
  tableNumber,
  onSelectTable,
  onOpenMap,
  onOpenCalendar,
  onOpenRsvp,
}: HeroInvitationProps) {
  const [showTableGuide, setShowTableGuide] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>(
    tableNumber || 'Mesa 1 - SABEDORIA'
  );

  const handleChooseTable = (tableName: string) => {
    setSelectedTable(tableName);
    if (onSelectTable) onSelectTable(tableName);
    setShowTableGuide(false);
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      {/* Invitation Card Body (Parchment Paper Frame with Gold & Pastel Border) */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#e8e2d5] p-6 sm:p-10 md:p-14 overflow-hidden text-center transition-all">
        {/* Subtle decorative inner hairline border */}
        <div className="absolute inset-2 sm:inset-3 rounded-xl border border-[#d4af37]/35 pointer-events-none" />

        {/* Top-Left Botanical Watercolor Leaves & White Rose (SVG styling) */}
        <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none opacity-85 select-none">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            {/* Soft eucalyptus branches */}
            <path d="M 0 100 C 40 80 80 40 100 0" stroke="#719483" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <ellipse cx="40" cy="70" rx="18" ry="10" transform="rotate(-30 40 70)" fill="#82a592" opacity="0.75" />
            <ellipse cx="65" cy="45" rx="16" ry="9" transform="rotate(-45 65 45)" fill="#628674" opacity="0.7" />
            <ellipse cx="85" cy="20" rx="14" ry="8" transform="rotate(-60 85 20)" fill="#9bbba9" opacity="0.8" />
            {/* White rose with soft cream shading */}
            <circle cx="45" cy="45" r="28" fill="#fcfbf7" stroke="#e8dfce" strokeWidth="1" />
            <path d="M 32 40 C 35 30 55 30 58 40 C 50 52 40 50 32 40 Z" fill="#f5eee1" opacity="0.8" />
            <path d="M 38 42 C 42 35 52 35 50 45 C 45 48 40 46 38 42 Z" fill="#ebdfcb" opacity="0.9" />
          </svg>
        </div>

        {/* Bottom-Right Botanical Watercolor Leaves & White Rose */}
        <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none opacity-85 select-none rotate-180">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <path d="M 0 100 C 40 80 80 40 100 0" stroke="#719483" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <ellipse cx="40" cy="70" rx="18" ry="10" transform="rotate(-30 40 70)" fill="#82a592" opacity="0.75" />
            <ellipse cx="65" cy="45" rx="16" ry="9" transform="rotate(-45 65 45)" fill="#628674" opacity="0.7" />
            <ellipse cx="85" cy="20" rx="14" ry="8" transform="rotate(-60 85 20)" fill="#9bbba9" opacity="0.8" />
            <circle cx="45" cy="45" r="28" fill="#fcfbf7" stroke="#e8dfce" strokeWidth="1" />
            <path d="M 32 40 C 35 30 55 30 58 40 C 50 52 40 50 32 40 Z" fill="#f5eee1" opacity="0.8" />
          </svg>
        </div>

        {/* 1. Monogram Emblem */}
        <div className="mb-4">
          <FloralMonogram className="mx-auto" />
        </div>

        {/* 2. Holy Scripture (I Coríntios 13:13) */}
        <div className="max-w-md mx-auto mb-6 px-2">
          <p className="font-cormorant italic text-base sm:text-lg text-[#324f45] leading-relaxed">
            "...Assim permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor."
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b897d] font-semibold mt-1">
            I Coríntios 13:13
          </p>
        </div>

        {/* 3. Parents' Blessing */}
        <div className="mb-8">
          <p className="font-script text-2xl sm:text-3xl text-[#1e483e] mb-3">
            Com a bênção de Deus e de seus pais:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-sm sm:text-base text-[#243f36]">
            {/* Groom's Parents */}
            <div className="sm:border-r sm:border-[#d6cbbc]/60 sm:pr-4 py-1">
              <p className="font-semibold tracking-wide">Manuel Joaquim</p>
              <p className="font-semibold tracking-wide">Catarina Joaquim</p>
            </div>
            {/* Bride's Parents */}
            <div className="sm:pl-4 py-1">
              <p className="font-semibold tracking-wide">Alberto de Paulo</p>
              <p className="font-semibold tracking-wide">Elsa Maria da Cruz</p>
            </div>
          </div>
        </div>

        {/* 4. Couple's Names with Golden Interlocking Rings */}
        <div className="my-8 py-3 px-2 border-y border-[#d4af37]/30 bg-gradient-to-r from-transparent via-[#faf7f0] to-transparent">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6">
            {/* Groom */}
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#0b382e] font-normal leading-tight">
              Paulino Joaquim
            </span>

            {/* Intertwined Golden Rings Graphic */}
            <div className="flex items-center justify-center py-1">
              <svg viewBox="0 0 80 50" className="w-14 h-10 drop-shadow-sm select-none" fill="none">
                <defs>
                  <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fae596" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#9a771b" />
                  </linearGradient>
                </defs>
                {/* Ring 1 */}
                <ellipse
                  cx="28"
                  cy="25"
                  rx="18"
                  ry="13"
                  stroke="url(#goldRing)"
                  strokeWidth="4"
                  transform="rotate(-15 28 25)"
                  fill="none"
                />
                {/* Ring 2 interlocking */}
                <ellipse
                  cx="50"
                  cy="25"
                  rx="18"
                  ry="13"
                  stroke="url(#goldRing)"
                  strokeWidth="4"
                  transform="rotate(15 50 25)"
                  fill="none"
                />
              </svg>
            </div>

            {/* Bride */}
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#0b382e] font-normal leading-tight">
              Ana da Cruz
            </span>
          </div>

          <p className="font-cormorant text-base sm:text-lg text-[#4a6b5e] mt-2 font-medium tracking-wide">
            Tem a honra de convidar os exmos Senhores(a):
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#719183] mt-1 font-semibold">
            A assistir o seu enlace Matrimonial a realizar-se
          </p>
        </div>

        {/* 5. Main Wedding Date Display */}
        <div className="my-6">
          <div className="inline-block relative">
            <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#0d3b31] font-normal tracking-wide px-4">
              Dia 15 de Outubro de 2026
            </h2>
            <div className="w-24 sm:w-32 h-[1px] bg-[#d4af37] mx-auto mt-2" />
          </div>
        </div>

        {/* 6. Detailed Schedule & Venues Summary */}
        <div className="mt-8 space-y-4 max-w-xl mx-auto text-left">
          {/* Civil Ceremony Card (8h30) */}
          <div className="bg-[#faf8f3] rounded-xl p-4 sm:p-5 border border-[#e3dcce] hover:border-[#82a592]/50 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#54796b] font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#54796b]" />
                  <span>14 de Outubro de 2026 · 08h30 (Início Pontual)</span>
                </div>
                <h3 className="font-semibold text-base text-[#1b3d33]">
                  Cerimónia Civil
                </h3>
                <p className="text-xs sm:text-sm text-[#4b665c] mt-1">
                  <strong>Conservatória Civil do Lubango</strong> — Sala nº 01
                </p>
                <p className="text-xs text-[#718c81] mt-0.5">
                  Lubango, Província da Huíla, Angola
                </p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenMap('civil')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#c5d8cf] text-xs font-medium text-[#1b4337] hover:bg-[#edf5f1] transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-[#54796b]" />
                  <span>Ver Mapa</span>
                </button>
                <button
                  onClick={() => onOpenCalendar('civil')}
                  className="px-3 py-1.5 rounded-lg bg-[#f0ede4] text-xs font-medium text-[#465d54] hover:bg-[#e4dec2] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Salvar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Religious Ceremony Card */}
          <div className="bg-[#fbf9f2] rounded-xl p-4 sm:p-5 border border-[#e8dfcb] hover:border-[#d4af37]/70 transition-all ring-1 ring-[#d4af37]/25">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#996d13] font-semibold mb-1">
                  <Heart className="w-3.5 h-3.5 fill-[#d4af37]/30 text-[#996d13]" />
                  <span>15 de Outubro de 2026 · 15h30</span>
                </div>
                <h3 className="font-semibold text-base text-[#1b3d33]">
                  Cerimónia Religiosa
                </h3>
                <p className="text-xs sm:text-sm text-[#4b665c] mt-1">
                  <strong>Paróquia De São Francisco De Assis - Calumbiro</strong>
                </p>
                <p className="text-xs text-[#718c81] mt-0.5">
                  Bairro Calumbiro, Lubango, Província da Huíla, Angola
                </p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenMap('religiosa')}
                  className="px-3 py-1.5 rounded-lg bg-[#996d13] text-white text-xs font-medium hover:bg-[#b07e17] transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-[#fae596]" />
                  <span>Ver Mapa</span>
                </button>
                <button
                  onClick={() => onOpenCalendar('religiosa')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#dfd2be] text-xs font-medium text-[#6b5016] hover:bg-[#faf4e6] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Salvar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Copo d'Água / Reception Card */}
          <div className="bg-[#f5f7f5] rounded-xl p-4 sm:p-5 border border-[#d6e3dc] hover:border-[#54796b]/60 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2d6153] font-semibold mb-1">
                  <Heart className="w-3.5 h-3.5 fill-[#2d6153]/20 text-[#2d6153]" />
                  <span>15 de Outubro de 2026 · a partir das 20h00</span>
                </div>
                <h3 className="font-semibold text-base text-[#133c31]">
                  Copo d'Água & Celebração Festiva
                </h3>
                <p className="text-xs sm:text-sm text-[#355c4f] mt-1">
                  <strong>SALÃO MUJA</strong> (localizado na Maxiqueira antes da antiga PEP)
                </p>
                <p className="text-xs text-[#638779] mt-0.5">
                  Lubango, Província da Huíla, Angola
                </p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenMap('reception')}
                  className="px-3 py-1.5 rounded-lg bg-[#194b3e] text-xs font-medium text-white hover:bg-[#236050] transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  <span>Ver Mapa</span>
                </button>
                <button
                  onClick={() => onOpenCalendar('reception')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#cadad1] text-xs font-medium text-[#2d574a] hover:bg-[#eff7f3] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Salvar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Guest Table / Personalization Section (15 Virtuous Tables) */}
        <div className="mt-8 pt-6 border-t border-[#e5dfd2] max-w-xl mx-auto">
          <div className="bg-[#faf8f4] p-4 sm:p-5 rounded-2xl border border-[#ded5c2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#5a7b6e] mb-1">
                <Users className="w-3.5 h-3.5 text-[#5a7b6e]" />
                <span>Mesa de Honra no Salão MUJA:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-cormorant font-bold text-xl sm:text-2xl text-[#124237]">
                  {selectedTable}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              </div>
              <p className="text-[11px] text-[#718f82] mt-0.5">
                Nomeada segundo as virtudes do fruto e dons divinos.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowTableGuide(true)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white border border-[#cfc3ae] text-xs font-semibold text-[#1f493c] hover:bg-[#f3eee5] transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Ver as 15 Mesas</span>
              </button>

              <button
                type="button"
                onClick={onOpenRsvp}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#1b4e41] text-white text-xs font-semibold hover:bg-[#256656] shadow-xs transition-all cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: As 15 Mesas Temáticas & Virtudes */}
      {showTableGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowTableGuide(false)}
        >
          <div
            className="bg-[#faf8f4] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#ded5c2] shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowTableGuide(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6b857a] hover:bg-[#eee8db] transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-5 shrink-0">
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-[#996d13] font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Salão MUJA · Recepção Festiva</span>
              </div>
              <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#123e32]">
                As 15 Mesas do Casamento
              </h3>
              <p className="text-xs text-[#526f63] font-cormorant italic mt-1">
                Cada mesa homenageia uma virtude cristã que alicerça o matrimônio de Paulino & Ana.
              </p>
            </div>

            {/* Grid / List of 15 Tables */}
            <div className="overflow-y-auto pr-1 space-y-2.5 flex-1">
              {WEDDING_TABLES.map((t) => {
                const label = `Mesa ${t.id} - ${t.name}`;
                const isSelected = selectedTable === label;

                return (
                  <div
                    key={t.id}
                    onClick={() => handleChooseTable(label)}
                    className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-[#1b4e41] shadow-xs ring-1 ring-[#1b4e41]'
                        : 'bg-white/80 border-[#e6decf] hover:border-[#1b4e41]/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f2ede4] border border-[#d6cbba] flex items-center justify-center font-cormorant font-bold text-sm text-[#143e33] shrink-0 mt-0.5">
                        {t.id}
                      </div>
                      <div>
                        <div className="font-cormorant font-bold text-base sm:text-lg text-[#133e32]">
                          {t.id} - {t.name}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#627e73] font-cormorant italic">
                          "{t.virtueDescription}"
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="px-2 py-1 rounded-md bg-[#eaf5ef] text-[#196b42] text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Selecionada</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-md bg-[#faf7f0] border border-[#dfd5c4] text-[10px] font-medium text-[#466559] hover:bg-[#1b4e41] hover:text-white transition-colors"
                        >
                          Escolher
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-[#e2d8c5] text-center text-[11px] text-[#789689] shrink-0">
              Toque na sua mesa para marcar no seu convite e incluir na confirmação de presença.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
