import { useState, useEffect } from "react";

export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date().getTime();
    return Math.max(0, targetDate.getTime() - now);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max(0, targetDate.getTime() - now);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000); // actualiza cada segundo

    return () => clearInterval(interval);
  }, [targetDate]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return { timeLeft, minutes, seconds, isExpired: timeLeft <= 0 };
}
