/**
 * Web Audio API Sound Synthesizer & Music Engine for Bitigey WebOS
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.isPlayingMusic = false;
    this.currentTrackIndex = 0;
    this.musicTimer = null;

    this.tracks = [
      { title: 'Neon Midnight Horizon', artist: 'Tunahan / Bitigey Wave', tempo: 120 },
      { title: 'Ekinoks Cyber Dream', artist: 'Bitigey Synth Studio', tempo: 110 },
      { title: 'Mâsivâ Retro Journey', artist: 'Cyberpunk Lo-Fi', tempo: 95 }
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playWindowOpen() {
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }

  playSynthNote(freq, type = 'sawtooth', duration = 0.3) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }

  toggleMusic(onUpdate) {
    this.initContext();
    if (this.isPlayingMusic) {
      this.stopMusic();
      if (onUpdate) onUpdate(false, null);
      return false;
    } else {
      this.startSynthwaveLoop();
      if (onUpdate) onUpdate(true, this.tracks[this.currentTrackIndex]);
      return true;
    }
  }

  startSynthwaveLoop() {
    this.isPlayingMusic = true;
    const chords = [
      [220, 261.63, 329.63], // A minor
      [174.61, 220, 261.63], // F major
      [130.81, 164.81, 196.00], // C major
      [196.00, 246.94, 293.66]  // G major
    ];

    let step = 0;
    const intervalMs = 280;

    const playStep = () => {
      if (!this.isPlayingMusic) return;

      const chordIdx = Math.floor(step / 4) % chords.length;
      const chord = chords[chordIdx];

      // Bass note
      this.playSynthNote(chord[0] / 2, 'triangle', 0.25);

      // Arpeggio Lead
      const note = chord[step % 3];
      this.playSynthNote(note * 1.5, 'sawtooth', 0.2);

      step++;
      this.musicTimer = setTimeout(playStep, intervalMs);
    };

    playStep();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    clearTimeout(this.musicTimer);
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(32);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

export const sound = new SoundEngine();
