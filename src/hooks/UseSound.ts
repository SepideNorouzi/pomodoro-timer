import { useRef, useCallback } from "react";

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Lazily initialize the AudioContext on first use.
  // WHY lazy? Browsers require a user gesture before AudioContext can be created
  // (or at least before it can be resumed). Lazy init ensures to create it
  // only after the first interaction has happened.
  const getCtx = useCallback((): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const playBeep = useCallback(
    (
      frequency = 880, // Hz — 880 a clean "ding" pitch (A5 note)
      duration = 0.6, // seconds
      volume = 0.4, // 0 to 1
    ) => {
      const ctx = getCtx();

      // the wave generator (makes the actual tone)
      const oscillator = ctx.createOscillator();
      // volume envelope (controls how loud it is over time)
      const gainNode = ctx.createGain();

      // Wire the signal chain: oscillator → gainNode → speakers
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Sine wave sounds smooth and clean
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Start at the target volume
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      // Fade out to silence over the duration
      // at the end of the beep
      gainNode.gain.exponentialRampToValueAtTime(
        0.001, // near-zero (can't ramp to exact 0)
        ctx.currentTime + duration,
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },
    [getCtx],
  );

  return { playBeep };
}
