import { useState, useEffect } from 'react';

export default function Timebar({ cycleSeconds, onCycleEnd }) {
  const cycleMs = cycleSeconds * 1000;
  const [elapsedMs, setElapsed] = useState(0);

  useEffect(() => {
    const animationMs = 20;

    const frame = () => setElapsed(prev => {
      let next = prev + animationMs;

      if (prev >= cycleMs) {
        onCycleEnd();
        next = 0;
      }

      return next;
    });

    const id = setInterval(frame, animationMs);
    return () => clearInterval(id);
  }, [cycleSeconds, onCycleEnd, cycleMs]);

  return (
    <progress
      className="time-bar"
      value={elapsedMs}
      max={cycleMs}
    />
  );
}
