import { useState, useEffect } from 'react';

/**
 * useCountdown hook
 * Counts down from `initialSeconds` by 1 every second.
 */
export function useCountdown(initialSeconds: number, onComplete?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const reset = (sec: number = initialSeconds) => {
    setSecondsLeft(sec);
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);

  return { secondsLeft, isRunning, reset, pause, resume };
}
