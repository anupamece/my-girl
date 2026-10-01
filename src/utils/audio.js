// 🎵 Web Audio Ambient Music Synthesizer
// Generates a cozy, nostalgic music-box / acoustic melody inspired by autumn vibes
// Zero external files, works offline, 100% reliable.

class CozyAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.noteIndex = 0;
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(frequency, time, duration = 1.2) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Warm sine + subtle triangle blend
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, time);

      // Music-box bell envelope (soft attack, slow lingering decay)
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.2, time + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Audio safety
    }
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;

    // Cozy October melody progression (frequencies in Hz: C, E, G, B, D, A)
    // Dreamy lofi autumn arpeggio
    const melody = [
      261.63, 329.63, 392.00, 493.88, // Cmaj7
      261.63, 329.63, 392.00, 523.25,
      349.23, 440.00, 523.25, 659.25, // Fmaj7
      349.23, 440.00, 523.25, 587.33,
      392.00, 493.88, 587.33, 698.46, // G7
      329.63, 392.00, 493.88, 587.33  // Em7
    ];

    const stepDuration = 0.55; // seconds per note
    this.noteIndex = 0;

    const schedule = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = melody[this.noteIndex % melody.length];
      this.playNote(freq, now, 1.4);

      // Play soft bass root every 4 notes
      if (this.noteIndex % 4 === 0) {
        this.playNote(freq / 2, now, 2.0);
      }

      this.noteIndex++;
      this.timerId = setTimeout(schedule, stepDuration * 1000);
    };

    schedule();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientPlayer = new CozyAudioPlayer();
