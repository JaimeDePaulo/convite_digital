/**
 * Web Audio API synthesizer for the Classical Wedding March (Marcha Nupcial Clássica)
 * Features the majestic bridal chorus ("Here Comes the Bride" / Marcha Nupcial de Wagner & Mendelssohn)
 * with regal church organ and orchestral harmonies.
 */

class ClassicalWeddingSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private sequenceTimer: number | null = null;
  private volume: number = 0.28;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a rich classical church organ chord with warm overtones
  public playOrganNote(
    freq: number,
    duration: number,
    timeOffset: number = 0,
    velocity: number = 1.0
  ) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + timeOffset;

      // Two oscillator harmonics for majestic organ pipe timbre
      const fundamental = this.ctx.createOscillator();
      const octave = this.ctx.createOscillator();
      const fifth = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      fundamental.type = 'triangle';
      fundamental.frequency.setValueAtTime(freq, now);

      octave.type = 'sine';
      octave.frequency.setValueAtTime(freq * 2, now);

      fifth.type = 'sine';
      fifth.frequency.setValueAtTime(freq * 1.5, now);

      const targetGain = this.volume * velocity;
      gain.gain.setValueAtTime(0.0001, now);
      // Majestic soft-attack
      gain.gain.linearRampToValueAtTime(targetGain * 0.45, now + 0.09);
      // Sustained organ tone
      gain.gain.setValueAtTime(targetGain * 0.4, now + Math.max(0.1, duration - 0.15));
      // Natural cathedral room decay
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.3);

      fundamental.connect(gain);
      octave.connect(gain);
      fifth.connect(gain);
      gain.connect(this.ctx.destination);

      fundamental.start(now);
      octave.start(now);
      fifth.start(now);

      fundamental.stop(now + duration + 0.35);
      octave.stop(now + duration + 0.35);
      fifth.stop(now + duration + 0.35);

      this.activeOscillators.push(fundamental, octave, fifth);
    } catch {
      // AudioContext policy
    }
  }

  // Triumphant opening fanfare played at the exact instant the envelope opens
  public playFanfareTriumphant() {
    try {
      this.initCtx();
      // Royal opening herald fanfare (F4 - Bb4 - D5 - F5)
      const fanfare = [
        { freq: 349.23, dur: 0.22, delay: 0.0 },   // F4
        { freq: 349.23, dur: 0.22, delay: 0.24 },  // F4
        { freq: 349.23, dur: 0.22, delay: 0.48 },  // F4
        { freq: 466.16, dur: 0.9, delay: 0.72 },   // Bb4 (held)
        { freq: 587.33, dur: 0.22, delay: 1.65 },  // D5
        { freq: 587.33, dur: 0.22, delay: 1.88 },  // D5
        { freq: 698.46, dur: 1.2, delay: 2.12 },   // F5 (triumphant crest)
      ];

      fanfare.forEach((n) => {
        this.playOrganNote(n.freq, n.dur, n.delay, 1.2);
        // Bass foundation
        if (n.dur > 0.5) {
          this.playOrganNote(n.freq / 2, n.dur, n.delay, 0.7);
        }
      });
    } catch {
      // Ignored
    }
  }

  // Starts the Classical Wedding March (Wagner Bridal Chorus / Marcha Nupcial Clássica)
  public startClassicalWeddingMarch() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.initCtx();

    // Notes frequencies (Key of F / Bb Major - Classic Bridal March):
    // Bb3 = 233.08, C4 = 261.63, D4 = 293.66, Eb4 = 311.13, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25, D5 = 587.33, Eb5 = 622.25, F5 = 698.46
    const bpm = 68; // Traditional solemn wedding tempo
    const beat = 60 / bpm; // ~0.88s per quarter note

    // Classic Theme: "Treulich geführt" (Marcha Nupcial tradicional de casamento)
    // "Dum... dum-da-dum... dum... dum-da-dum..."
    const phrase = [
      // Measure 1: F4 (half), Bb4 (dotted eighth), Bb4 (sixteenth), Bb4 (half)
      { note: 349.23, bass: 174.61, dur: beat * 0.9, time: 0 },
      { note: 466.16, bass: 233.08, dur: beat * 0.65, time: beat },
      { note: 466.16, bass: 233.08, dur: beat * 0.3, time: beat * 1.7 },
      { note: 466.16, bass: 233.08, dur: beat * 1.8, time: beat * 2.0 },

      // Measure 2: F4 (half), C5 (dotted eighth), A4 (sixteenth), Bb4 (half)
      { note: 349.23, bass: 174.61, dur: beat * 0.9, time: beat * 4.0 },
      { note: 523.25, bass: 261.63, dur: beat * 0.65, time: beat * 5.0 },
      { note: 440.00, bass: 220.00, dur: beat * 0.3, time: beat * 5.7 },
      { note: 466.16, bass: 233.08, dur: beat * 1.8, time: beat * 6.0 },

      // Measure 3: F4, Bb4, D5, F5, Eb5, D5, C5, Bb4
      { note: 349.23, bass: 174.61, dur: beat * 0.9, time: beat * 8.0 },
      { note: 466.16, bass: 233.08, dur: beat * 0.65, time: beat * 9.0 },
      { note: 587.33, bass: 293.66, dur: beat * 0.3, time: beat * 9.7 },
      { note: 698.46, bass: 349.23, dur: beat * 1.3, time: beat * 10.0 },

      { note: 622.25, bass: 311.13, dur: beat * 0.6, time: beat * 11.5 },
      { note: 587.33, bass: 293.66, dur: beat * 0.6, time: beat * 12.2 },
      { note: 523.25, bass: 261.63, dur: beat * 0.6, time: beat * 12.9 },
      { note: 466.16, bass: 233.08, dur: beat * 2.5, time: beat * 13.6 },

      // Counter-phrase (Mendelssohn / Canon in D motif continuation)
      { note: 587.33, bass: 293.66, dur: beat * 0.9, time: beat * 16.5 },
      { note: 698.46, bass: 349.23, dur: beat * 0.9, time: beat * 17.5 },
      { note: 587.33, bass: 293.66, dur: beat * 0.9, time: beat * 18.5 },
      { note: 466.16, bass: 233.08, dur: beat * 1.8, time: beat * 19.5 },
      { note: 523.25, bass: 261.63, dur: beat * 1.8, time: beat * 21.5 },
      { note: 466.16, bass: 233.08, dur: beat * 3.0, time: beat * 23.5 },
    ];

    const totalDuration = beat * 27 * 1000;

    const playLoop = () => {
      if (!this.isPlaying) return;
      phrase.forEach((item) => {
        if (!this.isPlaying) return;
        setTimeout(() => {
          if (!this.isPlaying) return;
          // Melody line
          this.playOrganNote(item.note, item.dur, 0, 1.0);
          // Rich harmonizing lower organ pipe
          this.playOrganNote(item.bass, item.dur * 1.1, 0, 0.65);
        }, item.time * 1000);
      });

      this.sequenceTimer = window.setTimeout(playLoop, totalDuration);
    };

    playLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.startClassicalWeddingMarch();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new ClassicalWeddingSynth();
