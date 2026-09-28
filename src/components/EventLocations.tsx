import { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Car } from 'lucide-react';
import { MAP_LOCATIONS } from '../utils/calendar';

export function EventLocations() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyAddress = (key: 'civil' | 'religiosa' | 'reception', address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-12" id="locais">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#557b6b] font-semibold mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#557b6b]" />
          <span>Localização dos Eventos</span>
        </div>
        <h2 className="font-script text-4xl sm:text-5xl text-[#0d382f]">
          Como Chegar às Celebrações
        </h2>
        <p className="font-cormorant italic text-sm sm:text-base text-[#567468] mt-1 max-w-md mx-auto">
          Preparamos as indicações detalhadas e rotas diretas no Google Maps para que chegue com todo o conforto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Cerimónia Civil Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e4ddce] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#497061] px-2.5 py-1 bg-[#edf5f1] rounded-full">
                {MAP_LOCATIONS.civil.type}
              </span>
              <span className="text-xs text-[#718b7f] font-mono">
                14/10 · 08h30
              </span>
            </div>

            <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#143d32] mb-1">
              Conservatória Civil
            </h3>
            <p className="text-xs font-semibold text-[#8b6b19] mb-3">
              Sala nº 01 · Lubango
            </p>

            <p className="text-xs text-[#465f55] leading-relaxed mb-4">
              Localizada no centro cívico e administrativo do Lubango. Início pontual às 08h30 na Sala nº 01.
            </p>

            {/* Address Box */}
            <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#ebe4d6] text-xs text-[#39564b] mb-4 flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#557b6b] shrink-0 mt-0.5" />
                <span className="text-[11px]">{MAP_LOCATIONS.civil.address}</span>
              </div>
              <button
                onClick={() => copyAddress('civil', MAP_LOCATIONS.civil.address)}
                className="shrink-0 p-1.5 rounded text-[#557b6b] hover:bg-white transition-colors"
                title="Copiar endereço"
              >
                {copiedKey === 'civil' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Travel Tip */}
            <div className="flex items-center gap-2 text-[11px] text-[#6b857a] bg-[#f5fbf8] p-2.5 rounded-lg border border-[#dcebe3] mb-4">
              <Car className="w-3.5 h-3.5 text-[#4e7d6b] shrink-0" />
              <span>Estacionamento público nas proximidades.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#f0ebd9]">
            <a
              href={MAP_LOCATIONS.civil.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#1b4e41] text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 hover:bg-[#256756] transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#fae596]" />
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* 2. Cerimónia Religiosa Card */}
        <div className="bg-[#fdfbf6] rounded-2xl p-5 sm:p-6 border-2 border-[#d4af37]/50 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative">
          <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#996d13] text-[#fff8e7] text-[10px] uppercase font-bold rounded-full shadow-xs">
            Bênção Sagrada
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#996d13] px-2.5 py-1 bg-[#fdf3db] rounded-full">
                {MAP_LOCATIONS.religiosa.type}
              </span>
              <span className="text-xs text-[#8a6a1c] font-mono font-semibold">
                15/10 · 15h30
              </span>
            </div>

            <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#143d32] mb-1">
              Paróquia De São Francisco De Assis
            </h3>
            <p className="text-xs font-semibold text-[#8b6b19] mb-3">
              Bairro Calumbiro · Lubango
            </p>

            <p className="text-xs text-[#465f55] leading-relaxed mb-4">
              A solene bênção do sacramento do matrimônio perante o altar do Senhor, com a presença de padrinhos e familiares.
            </p>

            {/* Address Box */}
            <div className="p-3 bg-white rounded-xl border border-[#ebd8b4] text-xs text-[#39564b] mb-4 flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#996d13] shrink-0 mt-0.5" />
                <span className="text-[11px]">{MAP_LOCATIONS.religiosa.address}</span>
              </div>
              <button
                onClick={() => copyAddress('religiosa', MAP_LOCATIONS.religiosa.address)}
                className="shrink-0 p-1.5 rounded text-[#996d13] hover:bg-[#faf5eb] transition-colors"
                title="Copiar endereço"
              >
                {copiedKey === 'religiosa' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Travel Tip */}
            <div className="flex items-center gap-2 text-[11px] text-[#7d611f] bg-[#fbf5e8] p-2.5 rounded-lg border border-[#f0debe] mb-4">
              <Car className="w-3.5 h-3.5 text-[#996d13] shrink-0" />
              <span>Localizada no Calumbiro com fácil acesso e estacionamento paroquial.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#f0ebd9]">
            <a
              href={MAP_LOCATIONS.religiosa.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#996d13] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 hover:bg-[#b07e17] transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#fae596]" />
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* 3. Copo d'Água Card (SALÃO MUJA) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e4ddce] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#245345] px-2.5 py-1 bg-[#eaf4ef] rounded-full">
                {MAP_LOCATIONS.reception.type}
              </span>
              <span className="text-xs text-[#718b7f] font-mono">
                15/10 · a partir das 20h00
              </span>
            </div>

            <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#143d32] mb-1">
              SALÃO MUJA (Maxiqueira)
            </h3>
            <p className="text-xs font-semibold text-[#8b6b19] mb-3">
              Antes da antiga PEP · Lubango
            </p>

            <p className="text-xs text-[#465f55] leading-relaxed mb-4">
              O salão festivo para o brinde, banquete e dança com os noivos. Ambiente acolhedor para toda a celebração.
            </p>

            {/* Address Box */}
            <div className="p-3 bg-[#faf8f3] rounded-xl border border-[#ebe4d6] text-xs text-[#39564b] mb-4 flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#557b6b] shrink-0 mt-0.5" />
                <span className="text-[11px]">{MAP_LOCATIONS.reception.address}</span>
              </div>
              <button
                onClick={() => copyAddress('reception', MAP_LOCATIONS.reception.address)}
                className="shrink-0 p-1.5 rounded text-[#557b6b] hover:bg-white transition-colors"
                title="Copiar endereço"
              >
                {copiedKey === 'reception' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Travel Tip */}
            <div className="flex items-center gap-2 text-[11px] text-[#6b857a] bg-[#fdf9ef] p-2.5 rounded-lg border border-[#f1e6cb] mb-4">
              <Car className="w-3.5 h-3.5 text-[#996d13] shrink-0" />
              <span>Maxiqueira, ponto de referência antes da antiga PEP.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#f0ebd9]">
            <a
              href={MAP_LOCATIONS.reception.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#133c31] text-white text-xs font-medium text-center flex items-center justify-center gap-1.5 hover:bg-[#1f5747] transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#fae596]" />
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
