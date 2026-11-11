/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Procedural Web Audio Ambient Soundscape Generator for TGLC
 * Generates realistic ambient acoustics (hearth, sub-rosa nocturne, private cabin)
 * with zero external network audio files or third-party CDN dependencies.
 */

export type AmbienceMode = 'hearth' | 'nocturne' | 'cabin';

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop?: () => void; disconnect: () => void }[] = [];
  private currentMode: AmbienceMode | null = null;
  private currentVolume: number = 0.45;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate a buffer of brown / pink noise
  private createNoiseBuffer(type: 'brown' | 'pink' | 'white', duration = 4): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext not initialized');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain compensation
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  public start(mode: AmbienceMode, volume = 0.45) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.currentMode = mode;
    this.setVolume(volume);

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.currentVolume, now + 1.2);

    if (mode === 'hearth') {
      this.buildHearthAtmosphere();
    } else if (mode === 'nocturne') {
      this.buildNocturneAtmosphere();
    } else if (mode === 'cabin') {
      this.buildCabinAtmosphere();
    }
  }

  private buildHearthAtmosphere() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Rain against paned glass (Filtered brown noise)
    const rainBuffer = this.createNoiseBuffer('brown', 5);
    const rainSource = this.ctx.createBufferSource();
    rainSource.buffer = rainBuffer;
    rainSource.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(480, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.masterGain);
    rainSource.start();
    this.activeNodes.push(rainSource, rainFilter, rainGain);

    // 2. Gentle cedar hearth crackle (Intermittent high-pass bursts)
    const crackleBuffer = this.createNoiseBuffer('white', 2);
    const crackleSource = this.ctx.createBufferSource();
    crackleSource.buffer = crackleBuffer;
    crackleSource.loop = true;

    const crackleFilter = this.ctx.createBiquadFilter();
    crackleFilter.type = 'highpass';
    crackleFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const crackleGain = this.ctx.createGain();
    crackleGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    // Modulate crackle with LFO
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(3.8, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(crackleGain.gain);
    lfo.start();

    crackleSource.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(this.masterGain);
    crackleSource.start();
    this.activeNodes.push(crackleSource, crackleFilter, crackleGain, lfo, lfoGain);

    // 3. Warm fireplace resonance (subtle warm triad chord at low volume)
    const freqs = [110, 164.81, 220]; // A2 chord
    freqs.forEach((f) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.activeNodes.push(osc, gain);
    });
  }

  private buildNocturneAtmosphere() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Deep 55Hz Sub-Rosa drone with subtle chorus
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(55.4, this.ctx.currentTime); // subtle beat frequency

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(180, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    osc1.connect(droneFilter);
    osc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);
    osc1.start();
    osc2.start();
    this.activeNodes.push(osc1, osc2, droneFilter, droneGain);

    // 2. Vinyl needle friction (filtered pink noise)
    const vinylBuffer = this.createNoiseBuffer('pink', 4);
    const vinylSource = this.ctx.createBufferSource();
    vinylSource.buffer = vinylBuffer;
    vinylSource.loop = true;

    const vinylFilter = this.ctx.createBiquadFilter();
    vinylFilter.type = 'bandpass';
    vinylFilter.frequency.setValueAtTime(950, this.ctx.currentTime);
    vinylFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const vinylGain = this.ctx.createGain();
    vinylGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    vinylSource.connect(vinylFilter);
    vinylFilter.connect(vinylGain);
    vinylGain.connect(this.masterGain);
    vinylSource.start();
    this.activeNodes.push(vinylSource, vinylFilter, vinylGain);
  }

  private buildCabinAtmosphere() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Jet cabin airflow (Dual filtered pink & brown noise)
    const noiseBuffer = this.createNoiseBuffer('pink', 5);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(320, this.ctx.currentTime);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.42, this.ctx.currentTime);

    noiseSource.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.masterGain);
    noiseSource.start();
    this.activeNodes.push(noiseSource, filter1, gain1);

    // 2. Distant twin Rolls-Royce turbine hum (88Hz + 176Hz harmonic)
    [88, 176].forEach((f) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();
      this.activeNodes.push(osc, oscGain);
    });
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.currentVolume, this.ctx.currentTime + 0.1);
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    } catch (_) {}

    setTimeout(() => {
      this.activeNodes.forEach((node) => {
        try {
          if ('stop' in node && typeof node.stop === 'function') {
            node.stop();
          }
          node.disconnect();
        } catch (_) {}
      });
      this.activeNodes = [];
      this.currentMode = null;
    }, 700);
  }

  public isRunning(): boolean {
    return this.activeNodes.length > 0 && this.ctx !== null && this.ctx.state === 'running';
  }

  public getMode(): AmbienceMode | null {
    return this.currentMode;
  }
}

export const audioSynthesizer = new AudioSynthesizer();
