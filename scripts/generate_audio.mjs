import fs from 'fs';
import { execSync } from 'child_process';

const SAMPLE_RATE = 44100;
const DURATION = 35.0; // 35 seconds matching the attached audio clip
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

const NOTES = {
  'D2': 73.42, 'F#2': 92.50, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C#3': 138.59, 'D3': 146.83, 'E3': 164.81, 'F#3': 185.00, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C#4': 277.18, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C#5': 554.37, 'D5': 587.33, 'E5': 659.25, 'F#5': 739.99, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C#6': 1108.73, 'D6': 1174.66
};

const left = new Float32Array(NUM_SAMPLES);
const right = new Float32Array(NUM_SAMPLES);

function addNote(name, startTime, dur, velocity = 0.8, pan = 0.0) {
  const f0 = NOTES[name];
  if (!f0) return;
  const startIdx = Math.floor(startTime * SAMPLE_RATE);
  const noteSamples = Math.floor(dur * SAMPLE_RATE);
  const endIdx = Math.min(NUM_SAMPLES, startIdx + noteSamples);
  if (startIdx >= NUM_SAMPLES) return;

  const angle = (pan + 1.0) * (Math.PI / 4.0);
  const panL = Math.cos(angle);
  const panR = Math.sin(angle);

  const decayFactor = f0 > 400 ? 2.5 : 1.7;
  const omega1 = 2 * Math.PI * f0;
  const omega2 = 2 * Math.PI * (f0 * 1.0008); // Chorus detune
  const omega3 = 2 * Math.PI * (f0 * 2.0);    // Octave overtone
  const omega4 = 2 * Math.PI * (f0 * 3.0);
  const omegaH = 2 * Math.PI * (f0 * 3.6);

  for (let i = startIdx; i < endIdx; i++) {
    const t = (i - startIdx) / SAMPLE_RATE;
    let env;
    if (t < 0.006) {
      env = t / 0.006;
    } else {
      env = Math.exp((-decayFactor * (t - 0.006)) / dur);
    }

    let hammer = 0;
    if (t < 0.025) {
      hammer = Math.sin(omegaH * t) * Math.exp(-t * 120.0) * 0.25;
    }

    const s1 = Math.sin(omega1 * t) * 0.75;
    const s2 = Math.sin(omega2 * t) * 0.50;
    const s3 = Math.sin(omega3 * t) * 0.30 * Math.exp(-1.4 * decayFactor * t / dur);
    const s4 = Math.sin(omega4 * t) * 0.15 * Math.exp(-1.8 * decayFactor * t / dur);

    const sample = (s1 + s2 + s3 + s4 + hammer) * env * velocity * 0.18;
    left[i] += sample * panL;
    right[i] += sample * panR;
  }
}

const beat = 1.05;
const bar = beat * 2.0;
const t0 = 0.2;

function addBar(t, bass, chord, pan = -0.3) {
  addNote(bass, t, bar * 1.9, 0.72, pan);
  for (let idx = 0; idx < chord.length; idx++) {
    addNote(chord[idx], t + (idx + 1) * (beat * 0.48), bar * 1.3, 0.46, pan + 0.14 * (idx + 1));
  }
}

// Section 1: Exposition (Canon in D Chords)
addBar(t0 + bar * 0, 'D2', ['A3', 'D4', 'F#4'], -0.4);
addNote('F#5', t0 + bar * 0, bar * 0.95, 0.90, 0.25);

addBar(t0 + bar * 1, 'A2', ['E3', 'A3', 'C#4'], -0.3);
addNote('E5', t0 + bar * 1, bar * 0.95, 0.85, 0.20);

addBar(t0 + bar * 2, 'B2', ['F#3', 'B3', 'D4'], -0.35);
addNote('D5', t0 + bar * 2, bar * 0.95, 0.87, 0.18);

addBar(t0 + bar * 3, 'F#2', ['C#3', 'F#3', 'A3'], -0.4);
addNote('C#5', t0 + bar * 3, bar * 0.95, 0.83, 0.15);

addBar(t0 + bar * 4, 'G2', ['D3', 'G3', 'B3'], -0.3);
addNote('B4', t0 + bar * 4, bar * 0.95, 0.86, 0.12);

addBar(t0 + bar * 5, 'D2', ['A2', 'D3', 'F#3'], -0.4);
addNote('A4', t0 + bar * 5, bar * 0.95, 0.82, 0.08);

addBar(t0 + bar * 6, 'G2', ['D3', 'G3', 'B3'], -0.3);
addNote('B4', t0 + bar * 6, bar * 0.95, 0.85, 0.14);

addBar(t0 + bar * 7, 'A2', ['E3', 'A3', 'C#4'], -0.25);
addNote('C#5', t0 + bar * 7, bar * 0.95, 0.90, 0.22);

// Section 2: Flowing variations
const tVar = t0 + bar * 8;
const q = beat * 0.5;

addBar(tVar + bar * 0, 'D2', ['A3', 'F#4'], -0.35);
addNote('D5', tVar + bar * 0 + q * 0, q * 1.5, 0.85, 0.20);
addNote('C#5', tVar + bar * 0 + q * 1, q * 1.5, 0.76, 0.22);
addNote('D5', tVar + bar * 0 + q * 2, q * 1.5, 0.85, 0.25);
addNote('F#5', tVar + bar * 0 + q * 3, q * 1.8, 0.92, 0.30);

addBar(tVar + bar * 1, 'A2', ['E3', 'C#4'], -0.3);
addNote('E5', tVar + bar * 1 + q * 0, q * 1.5, 0.88, 0.22);
addNote('D5', tVar + bar * 1 + q * 1, q * 1.5, 0.78, 0.20);
addNote('C#5', tVar + bar * 1 + q * 2, q * 1.5, 0.82, 0.18);
addNote('A4', tVar + bar * 1 + q * 3, q * 1.8, 0.80, 0.15);

addBar(tVar + bar * 2, 'B2', ['F#3', 'D4'], -0.32);
addNote('B4', tVar + bar * 2 + q * 0, q * 1.5, 0.85, 0.18);
addNote('A4', tVar + bar * 2 + q * 1, q * 1.5, 0.76, 0.16);
addNote('B4', tVar + bar * 2 + q * 2, q * 1.5, 0.85, 0.20);
addNote('D5', tVar + bar * 2 + q * 3, q * 1.8, 0.90, 0.24);

addBar(tVar + bar * 3, 'F#2', ['C#3', 'A3'], -0.38);
addNote('A4', tVar + bar * 3 + q * 0, q * 1.5, 0.82, 0.15);
addNote('G4', tVar + bar * 3 + q * 1, q * 1.5, 0.72, 0.12);
addNote('F#4', tVar + bar * 3 + q * 2, q * 1.5, 0.80, 0.10);
addNote('D4', tVar + bar * 3 + q * 3, q * 1.8, 0.78, 0.08);

addBar(tVar + bar * 4, 'G2', ['D3', 'B3'], -0.3);
addNote('G4', tVar + bar * 4 + q * 0, q * 1.5, 0.84, 0.12);
addNote('F#4', tVar + bar * 4 + q * 1, q * 1.5, 0.74, 0.10);
addNote('G4', tVar + bar * 4 + q * 2, q * 1.5, 0.84, 0.14);
addNote('B4', tVar + bar * 4 + q * 3, q * 1.8, 0.88, 0.18);

addBar(tVar + bar * 5, 'D2', ['A2', 'F#3'], -0.35);
addNote('F#4', tVar + bar * 5 + q * 0, q * 1.5, 0.82, 0.12);
addNote('E4', tVar + bar * 5 + q * 1, q * 1.5, 0.72, 0.10);
addNote('D4', tVar + bar * 5 + q * 2, q * 1.5, 0.80, 0.08);
addNote('F#4', tVar + bar * 5 + q * 3, q * 1.8, 0.85, 0.14);

addBar(tVar + bar * 6, 'G2', ['D3', 'B3'], -0.3);
addNote('G4', tVar + bar * 6 + q * 0, q * 1.5, 0.85, 0.12);
addNote('A4', tVar + bar * 6 + q * 1, q * 1.5, 0.82, 0.16);
addNote('B4', tVar + bar * 6 + q * 2, q * 1.5, 0.88, 0.20);
addNote('G4', tVar + bar * 6 + q * 3, q * 1.8, 0.82, 0.14);

addBar(tVar + bar * 7, 'A2', ['E3', 'C#4'], -0.25);
addNote('A4', tVar + bar * 7 + q * 0, q * 1.5, 0.85, 0.16);
addNote('B4', tVar + bar * 7 + q * 1, q * 1.5, 0.88, 0.20);
addNote('C#5', tVar + bar * 7 + q * 2, q * 1.6, 0.92, 0.25);
addNote('D5', tVar + bar * 7 + q * 3, q * 2.5, 0.95, 0.28);

// Reverb delay
const delaySamples = Math.floor(0.045 * SAMPLE_RATE);
const decay = 0.28;
for (let i = delaySamples; i < NUM_SAMPLES; i++) {
  left[i] += right[i - delaySamples] * decay;
  right[i] += left[i - delaySamples] * decay;
}

// Fade out at end for clean loop
const fadeStart = Math.floor(34.2 * SAMPLE_RATE);
for (let i = fadeStart; i < NUM_SAMPLES; i++) {
  const f = 1.0 - (i - fadeStart) / (NUM_SAMPLES - fadeStart);
  left[i] *= f;
  right[i] *= f;
}

// Normalize
let maxPeak = 0.001;
for (let i = 0; i < NUM_SAMPLES; i++) {
  if (Math.abs(left[i]) > maxPeak) maxPeak = Math.abs(left[i]);
  if (Math.abs(right[i]) > maxPeak) maxPeak = Math.abs(right[i]);
}
const gain = 0.85 / maxPeak;

// Write WAV buffer
const dataSize = NUM_SAMPLES * 4;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(2, 22); // Stereo
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(SAMPLE_RATE * 4, 28);
buffer.writeUInt16LE(4, 32); // Block align
buffer.writeUInt16LE(16, 34); // Bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < NUM_SAMPLES; i++) {
  const l = Math.max(-32767, Math.min(32767, Math.round(left[i] * gain * 32767)));
  const r = Math.max(-32767, Math.min(32767, Math.round(right[i] * gain * 32767)));
  buffer.writeInt16LE(l, offset);
  buffer.writeInt16LE(r, offset + 2);
  offset += 4;
}

fs.mkdirSync('public/audio', { recursive: true });
const wavFile = '/tmp/piano_wedding.wav';
const mp3File = 'public/audio/musica-casamento.mp3';

fs.writeFileSync(wavFile, buffer);
console.log('WAV rendered, converting with ffmpeg...');
execSync(`ffmpeg -y -i ${wavFile} -codec:a libmp3lame -q:a 2 ${mp3File}`);
console.log('Finished generating ' + mp3File);
