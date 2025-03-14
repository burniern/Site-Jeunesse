import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface UseButtonSafetyOptions {
  delay?: number;
  maxClicks?: number;
  timeWindow?: number;
}

export const useButtonSafety = (options: UseButtonSafetyOptions = {}) => {
  const {
    delay = 300,
    maxClicks = 3,
    timeWindow = 5000
  } = options;

  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const resetClickCount = useCallback(() => {
    setClickCount(0);
  }, []);

  const isSafeToClick = useCallback(() => {
    const now = Date.now();
    
    // Reset click count if outside time window
    if (now - lastClickTime > timeWindow) {
      resetClickCount();
      return true;
    }

    // Check if max clicks exceeded
    if (clickCount >= maxClicks) {
      toast.error('Veuillez patienter avant de réessayer');
      return false;
    }

    return true;
  }, [clickCount, lastClickTime, maxClicks, timeWindow]);

  const trackClick = useCallback(() => {
    setClickCount(prev => prev + 1);
    setLastClickTime(Date.now());
  }, []);

  return {
    isSafeToClick,
    trackClick,
    resetClickCount
  };
};