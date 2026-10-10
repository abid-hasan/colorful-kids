export class Sound {
  private voice = new Audio();
  private context: AudioContext | undefined;
  private finish: ((ok: boolean) => void) | undefined;
  private timeout: ReturnType<typeof setTimeout> | undefined;
  private nodes: OscillatorNode[] = [];

  unlock() {
    try {
      this.context ??= new AudioContext();
      void this.context.resume().catch(() => {});
    } catch { /* Voice audio still works without synthesized effects. */ }
  }

  stop() {
    this.voice.pause();
    this.voice.onended = null;
    this.voice.onerror = null;
    clearTimeout(this.timeout);
    this.finish?.(false);
    this.finish = undefined;
    for (const node of this.nodes) { try { node.stop(); } catch { /* Already ended. */ } }
    this.nodes = [];
  }

  playFile(path: string): Promise<boolean> {
    this.stop();
    this.voice.src = `${import.meta.env.BASE_URL}${path}`;
    this.voice.volume = 0.85;
    return new Promise(resolve => {
      this.finish = resolve;
      const finish = (ok: boolean) => {
        if (this.finish !== resolve) return;
        clearTimeout(this.timeout);
        this.voice.onended = null;
        this.voice.onerror = null;
        this.finish = undefined;
        resolve(ok);
      };
      this.voice.onended = () => finish(true);
      this.voice.onerror = () => finish(false);
      this.timeout = setTimeout(() => { this.voice.pause(); finish(false); }, 12000);
      this.voice.play().catch(() => finish(false));
    });
  }

  effect(kind: 'correct' | 'wrong' | 'finish') {
    if (!this.context || this.context.state !== 'running') return;
    const notes = kind === 'wrong' ? [330, 285] : kind === 'correct' ? [523, 659, 784] : [523, 659, 784, 1047];
    const now = this.context.currentTime;
    notes.forEach((frequency, i) => {
      const oscillator = this.context!.createOscillator();
      const gain = this.context!.createGain();
      const start = now + i * 0.13;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(kind === 'wrong' ? 0.07 : 0.10, start + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
      oscillator.connect(gain); gain.connect(this.context!.destination);
      oscillator.start(start); oscillator.stop(start + 0.3);
      this.nodes.push(oscillator);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); this.nodes = this.nodes.filter(n => n !== oscillator); };
    });
  }
}
