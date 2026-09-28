import { useState } from 'react';
import { Music, Play, Pause, Link, Upload, Check, X, Sparkles, Volume2 } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface AudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function AudioPlayerModal({
  isOpen,
  onClose,
  isPlaying,
  onTogglePlay,
}: AudioPlayerModalProps) {
  const [customUrl, setCustomUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    weddingAudio.setCustomAudioUrl(customUrl.trim());
    setSuccessMsg('Música personalizada carregada e em reprodução!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      weddingAudio.setCustomAudioUrl(objectUrl);
      setSuccessMsg(`Ficheiro "${file.name}" carregado com sucesso!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleResetToCanon = () => {
    weddingAudio.stop();
    // Clear custom URL and resume Canon in D
    weddingAudio.setCustomAudioUrl('');
    weddingAudio.startMusic();
    setSuccessMsg('Melodia restaurada para o Canon in D (Piano Romântico)!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f4] rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#ded5c2] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6b857a] hover:bg-[#eee8db] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f2ede4] border border-[#d6cbba] flex items-center justify-center mx-auto mb-3 text-[#143e33]">
            <Music className="w-6 h-6 text-[#1b4e41] animate-pulse" />
          </div>
          <h3 className="font-cormorant font-bold text-2xl text-[#123e32]">
            Música do Convite
          </h3>
          <p className="text-xs text-[#526f63] font-cormorant italic mt-0.5">
            Canon in D · Versão Piano Solo Romântico de Casamento
          </p>
        </div>

        {/* Classical Selection Buttons */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#496b5e] mb-2">
            Músicas Clássicas de Casamento:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                weddingAudio.setPreset('canon');
                setSuccessMsg('Melodia "Canon in D" selecionada!');
                setTimeout(() => setSuccessMsg(''), 4000);
              }}
              className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                !weddingAudio.getCustomAudioUrl() && weddingAudio.getPreset() === 'canon'
                  ? 'bg-[#1b4e41] text-white border-[#1b4e41] shadow-xs'
                  : 'bg-white border-[#dcd3c1] text-[#214337] hover:bg-[#f6f2e9]'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>Canon in D</span>
                {!weddingAudio.getCustomAudioUrl() && weddingAudio.getPreset() === 'canon' && (
                  <Check className="w-3.5 h-3.5 text-[#e5c976]" />
                )}
              </div>
              <div className={`text-[10px] ${!weddingAudio.getCustomAudioUrl() && weddingAudio.getPreset() === 'canon' ? 'text-white/80' : 'text-[#6d8a7f]'}`}>
                Pachelbel · Piano Romântico
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                weddingAudio.setPreset('wagner');
                setSuccessMsg('Melodia "Marcha Nupcial (Wagner)" selecionada!');
                setTimeout(() => setSuccessMsg(''), 4000);
              }}
              className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                !weddingAudio.getCustomAudioUrl() && weddingAudio.getPreset() === 'wagner'
                  ? 'bg-[#1b4e41] text-white border-[#1b4e41] shadow-xs'
                  : 'bg-white border-[#dcd3c1] text-[#214337] hover:bg-[#f6f2e9]'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>Marcha Nupcial</span>
                {!weddingAudio.getCustomAudioUrl() && weddingAudio.getPreset() === 'wagner' && (
                  <Check className="w-3.5 h-3.5 text-[#e5c976]" />
                )}
              </div>
              <div className={`text-[10px] ${!weddingAudio.getCustomAudioUrl() && weddingAudio.getPreset() === 'wagner' ? 'text-white/80' : 'text-[#6d8a7f]'}`}>
                Wagner · Clássica de Entrada
              </div>
            </button>
          </div>
        </div>

        {/* Current Track Playback Box */}
        <div className="bg-white p-4 rounded-2xl border border-[#e2d8c6] mb-5 shadow-2xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onTogglePlay}
                className="w-12 h-12 rounded-full bg-[#1b4e41] text-white flex items-center justify-center hover:bg-[#256656] shadow-sm transition-transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pausar música' : 'Tocar música'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div>
                <div className="font-semibold text-xs text-[#133e32]">
                  {weddingAudio.getCustomAudioUrl()
                    ? 'Música Personalizada (Ficheiro/Link)'
                    : weddingAudio.getPreset() === 'wagner'
                    ? 'Wagner: Marcha Nupcial Clássica'
                    : 'Pachelbel: Canon in D (Piano Romântico) · Áudio em Anexo'}
                </div>
                <div className="text-[11px] text-[#69867b] flex items-center gap-1 mt-0.5">
                  <Volume2 className="w-3 h-3 text-[#996d13]" />
                  <span>{isPlaying ? 'A tocar ao vivo no convite' : 'Em pausa'}</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#f4ece1] rounded text-[#856314]">
              {isPlaying ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* Feedback alert */}
        {successMsg && (
          <div className="mb-4 p-3 bg-[#eef8f2] border border-[#b2e5c6] rounded-xl text-xs text-[#1c643b] flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Custom Audio URL or File Options */}
        <div className="space-y-4 pt-2 border-t border-[#e2d8c6]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#496b5e] flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-[#996d13]" />
            <span>Inserir Link de Áudio (MP3 / Web)</span>
          </div>

          <form onSubmit={handleApplyUrl} className="flex gap-2">
            <input
              type="url"
              placeholder="https://exemplo.com/musica.mp3"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#d6ccb9] bg-white text-[#1b3d33] focus:outline-none focus:ring-1 focus:ring-[#1b4e41]"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#1b4e41] text-white text-xs font-semibold hover:bg-[#256857] transition-colors shrink-0 cursor-pointer"
            >
              Aplicar Link
            </button>
          </form>

          {/* Or upload from device */}
          <div className="pt-2">
            <label className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#c5b8a0] bg-white/70 hover:bg-white text-xs text-[#4b6b5e] flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#996d13]" />
              <span>Ou carregar ficheiro de áudio do seu celular / PC</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {weddingAudio.getCustomAudioUrl() && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={handleResetToCanon}
                className="text-[11px] text-[#856314] hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Restaurar melodia padrão (Canon in D)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
