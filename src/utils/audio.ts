/**
 * Web Audio API Acoustic Grand Piano Synthesizer
 * Faithfully recreating the attached romantic solo piano version of Pachelbel's Canon in D:
 * - Rich acoustic piano string harmonics with hammer strike transient
 * - Left/Right concert grand stereo panning
 * - Emotive sustain pedal resonance and natural room decay
 * - Also supports custom audio URL / custom audio file playback if provided
 */

interface PianoNote {
  note: number;      // Frequency in Hz
  dur: number;       // Duration in seconds
  time: number;      // Time in seconds from phrase start
  vel?: number;      // Velocity 0.0 - 1.0
  pan?: number;      // Stereo pan -1.0 (left) to 1.0 (right)
}

class RomanticPianoWeddingSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private sequenceTimer: number | null = null;
  private volume: number = 0.32;
  private preset: 'canon' | 'wagner' = 'canon';
  private customAudioEl: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  // Frequencies for Canon in D and Classical Wedding Pieces
  private readonly NOTE = {
    // Bass octave 2 & 3
    C2: 65.41,
    D2: 73.42,
    E2: 82.41,
    F2: 87.31,
    Fsharp2: 92.5,
    G2: 98.0,
    A2: 110.0,
    Bb2: 116.54,
    B2: 123.47,
    C3: 130.81,
    Csharp3: 138.59,
    D3: 146.83,
    E3: 164.81,
    F3: 174.61,
    Fsharp3: 185.0,
    G3: 196.0,
    A3: 220.0,
    Bb3: 233.08,
    B3: 246.94,
    // Mid octave 4
    C4: 261.63,
    Csharp4: 277.18,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    Fsharp4: 369.99,
    G4: 392.0,
    A4: 440.0,
    Bb4: 466.16,
    B4: 493.88,
    // High melody octave 5
    C5: 523.25,
    Csharp5: 554.37,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    Fsharp5: 739.99,
    G5: 783.99,
    A5: 880.0,
    Bb5: 932.33,
    B5: 987.77,
    Csharp6: 1108.73,
    D6: 1174.66,
  };

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

  /**
   * Synthesizes an acoustic piano strike with hammer transient, multi-string detune chorus,
   * overtone decay, and stereo acoustic placement.
   */
  public playPianoKey(
    freq: number,
    duration: number,
    timeOffset: number = 0,
    velocity: number = 0.8,
    pan: number = 0
  ) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + timeOffset;

      // Panner for grand piano stereo field
      let pannerNode: StereoPannerNode | null = null;
      if (this.ctx.createStereoPanner) {
        pannerNode = this.ctx.createStereoPanner();
        pannerNode.pan.setValueAtTime(Math.max(-0.8, Math.min(0.8, pan)), now);
      }

      const noteMasterGain = this.ctx.createGain();
      const targetVolume = this.volume * velocity;

      // Piano String 1 (Fundamental - sine with warmth)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // Piano String 2 (Detuned unison for lush grand piano acoustic beating)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.0008, now);

      // Piano String 3 (Second harmonic - octave warmth)
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 2, now);

      // Fast hammer strike transient (initial percussive tap of felt on wire)
      const oscHammer = this.ctx.createOscillator();
      const gainHammer = this.ctx.createGain();
      oscHammer.type = 'sine';
      oscHammer.frequency.setValueAtTime(freq * 3.8, now);

      // Envelopes:
      // Note attack: ultra-fast hammer rise (6ms)
      noteMasterGain.gain.setValueAtTime(0.0001, now);
      noteMasterGain.gain.linearRampToValueAtTime(targetVolume, now + 0.007);
      // Natural piano decay with long singing sustain
      noteMasterGain.gain.exponentialRampToValueAtTime(
        targetVolume * 0.45,
        now + Math.min(0.6, duration * 0.4)
      );
      noteMasterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.4);

      // Mix individual components
      gain1.gain.setValueAtTime(0.75, now);
      gain2.gain.setValueAtTime(0.6, now);
      gain3.gain.setValueAtTime(0.28, now);
      gain3.gain.exponentialRampToValueAtTime(0.01, now + Math.min(0.8, duration * 0.5));

      // Hammer noise decays within 25ms
      gainHammer.gain.setValueAtTime(targetVolume * 0.35, now);
      gainHammer.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      // Routing
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);
      oscHammer.connect(gainHammer);

      gain1.connect(noteMasterGain);
      gain2.connect(noteMasterGain);
      gain3.connect(noteMasterGain);
      gainHammer.connect(noteMasterGain);

      if (pannerNode) {
        noteMasterGain.connect(pannerNode);
        pannerNode.connect(this.ctx.destination);
      } else {
        noteMasterGain.connect(this.ctx.destination);
      }

      // Start and stop
      const stopTime = now + duration + 0.5;
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      oscHammer.start(now);

      osc1.stop(stopTime);
      osc2.stop(stopTime);
      osc3.stop(stopTime);
      oscHammer.stop(stopTime);
    } catch {
      // AudioContext policy
    }
  }

  /**
   * Opening delicate sparkle harp/piano chime right as the envelope opens
   */
  public playOpeningChime() {
    try {
      this.initCtx();
      const n = this.NOTE;
      // D major romantic ascending piano arpeggio
      const chime = [
        { freq: n.D3, dur: 2.0, delay: 0.0, pan: -0.3 },
        { freq: n.A3, dur: 2.2, delay: 0.1, pan: -0.15 },
        { freq: n.D4, dur: 2.2, delay: 0.2, pan: 0.0 },
        { freq: n.Fsharp4, dur: 2.4, delay: 0.3, pan: 0.15 },
        { freq: n.A4, dur: 2.6, delay: 0.42, pan: 0.25 },
        { freq: n.D5, dur: 3.0, delay: 0.55, pan: 0.35 },
        { freq: n.Fsharp5, dur: 3.5, delay: 0.7, pan: 0.4 },
      ];

      chime.forEach((item) => {
        this.playPianoKey(item.freq, item.dur, item.delay, 0.75, item.pan);
      });
    } catch {
      // Ignored
    }
  }

  /**
   * Generates the authentic Pachelbel Canon in D solo piano score matching the user's audio
   */
  private getCanonInDScore(): PianoNote[] {
    const n = this.NOTE;
    const beat = 1.05; // Gentle, emotive romantic piano tempo (~57 bpm)
    const score: PianoNote[] = [];

    // Helper to add bass + rolling accompaniment chord
    const addBassMeasure = (
      time: number,
      bassNote: number,
      chordNotes: number[],
      pan: number = -0.3
    ) => {
      // Deep bass
      score.push({ note: bassNote, dur: beat * 2.8, time, vel: 0.72, pan });
      // Gentle rolling middle register arpeggio
      chordNotes.forEach((cn, i) => {
        score.push({
          note: cn,
          dur: beat * 1.8,
          time: time + (i + 1) * (beat * 0.48),
          vel: 0.45,
          pan: pan + 0.15 * (i + 1),
        });
      });
    };

    // SECTION 1: Theme Exposition (The iconic 8 chords and singing lyrical melody)
    // 8 Classical Harmony Blocks: D - A - Bm - F#m - G - D - G - A
    const t0 = 0.1;
    const bar = beat * 2; // Each chord lasts 2 beats

    // Measure 1: D Major
    addBassMeasure(t0 + bar * 0, n.D2, [n.A3, n.D4, n.Fsharp4], -0.4);
    score.push({ note: n.Fsharp5, dur: bar * 0.95, time: t0 + bar * 0, vel: 0.9, pan: 0.25 });

    // Measure 2: A Major
    addBassMeasure(t0 + bar * 1, n.A2, [n.E3, n.A3, n.Csharp4], -0.3);
    score.push({ note: n.E5, dur: bar * 0.95, time: t0 + bar * 1, vel: 0.85, pan: 0.2 });

    // Measure 3: B Minor
    addBassMeasure(t0 + bar * 2, n.B2, [n.Fsharp3, n.B3, n.D4], -0.35);
    score.push({ note: n.D5, dur: bar * 0.95, time: t0 + bar * 2, vel: 0.88, pan: 0.18 });

    // Measure 4: F# Minor
    addBassMeasure(t0 + bar * 3, n.Fsharp2, [n.Csharp3, n.Fsharp3, n.A3], -0.4);
    score.push({ note: n.Csharp5, dur: bar * 0.95, time: t0 + bar * 3, vel: 0.82, pan: 0.15 });

    // Measure 5: G Major
    addBassMeasure(t0 + bar * 4, n.G2, [n.D3, n.G3, n.B3], -0.3);
    score.push({ note: n.B4, dur: bar * 0.95, time: t0 + bar * 4, vel: 0.86, pan: 0.12 });

    // Measure 6: D Major
    addBassMeasure(t0 + bar * 5, n.D2, [n.A2, n.D3, n.Fsharp3], -0.4);
    score.push({ note: n.A4, dur: bar * 0.95, time: t0 + bar * 5, vel: 0.82, pan: 0.08 });

    // Measure 7: G Major
    addBassMeasure(t0 + bar * 6, n.G2, [n.D3, n.G3, n.B3], -0.3);
    score.push({ note: n.B4, dur: bar * 0.95, time: t0 + bar * 6, vel: 0.85, pan: 0.15 });

    // Measure 8: A Major (leading back to D)
    addBassMeasure(t0 + bar * 7, n.A2, [n.E3, n.A3, n.Csharp4], -0.25);
    score.push({ note: n.Csharp5, dur: bar * 0.95, time: t0 + bar * 7, vel: 0.9, pan: 0.22 });

    // SECTION 2: Flowing 8th-note variations (from 0:16 in the user audio)
    const tVar = t0 + bar * 8;
    const q = beat * 0.5; // Eighth note

    // Bar 9 (D): D5 - C#5 - D5 - F#5
    addBassMeasure(tVar + bar * 0, n.D2, [n.A3, n.Fsharp4], -0.35);
    score.push({ note: n.D5, dur: q * 1.5, time: tVar + bar * 0 + q * 0, vel: 0.85, pan: 0.2 });
    score.push({ note: n.Csharp5, dur: q * 1.5, time: tVar + bar * 0 + q * 1, vel: 0.75, pan: 0.22 });
    score.push({ note: n.D5, dur: q * 1.5, time: tVar + bar * 0 + q * 2, vel: 0.85, pan: 0.25 });
    score.push({ note: n.Fsharp5, dur: q * 1.8, time: tVar + bar * 0 + q * 3, vel: 0.92, pan: 0.3 });

    // Bar 10 (A): E5 - D5 - C#5 - A4
    addBassMeasure(tVar + bar * 1, n.A2, [n.E3, n.Csharp4], -0.3);
    score.push({ note: n.E5, dur: q * 1.5, time: tVar + bar * 1 + q * 0, vel: 0.88, pan: 0.22 });
    score.push({ note: n.D5, dur: q * 1.5, time: tVar + bar * 1 + q * 1, vel: 0.78, pan: 0.2 });
    score.push({ note: n.Csharp5, dur: q * 1.5, time: tVar + bar * 1 + q * 2, vel: 0.82, pan: 0.18 });
    score.push({ note: n.A4, dur: q * 1.8, time: tVar + bar * 1 + q * 3, vel: 0.8, pan: 0.15 });

    // Bar 11 (Bm): B4 - A4 - B4 - D5
    addBassMeasure(tVar + bar * 2, n.B2, [n.Fsharp3, n.D4], -0.32);
    score.push({ note: n.B4, dur: q * 1.5, time: tVar + bar * 2 + q * 0, vel: 0.85, pan: 0.18 });
    score.push({ note: n.A4, dur: q * 1.5, time: tVar + bar * 2 + q * 1, vel: 0.75, pan: 0.16 });
    score.push({ note: n.B4, dur: q * 1.5, time: tVar + bar * 2 + q * 2, vel: 0.85, pan: 0.2 });
    score.push({ note: n.D5, dur: q * 1.8, time: tVar + bar * 2 + q * 3, vel: 0.9, pan: 0.24 });

    // Bar 12 (F#m): A4 - G4 - F#4 - D4
    addBassMeasure(tVar + bar * 3, n.Fsharp2, [n.Csharp3, n.A3], -0.38);
    score.push({ note: n.A4, dur: q * 1.5, time: tVar + bar * 3 + q * 0, vel: 0.82, pan: 0.15 });
    score.push({ note: n.G4, dur: q * 1.5, time: tVar + bar * 3 + q * 1, vel: 0.72, pan: 0.12 });
    score.push({ note: n.Fsharp4, dur: q * 1.5, time: tVar + bar * 3 + q * 2, vel: 0.8, pan: 0.1 });
    score.push({ note: n.D4, dur: q * 1.8, time: tVar + bar * 3 + q * 3, vel: 0.78, pan: 0.08 });

    // Bar 13 (G): G4 - F#4 - G4 - B4
    addBassMeasure(tVar + bar * 4, n.G2, [n.D3, n.B3], -0.3);
    score.push({ note: n.G4, dur: q * 1.5, time: tVar + bar * 4 + q * 0, vel: 0.84, pan: 0.12 });
    score.push({ note: n.Fsharp4, dur: q * 1.5, time: tVar + bar * 4 + q * 1, vel: 0.74, pan: 0.1 });
    score.push({ note: n.G4, dur: q * 1.5, time: tVar + bar * 4 + q * 2, vel: 0.84, pan: 0.14 });
    score.push({ note: n.B4, dur: q * 1.8, time: tVar + bar * 4 + q * 3, vel: 0.88, pan: 0.18 });

    // Bar 14 (D): F#4 - E4 - D4 - F#4
    addBassMeasure(tVar + bar * 5, n.D2, [n.A2, n.Fsharp3], -0.35);
    score.push({ note: n.Fsharp4, dur: q * 1.5, time: tVar + bar * 5 + q * 0, vel: 0.82, pan: 0.12 });
    score.push({ note: n.E4, dur: q * 1.5, time: tVar + bar * 5 + q * 1, vel: 0.72, pan: 0.1 });
    score.push({ note: n.D4, dur: q * 1.5, time: tVar + bar * 5 + q * 2, vel: 0.8, pan: 0.08 });
    score.push({ note: n.Fsharp4, dur: q * 1.8, time: tVar + bar * 5 + q * 3, vel: 0.85, pan: 0.14 });

    // Bar 15 (G): G4 - A4 - B4 - G4
    addBassMeasure(tVar + bar * 6, n.G2, [n.D3, n.B3], -0.3);
    score.push({ note: n.G4, dur: q * 1.5, time: tVar + bar * 6 + q * 0, vel: 0.85, pan: 0.12 });
    score.push({ note: n.A4, dur: q * 1.5, time: tVar + bar * 6 + q * 1, vel: 0.82, pan: 0.16 });
    score.push({ note: n.B4, dur: q * 1.5, time: tVar + bar * 6 + q * 2, vel: 0.88, pan: 0.2 });
    score.push({ note: n.G4, dur: q * 1.8, time: tVar + bar * 6 + q * 3, vel: 0.82, pan: 0.14 });

    // Bar 16 (A): A4 - B4 - C#5 - A4 (Resolving back warmly)
    addBassMeasure(tVar + bar * 7, n.A2, [n.E3, n.Csharp4], -0.25);
    score.push({ note: n.A4, dur: q * 1.5, time: tVar + bar * 7 + q * 0, vel: 0.85, pan: 0.16 });
    score.push({ note: n.B4, dur: q * 1.5, time: tVar + bar * 7 + q * 1, vel: 0.88, pan: 0.2 });
    score.push({ note: n.Csharp5, dur: q * 1.6, time: tVar + bar * 7 + q * 2, vel: 0.92, pan: 0.25 });
    score.push({ note: n.D5, dur: q * 2.2, time: tVar + bar * 7 + q * 3, vel: 0.95, pan: 0.28 });

    return score;
  }

  /**
   * Generates the authentic classical Marcha Nupcial (Wagner - Bridal Chorus / Coro Nupcial)
   */
  private getWagnerBridalScore(): PianoNote[] {
    const n = this.NOTE;
    const beat = 1.0;
    const score: PianoNote[] = [];

    // Helper to add bass + chord
    const addChord = (time: number, bass: number, mid: number[], dur: number = 3.6) => {
      score.push({ note: bass, dur, time, vel: 0.7, pan: -0.35 });
      mid.forEach((m, idx) => {
        score.push({ note: m, dur: dur * 0.8, time: time + 0.15 * idx, vel: 0.42, pan: -0.1 + 0.15 * idx });
      });
    };

    // Phrase 1: C4 ... F4 - F4 - F4
    addChord(0.1, n.F2, [n.A3, n.C4], 3.8);
    score.push({ note: n.C4, dur: 1.4, time: 0.1, vel: 0.86, pan: 0.1 });
    score.push({ note: n.F4, dur: 0.45, time: 1.5, vel: 0.82, pan: 0.18 });
    score.push({ note: n.F4, dur: 0.9, time: 2.0, vel: 0.88, pan: 0.2 });
    score.push({ note: n.F4, dur: 1.5, time: 3.0, vel: 0.9, pan: 0.22 });

    // Phrase 2: C4 ... G4 - E4 - F4
    addChord(4.5, n.C3, [n.G3, n.Bb3, n.E4], 3.8);
    score.push({ note: n.C4, dur: 1.4, time: 4.5, vel: 0.85, pan: 0.1 });
    score.push({ note: n.G4, dur: 0.45, time: 5.9, vel: 0.84, pan: 0.22 });
    score.push({ note: n.E4, dur: 0.9, time: 6.4, vel: 0.86, pan: 0.15 });
    score.push({ note: n.F4, dur: 1.8, time: 7.4, vel: 0.92, pan: 0.2 });

    // Phrase 3: C4 - F4 - A4 - C5 - Bb4 - A4
    addChord(9.5, n.F2, [n.A3, n.C4, n.F4], 4.2);
    score.push({ note: n.C4, dur: 0.85, time: 9.5, vel: 0.82, pan: 0.1 });
    score.push({ note: n.F4, dur: 0.85, time: 10.4, vel: 0.85, pan: 0.18 });
    score.push({ note: n.A4, dur: 0.85, time: 11.3, vel: 0.88, pan: 0.24 });
    score.push({ note: n.C5, dur: 1.3, time: 12.2, vel: 0.95, pan: 0.3 });
    score.push({ note: n.Bb4, dur: 0.45, time: 13.6, vel: 0.85, pan: 0.26 });
    score.push({ note: n.A4, dur: 0.9, time: 14.1, vel: 0.88, pan: 0.22 });

    // Phrase 4: G4 ... F4 - G4 - A4
    addChord(15.2, n.C3, [n.G3, n.Bb3, n.D4], 3.8);
    score.push({ note: n.G4, dur: 2.2, time: 15.2, vel: 0.88, pan: 0.2 });
    score.push({ note: n.F4, dur: 0.45, time: 17.5, vel: 0.8, pan: 0.16 });
    score.push({ note: n.G4, dur: 0.9, time: 18.0, vel: 0.85, pan: 0.2 });

    // Phrase 5: A4 ... F4 ... C5 ...
    addChord(19.2, n.F2, [n.A3, n.C4], 4.0);
    score.push({ note: n.A4, dur: 1.6, time: 19.2, vel: 0.88, pan: 0.22 });
    score.push({ note: n.F4, dur: 1.6, time: 21.0, vel: 0.86, pan: 0.18 });
    score.push({ note: n.C5, dur: 2.6, time: 22.8, vel: 0.95, pan: 0.3 });

    // Phrase 6: Bb4 ... G4 ... F4 ... Resolving peacefully
    addChord(25.8, n.Bb2, [n.F3, n.Bb3, n.D4], 4.5);
    score.push({ note: n.Bb4, dur: 1.6, time: 25.8, vel: 0.88, pan: 0.25 });
    score.push({ note: n.G4, dur: 1.6, time: 27.6, vel: 0.85, pan: 0.2 });
    score.push({ note: n.F4, dur: 3.2, time: 29.4, vel: 0.92, pan: 0.18 });

    return score;
  }

  /**
   * Starts playing the romantic classical wedding piano music
   */
  public startMusic() {
    this.isPlaying = true;

    // 1. If custom audio URL (user-provided link/file) is active, play it
    if (this.customAudioUrl) {
      if (!this.customAudioEl || this.customAudioEl.src !== this.customAudioUrl) {
        this.customAudioEl = new Audio(this.customAudioUrl);
        this.customAudioEl.loop = true;
      }
      this.customAudioEl.play().catch(() => {});
      return;
    }

    // 2. Default attached audio track: Canon in D (Studio Piano MP3)
    if (this.preset === 'canon') {
      if (!this.customAudioEl || !this.customAudioEl.src.includes('musica-casamento.mp3')) {
        this.customAudioEl = new Audio('/audio/musica-casamento.mp3');
        this.customAudioEl.loop = true;
      }
      this.customAudioEl.play().catch(() => {
        // Fallback to Web Audio API synthesis if file playback is blocked
        this.startSynthLoop();
      });
      return;
    }

    // 3. Classical Wagner Marcha Nupcial synthesis
    this.startSynthLoop();
  }

  private startSynthLoop() {
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    this.initCtx();

    const isCanon = this.preset === 'canon';
    const score = isCanon ? this.getCanonInDScore() : this.getWagnerBridalScore();
    const loopDuration = isCanon ? 33600 : 33500;

    const playLoop = () => {
      if (!this.isPlaying) return;
      score.forEach((item) => {
        if (!this.isPlaying) return;
        setTimeout(() => {
          if (!this.isPlaying) return;
          this.playPianoKey(
            item.note,
            item.dur,
            0,
            item.vel || 0.8,
            item.pan || 0
          );
        }, item.time * 1000);
      });

      this.sequenceTimer = window.setTimeout(playLoop, loopDuration);
    };

    playLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public setPreset(preset: 'canon' | 'wagner') {
    this.stop();
    this.preset = preset;
    this.customAudioUrl = null;
    if (this.customAudioEl) {
      this.customAudioEl.pause();
      this.customAudioEl = null;
    }
    try {
      localStorage.setItem('wedding_music_preset', preset);
      localStorage.removeItem('wedding_custom_audio_url');
    } catch {
      // Ignored
    }
    this.startMusic();
  }

  public getPreset(): 'canon' | 'wagner' {
    return this.preset;
  }

  public setCustomAudioUrl(url: string) {
    this.stop();
    this.customAudioUrl = url;
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
    this.customAudioEl = new Audio(url);
    this.customAudioEl.loop = true;
    try {
      if (url.startsWith('http')) {
        localStorage.setItem('wedding_custom_audio_url', url);
      }
    } catch {
      // Ignored
    }
    this.startMusic();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCustomAudioUrl(): string | null {
    return this.customAudioUrl;
  }

  public initFromStorage() {
    try {
      const savedUrl = localStorage.getItem('wedding_custom_audio_url');
      if (savedUrl) {
        this.customAudioUrl = savedUrl;
      } else {
        const savedPreset = localStorage.getItem('wedding_music_preset');
        if (savedPreset === 'wagner' || savedPreset === 'canon') {
          this.preset = savedPreset;
        }
      }
    } catch {
      // Ignored
    }
  }
}

export const weddingAudio = new RomanticPianoWeddingSynth();
