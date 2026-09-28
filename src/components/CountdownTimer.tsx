import { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function CountdownTimer() {
  const [selectedTarget, setSelectedTarget] = useState<'religiosa' | 'reception' | 'civil'>('religiosa');

  const targets = {
    religiosa: {
      name: 'Cerimónia Religiosa',
      date: new Date('2026-10-15T15:30:00'),
      label: '15 de Outubro de 2026 · 15h30 (Paróquia De São Francisco De Assis)',
    },
    reception: {
      name: 'Copo d\'Água & Recepção',
      date: new Date('2026-10-15T20:00:00'),
      label: '15 de Outubro de 2026 · 20h00 (SALÃO MUJA)',
    },
    civil: {
      name: 'Cerimónia Civil',
      date: new Date('2026-10-14T08:30:00'),
      label: '14 de Outubro de 2026 · 08h30 (Conservatória)',
    },
  };

  const calculateTimeLeft = (targetDate: Date): TimeLeft => {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targets[selectedTarget].date)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targets[selectedTarget].date));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTarget]);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-8">
      <div className="relative bg-gradient-to-b from-[#f7f5ed] to-[#f2eee3] rounded-2xl border border-[#ded5c2] p-6 sm:p-8 text-center shadow-md">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#5d8072] font-semibold mb-2">
          <Clock className="w-3.5 h-3.5 text-[#5d8072]" />
          <span>Contagem Regressiva para o Grande Dia</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        <h3 className="font-script text-3xl sm:text-4xl text-[#0f382f] mb-3">
          Estamos a contar cada segundo...
        </h3>

        {/* Event selector tabs */}
        <div className="inline-flex flex-wrap justify-center gap-1 p-1 bg-white/70 rounded-2xl sm:rounded-full border border-[#d2c9b6] mb-6">
          <button
            onClick={() => setSelectedTarget('religiosa')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTarget === 'religiosa'
                ? 'bg-[#996d13] text-white shadow-xs'
                : 'text-[#4e6b5f] hover:text-[#184539]'
            }`}
          >
            Religiosa (15 Out · 15h30)
          </button>
          <button
            onClick={() => setSelectedTarget('reception')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTarget === 'reception'
                ? 'bg-[#184539] text-white shadow-xs'
                : 'text-[#4e6b5f] hover:text-[#184539]'
            }`}
          >
            Copo d'Água (15 Out · 20h00)
          </button>
          <button
            onClick={() => setSelectedTarget('civil')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTarget === 'civil'
                ? 'bg-[#184539] text-white shadow-xs'
                : 'text-[#4e6b5f] hover:text-[#184539]'
            }`}
          >
            Civil (14 Out · 08h30)
          </button>
        </div>

        {/* Timer Numbers Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          {/* Days */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#e1d9ca] shadow-xs flex flex-col items-center">
            <span className="text-2xl sm:text-4xl md:text-5xl font-cormorant font-bold text-[#143b31] tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6a877a] font-medium mt-1">
              Dias
            </span>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#e1d9ca] shadow-xs flex flex-col items-center">
            <span className="text-2xl sm:text-4xl md:text-5xl font-cormorant font-bold text-[#143b31] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6a877a] font-medium mt-1">
              Horas
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#e1d9ca] shadow-xs flex flex-col items-center">
            <span className="text-2xl sm:text-4xl md:text-5xl font-cormorant font-bold text-[#143b31] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6a877a] font-medium mt-1">
              Minutos
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#d4af37]/50 shadow-xs flex flex-col items-center ring-1 ring-[#d4af37]/20">
            <span className="text-2xl sm:text-4xl md:text-5xl font-cormorant font-bold text-[#9e7617] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#9e7617] font-medium mt-1">
              Segundos
            </span>
          </div>
        </div>

        <p className="text-xs text-[#6e8a7f] font-cormorant italic mt-4">
          {targets[selectedTarget].label} · Lubango, Angola
        </p>
      </div>
    </section>
  );
}
