// 8-Bit Hip Hop Synthesizer: "Stronger" by Kanye West (Daft Punk Sample)
// Synthesized via Web Audio API (Square wave lead, triangle bass, 8-bit noise drums)
// 100% client-side, zero latency, zero CORS or external network dependencies.

type Listener = (isPlaying: boolean) => void;

class KanyeStronger8BitPlayer {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private nextNoteTime: number = 0;
  private bpm: number = 104;
  private listeners: Set<Listener> = new Set();
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {}

  private getContext(): AudioContext {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx!;
  }

  private getNoiseBuffer(): AudioBuffer {
    const ctx = this.getContext();
    if (!this.noiseBuffer) {
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  // Play an 8-bit square/pulse note
  private playLeadNote(freq: number, startTime: number, duration: number) {
    if (!freq) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, startTime);

    // 8-bit punch envelope (snappy attack and release)
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.12, startTime + 0.015);
    gain.gain.setValueAtTime(0.1, startTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Play an 8-bit bass note (Triangle wave for deep hip hop sub)
  private playBassNote(freq: number, startTime: number, duration: number) {
    if (!freq) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // 8-Bit Hip Hop Kick Drum
  private playKick(startTime: number) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, startTime);
    osc.frequency.exponentialRampToValueAtTime(32, startTime + 0.12);

    gain.gain.setValueAtTime(0.24, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  }

  // 8-Bit Hip Hop Snare Drum (White Noise + snappy body)
  private playSnare(startTime: number) {
    const ctx = this.getContext();
    const noiseBuffer = this.getNoiseBuffer();
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1200;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, startTime);
    osc.frequency.exponentialRampToValueAtTime(80, startTime + 0.08);

    oscGain.gain.setValueAtTime(0.12, startTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(startTime);
    noise.stop(startTime + 0.13);
    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  // 8-Bit Closed Hi-Hat
  private playHat(startTime: number) {
    const ctx = this.getContext();
    const noiseBuffer = this.getNoiseBuffer();
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(startTime);
    noise.stop(startTime + 0.05);
  }

  // Note frequencies (Hz)
  private readonly NOTE = {
    REST: 0,
    E2: 82.41,
    G2: 98.00,
    A2: 110.00,
    B2: 123.47,
    C3: 130.81,
    D3: 146.83,
    E3: 164.81,
    G3: 196.00,
    A3: 220.00,
    B3: 246.94,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    Fs4: 369.99,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    Fs5: 739.99,
    G5: 783.99,
  };

  // 64-step (4 bar) "Stronger" sequence (16th notes at 104 BPM)
  // "Work it, make it, do it, makes us / Harder, better, faster, stronger /
  //  More than ever, hour after / Our work is never over"
  private getMelodyPattern(): number[] {
    const N = this.NOTE;
    return [
      // Bar 1: "Work it (E4), make it (G4), do it (A4), makes us (B4)"
      N.E4, N.REST, N.E4, N.REST,
      N.G4, N.REST, N.G4, N.REST,
      N.A4, N.REST, N.A4, N.REST,
      N.B4, N.REST, N.B4, N.REST,

      // Bar 2: "Harder (E5-D5), better (B4-G4), faster (A4-B4), stronger (G4-E4)"
      N.E5, N.REST, N.D5, N.REST,
      N.B4, N.REST, N.G4, N.REST,
      N.A4, N.REST, N.B4, N.REST,
      N.G4, N.REST, N.E4, N.REST,

      // Bar 3: "More than (E4), ever (G4), hour (A4), after (B4)"
      N.E4, N.REST, N.E4, N.REST,
      N.G4, N.REST, N.G4, N.REST,
      N.A4, N.REST, N.A4, N.REST,
      N.B4, N.REST, N.B4, N.REST,

      // Bar 4: "Our work (D5-D5), is never (B4-A4), over (G4-E4)"
      N.D5, N.REST, N.D5, N.REST,
      N.B4, N.REST, N.A4, N.REST,
      N.G4, N.REST, N.E4, N.REST,
      N.E4, N.REST, N.REST, N.REST,
    ];
  }

  // 64-step Bassline (Pumping 8-bit Hip Hop Groove)
  private getBassPattern(): number[] {
    const N = this.NOTE;
    return [
      // Bar 1 (E minor)
      N.E2, N.REST, N.E2, N.REST, N.E2, N.REST, N.E2, N.G2,
      N.E2, N.REST, N.E2, N.REST, N.E2, N.REST, N.B2, N.REST,

      // Bar 2 (C / D)
      N.C3, N.REST, N.C3, N.REST, N.C3, N.REST, N.C3, N.REST,
      N.D3, N.REST, N.D3, N.REST, N.D3, N.REST, N.D3, N.REST,

      // Bar 3 (E minor)
      N.E2, N.REST, N.E2, N.REST, N.E2, N.REST, N.E2, N.G2,
      N.E2, N.REST, N.E2, N.REST, N.E2, N.REST, N.B2, N.REST,

      // Bar 4 (C / D)
      N.C3, N.REST, N.C3, N.REST, N.C3, N.REST, N.C3, N.REST,
      N.D3, N.REST, N.D3, N.REST, N.B2, N.REST, N.D3, N.REST,
    ];
  }

  private scheduleStep(step: number, time: number, stepDuration: number) {
    const melody = this.getMelodyPattern();
    const bass = this.getBassPattern();

    // 1. Lead melody note
    const leadNote = melody[step % melody.length];
    if (leadNote > 0) {
      this.playLeadNote(leadNote, time, stepDuration * 1.5);
    }

    // 2. Bass note
    const bassNote = bass[step % bass.length];
    if (bassNote > 0) {
      this.playBassNote(bassNote, time, stepDuration * 1.3);
    }

    // 3. Hip Hop Drum Beats (16-step bar rhythm)
    const beatIndex = step % 16;

    // Kick: Beat 1 (0), Beat 3 (8), syncopation (14)
    if (beatIndex === 0 || beatIndex === 8 || beatIndex === 14) {
      this.playKick(time);
    }

    // Snare: Beat 2 (4) and Beat 4 (12)
    if (beatIndex === 4 || beatIndex === 12) {
      this.playSnare(time);
    }

    // Hi-Hat: steady 8th/16th shuffle
    if (beatIndex % 2 === 0) {
      this.playHat(time);
    }
  }

  private scheduler = () => {
    const ctx = this.getContext();
    const stepDuration = (60 / this.bpm) / 4; // 16th note duration

    // Schedule 150ms ahead
    while (this.nextNoteTime < ctx.currentTime + 0.15) {
      this.scheduleStep(this.currentStep, this.nextNoteTime, stepDuration);
      this.nextNoteTime += stepDuration;
      this.currentStep = (this.currentStep + 1) % 64;
    }

    if (this.isRunning) {
      this.timerId = window.setTimeout(this.scheduler, 35);
    }
  };

  public start() {
    if (this.isRunning) return;
    try {
      const ctx = this.getContext();
      this.isRunning = true;
      this.currentStep = 0;
      this.nextNoteTime = ctx.currentTime + 0.05;
      this.scheduler();
      this.notify();
    } catch (err) {
      console.warn('Unable to start 8-bit audio:', err);
    }
  }

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.isRunning);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.isRunning));
  }
}

export const kanyeStrongerPlayer = new KanyeStronger8BitPlayer();
